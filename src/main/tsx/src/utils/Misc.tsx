export function formatNumber(value: string): string {
  value.replaceAll(/D/g, '');
  [3, 7].map((d) => {
    if (value.length > d && value.charAt(d) !== '-') {
      value = value.substring(0, d) + '-' + value.substring(d, 12);
    }
  });
  if (value.length >= 12) {
    value = value.substring(0, 12);
  }
  return value;
}
