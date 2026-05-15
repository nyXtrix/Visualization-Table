export function formatCompactNumber(
  value: null | undefined | string | number
): string {
  if (value === null || value === undefined || value === "" || value === "-") {
    return "-";
  }

  const num = Number(value);
  if (isNaN(num)) return String(value);

  if (num < 0) {
    return "-" + formatPositiveNumber(Math.abs(num));
  }

  return formatPositiveNumber(num);
}

function formatPositiveNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return format(num, 1_000_000_000, "B");
  }

  if (num >= 1_000_000) {
    return format(num, 1_000_000, "M");
  }

  if (num >= 1_000) {
    return format(num, 1_000, "K");
  }
  

  return num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}

function format(num: number, divisor: number, suffix: string): string {
  return (num / divisor)
    .toFixed(2)
    .replace(/\.?0+$/, "") + suffix;
}