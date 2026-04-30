/** Round up to nearest multiple of 100, clamped so there is headroom */
export const ceilToHundred = (val: number): number => {
  const ceil = Math.ceil(val / 100) * 100;
  return ceil === val ? ceil + 100 : ceil;
};
