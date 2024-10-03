import { Rect } from "./rect";

export interface Shape extends Rect {
    draw(ctx: CanvasRenderingContext2D): void;
}