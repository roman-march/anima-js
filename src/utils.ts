export function isBool(value: any): boolean {
  return typeof value === "boolean";
}

export const nextFrame = (callback: () => void) => {
  let rafId: number = 0;

  rafId = requestAnimationFrame(() => {
    callback();
    cancelAnimationFrame(rafId);
  });
};
