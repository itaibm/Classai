/** Deterministic "zigzag from both ends" shuffle — never equals the source
 * order when there's more than one item, but stable across re-renders. */
export function zigzagOrder(n: number): number[] {
  const order: number[] = [];
  let lo = 0;
  let hi = n - 1;
  let takeHigh = true;
  while (lo <= hi) {
    if (takeHigh) {
      order.push(hi);
      hi -= 1;
    } else {
      order.push(lo);
      lo += 1;
    }
    takeHigh = !takeHigh;
  }
  return order;
}
