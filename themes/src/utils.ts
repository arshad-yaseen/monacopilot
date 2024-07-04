export const normalizeColor = (color: string | undefined) => {
  if (typeof color !== 'string') return color || '';

  color = (color.charCodeAt(0) === 35 ? color.slice(1) : color).toLowerCase();

  // #RGB => #RRGGBB - Monaco does not support hex color with 3 or 4 digits
  if (color.length === 3 || color.length === 4)
    color = color
      .split('')
      .map(c => c + c)
      .join('');

  return color;
};
