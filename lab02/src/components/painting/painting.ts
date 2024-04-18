import { Point } from "../../types/point";

export enum PaintingTools {
    None = "none",
    Brush = "brush",
    Pencil = "pencil"
}

export class Painting {
    private color = "#000000";
    private strokeWidth = 25;
    private latestPoint: Point = {x: 0, y: 0};
    private _isDrawing = false;
    private tool: PaintingTools = PaintingTools.None;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.addEventListener("mousedown", (e) => {this.mouseDown(e);}, false);
        this.canvas.addEventListener("mouseup", (e) => {this.endStroke(e);}, false);
        this.canvas.addEventListener("mouseout", (e) => {this.endStroke(e);}, false);
        this.canvas.addEventListener("mouseenter", (e) => {this.mouseEnter(e);}, false);
    }

    setTool(tool: PaintingTools) {
        this.tool = tool;
    }

    private get isDrawing(): boolean {
        this._isDrawing = this._isDrawing && this.tool !== PaintingTools.None;
        return this._isDrawing;
    }

    private set isDrawing(value: boolean) {
        this._isDrawing = value;
    }

    continueStroke(newPoint: Point) {
        this.ctx.beginPath();

        this.ctx.moveTo(this.latestPoint.x, this.latestPoint.y);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.strokeWidth;

        switch (this.tool) {
            case PaintingTools.Brush:
                this.ctx.lineCap = "round";
                this.ctx.lineJoin = "round";
                break;
            case PaintingTools.Pencil:
                this.ctx.lineCap = "square";
                this.ctx.lineJoin = "miter";
                break;
        }
        
        this.ctx.lineTo(newPoint.x, newPoint.y);

        this.ctx.stroke();
    
        this.latestPoint = newPoint;
    };

    private static isPrimaryButtonPressed(e: MouseEvent): boolean {
        return e.button === 1;
    }

    private startStroke(point: Point) {
        this.isDrawing = true;
        
        this.latestPoint = point;
    };

    private mouseMove(e: MouseEvent) {
        if (!this.isDrawing) {
            return;
        }

        const canvasRect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;
        this.continueStroke({x: clickX, y: clickY});
    };
    
    private mouseDown(e: MouseEvent) {
        if (this.isDrawing) {
            return;
        }

        e.preventDefault();
        this.canvas.addEventListener("mousemove", (e) => {this.mouseMove(e);}, false);

        const canvasRect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;
        this.startStroke({x: clickX, y: clickY});
    };
    
    private mouseEnter(e: MouseEvent) {
        if (!Painting.isPrimaryButtonPressed(e) || this.isDrawing) {
            return;
        }
        this.mouseDown(e);
    };
    
    private endStroke(e: MouseEvent) {
        if (!this.isDrawing) {
            return;
        }
        this.isDrawing = false;

        e.currentTarget!.removeEventListener("mousemove", (e) => {this.mouseMove(e as MouseEvent);}, false);
    };

    registerColorpicker(colorpicker: HTMLInputElement) {
        colorpicker.addEventListener("change", (e) => {
            if (e.target !== null) {
                this.color = (e.target as HTMLInputElement).value;
            }
        })
    }

    registerPaintingTools(paintingTools: HTMLSelectElement) {
        Object.entries(PaintingTools).forEach(([key, value]) => {
            const option = document.createElement("option");
            option.selected = value === this.tool;
            option.text = key;
            option.value = value;
            paintingTools.appendChild(option);
        });
        
        paintingTools.addEventListener("change", (e) => {
            const value = (e.target as HTMLSelectElement).value;
            if (Object.values(PaintingTools).includes(value as PaintingTools)) {
                this.tool = value as PaintingTools;
            }
        });
    }
}