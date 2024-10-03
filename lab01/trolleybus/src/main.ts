import { setupCanvas } from './canvas'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" width="1000px" height="1000px" />
`

setupCanvas(document.querySelector<HTMLCanvasElement>('#canvas')!)
