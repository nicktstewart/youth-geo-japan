export function AnimatedBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="map-grid absolute inset-0 opacity-45" />
      <span className="float-orb absolute left-[8%] top-[18%] size-24 rounded-full bg-[#a9dbee]/55" />
      <span className="float-orb-delayed absolute bottom-[18%] right-[12%] size-32 rounded-full bg-[#6bbc70]/35" />
      <span className="absolute right-[22%] top-[20%] h-28 w-1 rotate-45 rounded-full bg-[#f8d478]/70" />
    </div>
  );
}
