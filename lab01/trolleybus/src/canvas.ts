import { Trolleybus } from "./entities/trolleybus";
import { DragAndDrop } from "./libs/dragAndDrop";

export const setupCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        return;
    }

    const trolleybus1 = new Trolleybus(250, 50);

    const park = [trolleybus1];
    park.forEach((tb) => {tb.draw(ctx);});
    const dnd = new DragAndDrop(canvas, park);
}