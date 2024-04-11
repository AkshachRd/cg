import { drawTrolleybus } from "./draw";

export const setupCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        return;
    }

    drawTrolleybus(ctx);
}