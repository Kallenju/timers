export default function formatDuration(start: number, end?: number) {
  let duration;

  if (end === undefined) {
    duration = Math.round((Date.now() - start) / 100) * 100;
  } else {
    duration = Math.round((end - start) / 100) * 100;
  }

  duration = Math.floor(duration / 1000);
  const s = duration % 60;
  duration = Math.floor(duration / 60);
  const m = duration % 60;
  const h = Math.floor(duration / 60);
  return [h > 0 ? h : null, m, s]
    .filter((x) => x !== null)
    .map((x) => (x! < 10 ? "0" : "") + x)
    .join(":");
}


