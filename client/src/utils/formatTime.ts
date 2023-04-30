export default function formatTime(timestamp: number) {
  return new Date(timestamp).toTimeString().split(" ")[0];
}
