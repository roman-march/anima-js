export function isBool(value: any): boolean {
  return typeof value === "boolean";
}

export const nextFrame = (callback: Function) => {
  let rafId: number = 0;

  rafId = requestAnimationFrame(() => {
    callback();
    cancelAnimationFrame(rafId);
  });
};
