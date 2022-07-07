export function isBool(value) {
    return typeof value === "boolean";
}
export const nextFrame = (callback) => {
    let rafId = 0;
    rafId = requestAnimationFrame(() => {
        callback();
        cancelAnimationFrame(rafId);
    });
};
