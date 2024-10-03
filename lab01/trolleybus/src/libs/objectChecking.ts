import { Rect } from "../types/rect";

export const isMouseInRect = (clickX: number, clickY: number, obj: Rect) => {
    const topSide = obj.y;
    const rightSide = obj.x + obj.width;
    const bottomSide = obj.y + obj.height;
    const leftSide = obj.x;

    return clickX > leftSide && clickX < rightSide && clickY > topSide && clickY < bottomSide;
};