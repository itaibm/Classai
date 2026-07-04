/**
 * Pure SVG layout geometry helpers — no React, no imports.
 * All functions return coordinates/paths for a ~260×150 viewBox.
 */

export function arrayDots(
  rows: number,
  cols: number,
  gap: number = 20,
  r: number = 4
): { cx: number; cy: number }[] {
  const result: { cx: number; cy: number }[] = [];
  const totalWidth = (cols - 1) * gap;
  const totalHeight = (rows - 1) * gap;
  const startX = (260 - totalWidth) / 2;
  const startY = (150 - totalHeight) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result.push({
        cx: startX + col * gap,
        cy: startY + row * gap,
      });
    }
  }

  return result;
}

export function tenFrameCells(
  cell: number = 40,
  gap: number = 10
): { x: number; y: number }[] {
  const result: { x: number; y: number }[] = [];
  const rows = 2;
  const cols = 5;
  const totalWidth = cols * (cell + gap) - gap;
  const totalHeight = rows * (cell + gap) - gap;
  const startX = (260 - totalWidth) / 2;
  const startY = (150 - totalHeight) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result.push({
        x: startX + col * (cell + gap),
        y: startY + row * (cell + gap),
      });
    }
  }

  return result;
}

export function numberLineTicks(
  min: number,
  max: number,
  width: number = 228
): { n: number; x: number; big: boolean }[] {
  const result: { n: number; x: number; big: boolean }[] = [];
  const count = max - min + 1;
  const startX = 16;

  for (let i = 0; i < count; i++) {
    const n = min + i;
    const x = startX + (i / (count - 1)) * width;
    result.push({
      n,
      x,
      big: n % 2 === 0,
    });
  }

  return result;
}

export function pieSlices(n: number, r: number = 34): string[] {
  const result: string[] = [];
  const angleStep = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const angle1 = i * angleStep;
    const angle2 = (i + 1) * angleStep;

    const x1 = r * Math.cos(angle1);
    const y1 = r * Math.sin(angle1);
    const x2 = r * Math.cos(angle2);
    const y2 = r * Math.sin(angle2);

    // large-arc-flag: 1 if angle > 180°, 0 otherwise
    const largeArc = angleStep > Math.PI ? 1 : 0;

    const path = `M0 0 L${x1} ${y1} A${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    result.push(path);
  }

  return result;
}
