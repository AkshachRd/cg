import { Shape } from "../../../types/shape";

export class ImageShape implements Shape {
    public src: string;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor(src: string) {
        this.src = src;

        const img = new Image();
        img.src = this.src;

        img.onload = () => {
            this.width = img.naturalWidth;
            this.height = img.naturalHeight;
        };
        img.onerror = () => {
            this.src = "../../../assets/error.jpg";
        };
    }

    draw(ctx: CanvasRenderingContext2D) {
        const img = new Image();
        img.src = this.src;
        img.onload = () => {
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        };
    }
}