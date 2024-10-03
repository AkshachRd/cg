import { Initials } from "./entities/initials";

export const setupCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        return;
    }

    const initials = new Initials(500, 250);

    initials.animate(ctx);
}