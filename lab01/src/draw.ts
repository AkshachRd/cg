import { Coords } from "./types/coords"

const drawWires = (ctx: CanvasRenderingContext2D, coords: Coords) => {
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.rect(coords.x, coords.y, 700, 10);
    ctx.fill();
    ctx.closePath();
}

const drawPantograph = (ctx: CanvasRenderingContext2D, coords: Coords) => {
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

const drawWheel = (ctx: CanvasRenderingContext2D, coords: Coords) => {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(coords.x, coords.y, 30, 0, 360);
    ctx.fill();
    ctx.closePath();
}

const drawWindow = (ctx: CanvasRenderingContext2D, coords: Coords) => {
    ctx.beginPath();
    ctx.fillStyle = 'deepskyblue';
    ctx.roundRect(coords.x, coords.y, 100, 60, 5);
    ctx.fill();
    ctx.closePath();
}

const drawFrontWindow = (ctx: CanvasRenderingContext2D, coords: Coords) => {
    ctx.beginPath();
    ctx.fillStyle = 'deepskyblue';
    ctx.roundRect(coords.x, coords.y, 60, 60, 5);
    ctx.fill();
    ctx.closePath();
}

const drawBody = (ctx: CanvasRenderingContext2D, coords: Coords) => {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(coords.x, coords.y, 600, 150, 10);
    ctx.fill();
    ctx.closePath();
}

export const drawTrolleybus = (ctx: CanvasRenderingContext2D) => {
    drawPantograph(ctx, {x: 600, y: 210});

    drawBody(ctx, {x: 300, y: 200});
    drawFrontWindow(ctx, {x: 850, y: 230})

    drawWindow(ctx, {x: 400, y: 230});
    drawWindow(ctx, {x: 600, y: 230});

    drawWheel(ctx, {x: 800, y: 350});
    drawWheel(ctx, {x: 400, y: 350});

    drawPantograph(ctx, {x: 550, y: 210});

    drawWires(ctx, {x: 250, y: 50});
}