import { DragAndDrop } from "../../libs/dragAndDrop";
import { Shape } from "../../types/shape";
import { ImageShape } from "./entities/imageShape";
import { convertToBase64 } from "./lib";
import {CanvasToBMP} from "../../libs/canvasToBMP";

export class Canvas {
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private shapes: Shape[] = [];

    constructor(canvasContainer: HTMLCanvasElement) {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        canvasContainer.appendChild(canvas);

        this.canvas = canvas;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.ctx = ctx;

        // const dnd = new DragAndDrop(canvas, this.shapes);
    }

    clear() {
        this.shapes.length = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw() {
        this.shapes.forEach((shape) => {shape.draw(this.ctx);});
    }

    addShape(shape: Shape) {
        this.shapes.push(shape);
        this.draw();    
    }

    uploadImage() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".png, .jpg, .jpeg .bmp";

        fileInput.addEventListener("cancel", () => {
            console.log("Cancelled.");
        });
        fileInput.addEventListener("change", async () => {
            if (fileInput.files!.length < 1) {
                throw new Error("File wasn't uploaded");
            }

            const file = fileInput.files![0];
            const base64 = await convertToBase64(file);
            this.addShape(new ImageShape(base64));
        });

        fileInput.click();
    }

    private exportAs(ext: string): string {
        if (ext.toLowerCase() === "bmp") {
            debugger
            return CanvasToBMP.toDataURL(this.canvas);
        }

        return this.canvas.toDataURL(`image/${ext}`);
    };

    public saveAsImage(ext: string, fileName: string): void {
        const fakeLink = window.document.createElement("a");
        fakeLink.setAttribute("style", "display:none");
        fakeLink.href = this.exportAs(ext);
        fakeLink.download = fileName;
        fakeLink.download
    
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
    
        fakeLink.remove();
    };

    registerSaveAsDialog(saveAsDialog: HTMLDialogElement) {
        saveAsDialog.addEventListener("close", (e) => {
            if (["bmp", "jpeg", "png"].includes(saveAsDialog.returnValue)) {
                this.saveAsImage(saveAsDialog.returnValue, "canvas")
            }
        });
    }
}