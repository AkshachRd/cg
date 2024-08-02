import { Coords } from "../types/coords";
import { Shape } from "../types/shape";

const LETTER_HEIGHT = 200;
const LETTER_WIDTH = 50;
const LETTER_OFFSET = 50;

export class Initials implements Shape {
    public x: number;
    public y: number;
    public width: number = LETTER_WIDTH * 3 + LETTER_OFFSET * 2;
    public height: number = LETTER_HEIGHT;

    private vyKh: number = 15;
    private vyN: number = 25;
    private count: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    drawLetterKh(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.lineCap = "square";
        ctx.lineWidth = 15;

        ctx.moveTo(coords.x, coords.y);
        ctx.lineTo(coords.x + LETTER_WIDTH, coords.y + LETTER_HEIGHT);

        ctx.moveTo(coords.x + LETTER_WIDTH, coords.y);
        ctx.lineTo(coords.x, coords.y + LETTER_HEIGHT);

        ctx.stroke();
    }

    drawLetterN(ctx: CanvasRenderingContext2D, coords: Coords) {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineCap = "butt";
        ctx.lineWidth = 5;

        ctx.moveTo(coords.x, coords.y);
        ctx.lineTo(coords.x, coords.y + LETTER_HEIGHT);

        ctx.moveTo(coords.x + LETTER_WIDTH, coords.y);
        ctx.lineTo(coords.x + LETTER_WIDTH, coords.y + LETTER_HEIGHT);

        ctx.moveTo(coords.x, coords.y + LETTER_HEIGHT / 2);
        ctx.lineTo(coords.x + LETTER_WIDTH, coords.y + LETTER_HEIGHT / 2);

        ctx.stroke();
    }

    drawLetterD(ctx: CanvasRenderingContext2D, coords: Coords) {
        const angle = this.count * 0.1;
        const y = coords.y - Math.abs(Math.sin(angle)) * LETTER_HEIGHT;

        ctx.clearRect(coords.x, coords.y - LETTER_HEIGHT, LETTER_WIDTH, LETTER_HEIGHT * 2);
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineCap = "round";
        ctx.lineWidth = 10;

        ctx.moveTo(coords.x + LETTER_WIDTH / 2, y);
        ctx.lineTo(coords.x + 10, y + LETTER_HEIGHT - 40);
        ctx.lineTo(coords.x + LETTER_WIDTH - 10, y + LETTER_HEIGHT - 40);
        ctx.lineTo(coords.x + LETTER_WIDTH / 2, y);

        ctx.moveTo(coords.x, y + LETTER_HEIGHT);
        ctx.lineTo(coords.x, y + LETTER_HEIGHT - 40);
        ctx.lineTo(coords.x + LETTER_WIDTH, y + LETTER_HEIGHT - 40);
        ctx.lineTo(coords.x + LETTER_WIDTH, y + LETTER_HEIGHT);
        ctx.stroke();

        this.count++;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.drawLetterD(ctx, {x: this.x, y: this.y});
        if (this.count > 1000) {
            this.count = 0;
        }
        this.drawLetterN(ctx, {x: this.x + LETTER_OFFSET + LETTER_WIDTH, y: this.y});
        this.drawLetterKh(ctx, {x: this.x + (LETTER_OFFSET + LETTER_WIDTH) * 2, y: this.y});
        // @ts-ignore
        window.requestAnimationFrame(this.draw(ctx));
    }
}