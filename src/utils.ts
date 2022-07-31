export function isBool(value: any): boolean {
  return typeof value === "boolean";
}

export function isNone(value: any): boolean {
  return value === null || value === undefined;
}

export const nextFrame = (callback: () => void) => {
  let rafId: number = 0;

  rafId = requestAnimationFrame(() => {
    callback();
    cancelAnimationFrame(rafId);
  });
};
