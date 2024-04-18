import { Canvas } from './components/canvas/canvas'
import { Trolleybus } from './components/canvas/entities/trolleybus';
import { Dropdown } from './components/dropdown/dropdown';
import { Painting } from './components/painting/painting';
import "./styles.css";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="dropdown-container">
        <div id="file-dropdown"></div>
        <div id="canvas-dropdown"></div>
        <div id="tools-dropdown"></div>
        <select name="painting-tools" id="painting-tools"></select>
        <input type="color" id="colorpicker" />
    </div>
    <div id="canvas-container"></div>
    <dialog id="saveAsDialog">
        <form method="dialog">
            <button value="png">PNG</button>
            <button value="bmp">BMP</button>
            <button value="jpeg">JPEG</button>
            <button>Close</button>
        </form>
    </dialog>
`

const canvas = new Canvas(document.querySelector<HTMLCanvasElement>('#canvas-container')!);
canvas.registerSaveAsDialog(document.querySelector<HTMLDialogElement>('#saveAsDialog')!);
const painting = new Painting(document.querySelector<HTMLCanvasElement>('#canvas')!);
painting.registerColorpicker(document.querySelector<HTMLInputElement>('#colorpicker')!);
painting.registerPaintingTools(document.querySelector<HTMLSelectElement>('#painting-tools')!);
const fileDropdown = new Dropdown(document.querySelector<HTMLDivElement>('#file-dropdown')!, 
    {
        title: "File", 
        options: [
            {
                lable: "New",
                onClick: (e) => {
                    canvas.clear();
                }
            },
            {
                lable: "Open",
                onClick: (e) => {
                    canvas.uploadImage();
                }
            },
            {
                lable: "Save as",
                onClick: (e) => {
                    // @ts-ignore
                    window.saveAsDialog.showModal();
                }
            }
        ]
    }
);

const canvasDropdown = new Dropdown(document.querySelector<HTMLDivElement>('#canvas-dropdown')!, 
    {
        title: "Canvas", 
        options: [
            {
                lable: "Add trolleybus",
                onClick: (e) => {
                    const trolleybus = new Trolleybus(250, 50);
                    canvas.addShape(trolleybus);
                }
        
            }
        ]
    }
);
