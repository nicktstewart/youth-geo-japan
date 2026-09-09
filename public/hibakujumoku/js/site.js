(() => {
  "use strict";
  const D = window.CITY_DATA;
  if (!D || !window.L) return;

  const detail = document.getElementById("detail");
  const result = document.getElementById("filter-result");
  const slopeLegend = document.getElementById("slope-legend");
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const fmt = (value, digits = 1) => value == null ? "" : Number(value).toFixed(digits);

  const map = L.map("map", {
    preferCanvas: true,
    zoomControl: true,
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true,
    inertia: true,
    inertiaDeceleration: 2800,
    wheelPxPerZoomLevel: 90,
  });

  map.attributionControl.addAttribution('<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>');
  const contextBounds = L.latLngBounds(D.map_images.context.bounds);
  L.imageOverlay(D.map_images.context.url, D.map_images.context.bounds, { opacity: 1, interactive: false }).addTo(map);
  L.imageOverlay(D.map_images.base.url, D.map_images.base.bounds, { opacity: 1, interactive: false }).addTo(map);
  const terrainLayers = {
    hillshade: L.imageOverlay(D.map_images.hillshade.url, D.map_images.hillshade.bounds, { opacity: 0.42, interactive: false }),
    slope: L.imageOverlay(D.map_images.slope.url, D.map_images.slope.bounds, { opacity: 0.58, interactive: false }),
  };
  let terrainMode = "hillshade";
  terrainLayers.hillshade.addTo(map);
  L.control.scale({ imperial: false, position: "bottomright", maxWidth: 130 }).addTo(map);

  const renderer = L.canvas({ padding: 0.5 });
  const hypocenter = [D.hypocenter.latitude, D.hypocenter.longitude];
  const markers = [];
  let selectedSite = null;
  let selectedIndividual = 0;
  let rangeLayer = L.layerGroup().addTo(map);

  [500, 1000, 2000].forEach((radius) => L.circle(hypocenter, {
    radius, renderer, color: "#9b4e3f", weight: 1, opacity: 0.45,
    fill: false, dashArray: "5 6", interactive: false,
  }).addTo(map));
  L.marker(hypocenter, {
    icon: L.divIcon({ className: "hypocenter-icon", html: "<span>爆心地</span>", iconSize: [70, 30], iconAnchor: [10, 15] }),
    interactive: false,
  }).addTo(map);

  function markerIcon(record, active = false) {
    const colors = {
      "被爆時から同じ場所": "#2F667F",
      "移植・株分け": "#C47A2C",
      "場所の経過未確認": "#8A8F8C",
    };
    const counts = new Map();
    record.individuals.forEach((item) => {
      const category = item.location_history_category || "場所の経過未確認";
      counts.set(category, (counts.get(category) || 0) + 1);
    });
    let cursor = 0;
    const entries = [...counts.entries()];
    const segments = [];
    entries.forEach(([category, count], index) => {
      const start = cursor;
      const end = cursor + count / record.individuals.length * 100;
      const insetStart = index === 0 ? start : Math.min(start + 0.8, end);
      const insetEnd = index === entries.length - 1 ? end : Math.max(end - 0.8, insetStart);
      if (index > 0) segments.push(`#fffdf8 ${Math.max(0, start - 0.8)}% ${insetStart}%`);
      segments.push(`${colors[category] || colors["場所の経過未確認"]} ${insetStart}% ${insetEnd}%`);
      if (index < entries.length - 1) segments.push(`#fffdf8 ${insetEnd}% ${Math.min(100, end + 0.8)}%`);
      cursor = end;
    });
    const markerBackground = counts.size === 1
      ? colors[[...counts.keys()][0]]
      : `conic-gradient(${segments.join(",")})`;
    return L.divIcon({
      className: "tree-marker-wrap",
      html: `<span class="tree-marker${active ? " active" : ""}" style="--marker:${markerBackground}"><i>${record.individuals.length}</i></span>`,
      iconSize: active ? [34, 34] : [28, 28],
      iconAnchor: active ? [17, 17] : [14, 14],
      tooltipAnchor: [12, 0],
    });
  }

  D.records.forEach((record, index) => {
    if (!record.has_mappable_location) {
      markers.push(null);
      return;
    }
    const marker = L.marker([record.latitude, record.longitude], {
      icon: markerIcon(record), riseOnHover: true,
    }).bindTooltip(esc(record.site_name), { direction: "right" })
      .on("click", () => selectSite(index, true))
      .addTo(map);
    markers.push(marker);
  });

  map.setMinZoom(map.getBoundsZoom(contextBounds, true));

  function item(label, value, raw = false) {
    if (value == null || value === "") return "";
    return `<div><dt>${esc(label)}</dt><dd>${raw ? value : esc(value)}</dd></div>`;
  }

  function section(title, items, className = "") {
    const content = items.filter(Boolean).join("");
    return content ? `<section class="detail-group ${className}"><h3>${esc(title)}</h3><dl>${content}</dl></section>` : "";
  }

  function detailHtml(record, individualIndex) {
    const individual = record.individuals[individualIndex];
    const selector = record.individuals.length > 1
      ? `<div class="individual-selector"><span>この地点の個体</span><div>${record.individuals.map((entry, index) => `<button data-individual-index="${index}"${index === individualIndex ? ' class="active"' : ""}>${esc(entry.individual_id)} ${esc(entry.species_ja)}</button>`).join("")}</div></div>`
      : "";
    const conditionLabel = individual.condition_date ? `公開資料に記録された状態（${individual.condition_date}）` : "公開資料に記録された状態";
    const photo = individual.photo_url
      ? `<a href="${esc(individual.photo_url)}" target="_blank" rel="noopener">出典ページの写真を確認</a>`
      : null;
    const locationHistory = individual.transplant_text
      ? `${individual.exposure_site_name ? `被爆時所在地：${individual.exposure_site_name}／` : ""}現在地：${record.site_name}／${individual.transplant_text}`
      : null;
    const terrainTitle = individual.moved ? "現在地の地形（被爆時の環境ではない）" : "現在地の地形";
    return `<button id="detail-close" class="detail-close" type="button" aria-label="詳細パネルを閉じる">閉じる</button><header class="detail-head"><p>選択地点</p><h2>${esc(record.site_name)}</h2><span>${record.individuals.length}個体を収録</span></header>${selector}
      ${section("基本情報", [
        item("認識番号", individual.individual_id),
        item("樹種", [individual.species_ja, individual.species_scientific].filter(Boolean).join(" / ")),
        item("地点名", record.site_name),
        item("所在地", individual.address || record.address),
      ])}
      ${section("現在の状態", [
        item(conditionLabel, individual.current_condition),
        item("2017年診断時の状態", individual.diagnosis_2017 ? `${individual.diagnosis_2017}（${individual.diagnosis_2017_date || "2017年"}）` : null),
        item("大きさ", individual.size_text),
        item("樹形", individual.tree_form_text),
        item("現在の写真", photo, true),
      ])}
      ${section("被爆と保存の記録", [
        item("爆心地からの距離", individual.distance_m == null ? null : `${fmt(individual.distance_m, 0)} m`),
        item("被爆時からの場所", individual.location_history_category),
        item("被爆時所在地と現在地", locationHistory),
        item("被爆の痕跡", individual.damage_text),
        item("保存措置", individual.preservation_treatment),
      ], individual.moved ? "transplanted-record" : "")}
      ${section(terrainTitle, [
        item("標高", individual.elevation_m == null ? null : `${fmt(individual.elevation_m, 1)} m`),
        item("傾斜角", individual.slope_deg == null ? null : `${fmt(individual.slope_deg, 1)}°`),
        item("斜面方位", individual.aspect_deg == null ? null : `${fmt(individual.aspect_deg, 1)}°`),
      ])}
      ${section("出典", [
        item("資料名", individual.source_title),
        item("調査年または公開年", individual.source_year),
        item("参照URL", individual.source_url ? `<a href="${esc(individual.source_url)}" target="_blank" rel="noopener">資料を開く</a>` : null, true),
      ], "source-group")}`;
  }

  function updateDetail() {
    if (selectedSite == null) return;
    const record = D.records[selectedSite];
    detail.innerHTML = detailHtml(record, selectedIndividual);
    detail.classList.add("open");
    detail.querySelector("#detail-close").onclick = closeDetail;
    detail.querySelectorAll("[data-individual-index]").forEach((button) => {
      button.onclick = () => {
        selectedIndividual = Number(button.dataset.individualIndex);
        updateDetail();
      };
    });
  }

  function closeDetail() {
    detail.classList.remove("open");
  }

  function keepMarkerVisible(record) {
    if (!window.matchMedia("(max-width: 1100px)").matches) return;
    window.setTimeout(() => {
      map.invalidateSize();
      const markerPoint = map.latLngToContainerPoint([record.latitude, record.longitude]);
      const visibleRight = map.getSize().x - detail.offsetWidth - 24;
      if (markerPoint.x > visibleRight) {
        map.panBy([markerPoint.x - visibleRight, 0], { animate: true });
      }
    }, 180);
  }

  function updateRanges(record) {
    rangeLayer.clearLayers();
    if (!record.has_mappable_location) return;
    [50, 100, 250].forEach((radius) => L.circle([record.latitude, record.longitude], {
      radius, renderer, color: "#176d58", weight: radius === 250 ? 2 : 1,
      opacity: radius === 250 ? 0.8 : 0.5, fill: false, interactive: false,
    }).addTo(rangeLayer));
  }

  function selectSite(index, move = true) {
    selectedSite = index;
    selectedIndividual = 0;
    const record = D.records[index];
    markers.forEach((marker, markerIndex) => {
      if (marker) marker.setIcon(markerIcon(D.records[markerIndex], markerIndex === index));
    });
    updateRanges(record);
    updateDetail();
    if (move) keepMarkerVisible(record);
  }

  function distanceMatches(value, filter) {
    if (!filter) return true;
    if (value == null) return false;
    if (filter === "3000+") return Number(value) >= 3000;
    const [minimum, maximum] = filter.split("-").map(Number);
    return Number(value) >= minimum && Number(value) <= maximum;
  }

  const siteFilter = document.getElementById("filter-site");
  const speciesFilter = document.getElementById("filter-species");
  const distanceFilter = document.getElementById("filter-distance");
  const preservationFilter = document.getElementById("filter-preservation");
  const species = [...new Set(D.records.flatMap((record) => record.individuals.map((item) => item.species_ja)).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja"));
  speciesFilter.insertAdjacentHTML("beforeend", species.map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join(""));
  const preservation = [...new Set(D.records.flatMap((record) => record.individuals.map((item) => item.location_history_category)).filter(Boolean))];
  preservationFilter.insertAdjacentHTML("beforeend", preservation.map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join(""));

  function applyFilters() {
    const siteQuery = siteFilter.value.trim().toLocaleLowerCase("ja");
    const speciesQuery = speciesFilter.value;
    const distanceQuery = distanceFilter.value;
    const preservationQuery = preservationFilter.value;
    const visible = [];
    D.records.forEach((record, index) => {
      const matches = record.has_mappable_location
        && (!siteQuery || `${record.site_name} ${record.address || ""}`.toLocaleLowerCase("ja").includes(siteQuery))
        && (!speciesQuery || record.individuals.some((item) => item.species_ja === speciesQuery))
        && (!distanceQuery || record.individuals.some((item) => distanceMatches(item.distance_m, distanceQuery)))
        && (!preservationQuery || record.individuals.some((item) => item.location_history_category === preservationQuery));
      const marker = markers[index];
      if (marker && matches && !map.hasLayer(marker)) marker.addTo(map);
      if (marker && !matches && map.hasLayer(marker)) map.removeLayer(marker);
      if (matches) visible.push(index);
    });
    result.textContent = `${visible.length}地点を表示`;
    if (selectedSite != null && !visible.includes(selectedSite)) {
      selectedSite = null;
      rangeLayer.clearLayers();
      detail.innerHTML = '<p class="detail-placeholder">絞り込み結果の地点を地図上で選択してください。</p>';
      detail.classList.remove("open");
    }
    if (visible.length) {
      map.fitBounds(L.latLngBounds(visible.map((index) => [D.records[index].latitude, D.records[index].longitude])).pad(0.18), { animate: false });
    }
  }
  [siteFilter, speciesFilter, distanceFilter, preservationFilter].forEach((control) => control.addEventListener("input", applyFilters));

  function setTerrain(mode) {
    Object.values(terrainLayers).forEach((layer) => map.removeLayer(layer));
    terrainMode = mode;
    if (terrainLayers[mode]) terrainLayers[mode].addTo(map);
    document.querySelectorAll("[data-terrain]").forEach((button) => button.classList.toggle("active", button.dataset.terrain === mode));
    slopeLegend.classList.toggle("visible", mode === "slope");
  }
  document.querySelectorAll("[data-terrain]").forEach((button) => { button.onclick = () => setTerrain(button.dataset.terrain); });

  const registrySearch = document.getElementById("registry-search");
  if (registrySearch) {
    registrySearch.addEventListener("input", () => {
      const query = registrySearch.value.trim().toLocaleLowerCase("ja");
      document.querySelectorAll("[data-registry-item]").forEach((item) => {
        item.hidden = Boolean(query) && !item.textContent.toLocaleLowerCase("ja").includes(query);
      });
    });
  }

  document.getElementById("reset-view").onclick = () => {
    siteFilter.value = "";
    speciesFilter.value = "";
    distanceFilter.value = "";
    preservationFilter.value = "";
    applyFilters();
  };
  document.getElementById("micro-view").onclick = () => {
    if (selectedSite == null) return;
    const record = D.records[selectedSite];
    map.flyTo([record.latitude, record.longitude], 17, { duration: 0.6 });
  };

  const initial = D.records.findIndex((record) => record.has_mappable_location);
  applyFilters();
  if (initial >= 0) selectSite(initial, false);
  setTerrain(terrainMode);
})();
