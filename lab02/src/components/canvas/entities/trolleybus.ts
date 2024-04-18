import { Coords } from "../../../types/coords";
import { Shape } from "../../../types/shape";

export class Trolleybus implements Shape {
    public readonly x: number;
    public readonly y: number;
    public readonly width: number = 740;
    public readonly height: number = 370;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    drawWires(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.rect(coords.x, coords.y, 700, 10);
        ctx.fill();
        ctx.closePath();
    }

    drawPantograph(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.save();
        ctx.translate(coords.x, coords.y);
        ctx.rotate((30 * Math.PI) / 180);

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.rect(-300, -10, 300, 10);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    drawWheel(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(coords.x, coords.y, 30, 0, 360);
        ctx.fill();
        ctx.closePath();
    }

    drawWindow(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.fillStyle = 'deepskyblue';
        ctx.roundRect(coords.x, coords.y, 100, 60, 5);
        ctx.fill();
        ctx.closePath();
    }

    drawFrontWindow(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.fillStyle = 'deepskyblue';
        ctx.roundRect(coords.x, coords.y, 60, 60, 5);
        ctx.fill();
        ctx.closePath();
    }

    drawBody(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.roundRect(coords.x, coords.y, 600, 150, 10);
        ctx.fill();
        ctx.closePath();
    }

    drawBackground(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.fillStyle = 'silver';
        ctx.rect(coords.x, coords.y, 740, 370);
        ctx.fill();
        ctx.closePath();
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.drawBackground(ctx, this);

        this.drawPantograph(ctx, {x: this.x + 360, y: this.y + 180});

        this.drawBody(ctx, {x: this.x + 60, y: this.y + 170});
        this.drawFrontWindow(ctx, {x: this.x + 610, y: this.y + 200})

        this.drawWindow(ctx, {x: this.x + 160, y: this.y + 200});
        this.drawWindow(ctx, {x: this.x + 360, y: this.y + 200});

        this.drawWheel(ctx, {x: this.x + 560, y: this.y + 320});
        this.drawWheel(ctx, {x: this.x + 160, y: this.y + 320});

        this.drawPantograph(ctx, {x: this.x + 310, y: this.y + 180});

        this.drawWires(ctx, {x: this.x + 20, y: this.y + 20});
    }
}