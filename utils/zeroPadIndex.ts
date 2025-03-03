export default function ZeroPadIndex(index: number): string {
  return index < 10 ? `0${index}` : `${index}`;
}
