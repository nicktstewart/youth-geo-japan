(() => {
  "use strict";
  const D = window.CITY_DATA;
  if (!D || !window.L) return;

  const list = document.getElementById("site-list");
  const detail = document.getElementById("detail");
  const terrainReadout = document.getElementById("terrain-readout");
  const slopeLegend = document.getElementById("slope-legend");
  const esc = (value) => String(value ?? "—").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const fmt = (value, digits = 1) => value == null ? "—" : Number(value).toFixed(digits);

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

  const attribution = '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>';
  map.attributionControl.addAttribution(attribution);
  L.imageOverlay(D.map_images.base.url, D.map_images.base.bounds, {
    opacity: 1,
    interactive: false,
  }).addTo(map);

  const terrainLayers = {
    hillshade: L.imageOverlay(D.map_images.hillshade.url, D.map_images.hillshade.bounds, {
      opacity: 0.42, interactive: false,
    }),
    slope: L.imageOverlay(D.map_images.slope.url, D.map_images.slope.bounds, {
      opacity: 0.58, interactive: false,
    }),
  };
  let terrainMode = "hillshade";
  terrainLayers.hillshade.addTo(map);

  L.control.scale({ imperial: false, position: "bottomright", maxWidth: 130 }).addTo(map);
  const canvasRenderer = L.canvas({ padding: 0.5 });
  const allPoints = [[D.hypocenter.latitude, D.hypocenter.longitude]];
  const markers = [];
  let selected = 0;
  let rangeLayer = L.layerGroup().addTo(map);

  function slopeClass(value) {
    const slope = Number(value);
    if (slope < 2) return "ほぼ平坦";
    if (slope < 5) return "緩斜面";
    if (slope < 15) return "斜面";
    return "急斜面";
  }

  function markerIcon(record, active = false) {
    return L.divIcon({
      className: "tree-marker-wrap",
      html: `<span class="tree-marker${active ? " active" : ""}" style="--marker:${record.survival_state_color}">${record.tree_count > 1 ? record.tree_count : ""}</span>`,
      iconSize: active ? [34, 34] : [28, 28],
      iconAnchor: active ? [17, 17] : [14, 14],
      tooltipAnchor: [12, 0],
    });
  }

  function popupHtml(record) {
    return `<div class="map-popup"><b>${esc(record.site_name)}</b><span>${esc(record.survival_state_label)}</span><dl><dt>標高</dt><dd>${fmt(record.elevation_m, 1)} m</dd><dt>傾斜</dt><dd>${fmt(record.slope_deg, 1)}°・${slopeClass(record.slope_deg)}</dd><dt>局所比高</dt><dd>${fmt(record.local_relief_5px_m, 1)} m</dd></dl></div>`;
  }

  const hypocenter = [D.hypocenter.latitude, D.hypocenter.longitude];
  [500, 1000, 2000].forEach((radius) => L.circle(hypocenter, {
    radius,
    renderer: canvasRenderer,
    color: "#9b4e3f",
    weight: 1,
    opacity: 0.45,
    fill: false,
    dashArray: "5 6",
    interactive: false,
  }).addTo(map));
  L.marker(hypocenter, {
    icon: L.divIcon({ className: "hypocenter-icon", html: "<span>爆心地</span>", iconSize: [70, 30], iconAnchor: [10, 15] }),
    interactive: false,
  }).addTo(map);

  D.records.forEach((record, index) => {
    const latlng = [record.latitude, record.longitude];
    allPoints.push(latlng);
    const marker = L.marker(latlng, { icon: markerIcon(record), riseOnHover: true })
      .bindTooltip(`${esc(record.site_name)}｜${fmt(record.elevation_m, 1)} m・${fmt(record.slope_deg, 1)}°`, { direction: "right" })
      .bindPopup(popupHtml(record), { minWidth: 190 })
      .on("click", () => select(index, false))
      .addTo(map);
    markers.push(marker);
  });

  function terrainRelation(record) {
    const delta = Number(record.slope_deg) - Number(D.terrain_median_slope_deg);
    const comparison = Math.abs(delta) < 0.5 ? "都市中央値とほぼ同じ" : delta > 0 ? `都市中央値より${fmt(delta, 1)}°急` : `都市中央値より${fmt(Math.abs(delta), 1)}°緩やか`;
    return `${slopeClass(record.slope_deg)}／${comparison}`;
  }

  function updateTerrainReadout(record) {
    terrainReadout.innerHTML = `<p>TERRAIN AT THIS SITE</p><h3>${esc(record.site_name)}</h3><div><span><small>標高</small><b>${fmt(record.elevation_m, 1)} m</b></span><span><small>傾斜</small><b>${fmt(record.slope_deg, 1)}°</b></span><span><small>局所比高</small><b>${fmt(record.local_relief_5px_m, 1)} m</b></span></div><strong>${terrainRelation(record)}</strong><em>地形は残存理由の候補を検討する文脈です。この試作では共通する傾斜条件は確認されていません。</em>`;
  }

  function updateRanges(record) {
    rangeLayer.clearLayers();
    [50, 100, 250].forEach((radius) => L.circle([record.latitude, record.longitude], {
      radius,
      renderer: canvasRenderer,
      color: "#176d58",
      weight: radius === 250 ? 2 : 1,
      opacity: radius === 250 ? 0.8 : 0.5,
      fill: false,
      interactive: false,
    }).addTo(rangeLayer));
  }

  function detailHtml(record) {
    return `<header class="detail-head"><p class="eyebrow">${esc(record.mechanism_label)}</p><h2>${esc(record.site_name)}</h2><p><span class="detail-state" style="--state:${record.survival_state_color}">${esc(record.survival_state_label)}</span>${esc(record.name_ja)}｜${record.tree_count}本相当</p></header><section class="story-block"><span>WHAT DAMAGED IT</span><h3>何が木を傷つけたか</h3><p>${esc(record.damage_factor)}</p></section><section class="story-block answer"><span>HOW IT REMAINS</span><h3>なぜ現在まで残ったと考えられるか</h3><p>${esc(record.retention_pathway)}</p></section><section class="story-block terrain-story"><span>TERRAIN CONTEXT</span><h3>この地点の地形</h3><p>標高${fmt(record.elevation_m, 1)} m、傾斜${fmt(record.slope_deg, 1)}°（${slopeClass(record.slope_deg)}）、局所比高${fmt(record.local_relief_5px_m, 1)} m。${terrainRelation(record)}です。</p><small>現在地形の記述であり、初期生存原因の証明ではありません。</small></section><section class="story-block unknown"><span>WHAT WE STILL DON'T KNOW</span><h3>まだ分からないこと</h3><p>${esc(record.uncertainty_statement)}</p></section><section class="fact-section"><h3>根拠と現在環境</h3><div class="fact-grid"><div><span>証拠評価</span><strong>${esc(record.evidence_level)}</strong></div><div><span>爆心地から</span><strong>${fmt(record.calculated_distance_m, 0)} m</strong></div><div><span>建物率 100 m</span><strong>${fmt(record.building_cover_100m_pct, 1)}%</strong></div><div><span>緑地率 100 m</span><strong>${fmt(record.green_cover_100m_pct, 1)}%</strong></div></div><p>${esc(record.evidence_assessment)}</p><a class="source-link" href="${esc(record.source_url)}" target="_blank" rel="noopener">公式資料を確認する →</a></section>`;
  }

  function select(index, move = true) {
    selected = index;
    const record = D.records[index];
    list.querySelectorAll("button").forEach((button, itemIndex) => button.classList.toggle("active", itemIndex === index));
    markers.forEach((marker, itemIndex) => marker.setIcon(markerIcon(D.records[itemIndex], itemIndex === index)));
    updateRanges(record);
    updateTerrainReadout(record);
    detail.innerHTML = detailHtml(record);
    if (move) map.flyTo([record.latitude, record.longitude], 16, { duration: 0.65 });
  }

  function initList() {
    list.innerHTML = D.records.map((record) => `<button class="site-choice"><strong>${esc(record.site_name)}</strong><small>${esc(record.name_ja)}・${record.tree_count}本相当</small><span class="state-badge" style="--state:${record.survival_state_color}">${esc(record.survival_state_label)}</span><span class="terrain-mini">標高 ${fmt(record.elevation_m, 0)} m｜傾斜 ${fmt(record.slope_deg, 1)}°</span></button>`).join("");
    list.querySelectorAll("button").forEach((button, index) => { button.onclick = () => select(index); });
  }

  function setTerrain(mode) {
    Object.values(terrainLayers).forEach((layer) => map.removeLayer(layer));
    terrainMode = mode;
    if (terrainLayers[mode]) terrainLayers[mode].addTo(map);
    document.querySelectorAll("[data-terrain]").forEach((button) => button.classList.toggle("active", button.dataset.terrain === mode));
    slopeLegend.classList.toggle("visible", mode === "slope");
  }

  document.querySelectorAll("[data-terrain]").forEach((button) => { button.onclick = () => setTerrain(button.dataset.terrain); });
  document.getElementById("reset-view").onclick = () => map.flyToBounds(L.latLngBounds(allPoints).pad(0.18), { duration: 0.7 });
  document.getElementById("micro-view").onclick = () => {
    const record = D.records[selected];
    map.flyTo([record.latitude, record.longitude], 17, { duration: 0.6 });
  };

  initList();
  map.fitBounds(L.latLngBounds(allPoints).pad(0.18), { animate: false });
  select(0, false);
  setTerrain(terrainMode);
})();
