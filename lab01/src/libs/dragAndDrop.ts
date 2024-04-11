import { Coords } from "../types/coords";
import { Shape } from "../types/shape";
import { findLastIndex } from "./findLast";
import { isMouseInRect } from "./objectChecking";

export class DragAndDrop {
    private coords: Coords = {x: 0, y: 0};
    private objects: Shape[];
    private draggingObj: Shape | null = null;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, objects: Shape[]) {
        this.canvas = canvas;
        this.objects = objects;
        this.canvas.addEventListener('mousedown', (e) => {this.mouseDown(e);});
        this.canvas.addEventListener('mouseup', (e) => {this.mouseUp(e);});
        this.canvas.addEventListener('mouseout', (e) => {this.mouseUp(e);});
        this.canvas.addEventListener('mousemove', (e) => {this.mouseMove(e);});
    }

    dispose() {
        this.canvas.removeEventListener('mousedown', this.mouseDown);
        this.canvas.removeEventListener('mouseup', (e) => {this.mouseUp(e);});
        this.canvas.removeEventListener('mouseout', (e) => {this.mouseUp(e);});
        this.canvas.removeEventListener('mousemove', (e) => {this.mouseMove(e);});
    }

    mouseDown(e: MouseEvent): void {
        e.preventDefault();

        const target = e.target as HTMLCanvasElement;
        if (target === null) {
            return;
        }

        target.style.cursor = 'pointer';
        this.coords = {x: e.clientX, y: e.clientY};

        const canvasRect = target.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;

        const index = findLastIndex(this.objects, (obj) => {
            return isMouseInRect(clickX, clickY, obj);
        });
        this.draggingObj = index === -1 ? null : this.objects[index];
    };

    mouseUp(e: MouseEvent) {
        if (!this.draggingObj) return;

        e.preventDefault();
        const target = e.target as HTMLCanvasElement;
        if (target === null) {
            return;
        }

        target.style.cursor = 'auto';

        this.draggingObj = null;
    };

    mouseMove(e: MouseEvent) {
        if (!this.draggingObj) return;

        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dx = mouseX - this.coords.x;
        const dy = mouseY - this.coords.y;

        this.draggingObj.x += dx;
        this.draggingObj.y += dy;

        const ctx = (e.target as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
        ctx.reset();

        this.objects.forEach((obj) => obj.draw(ctx));

        this.coords = {x: mouseX, y: mouseY};
    };
}