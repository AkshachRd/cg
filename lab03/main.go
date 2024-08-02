package main

import (
	"fmt"
	"github.com/go-gl/gl/v4.1-core/gl"
	"github.com/go-gl/glfw/v3.3/glfw"
	"github.com/go-gl/mathgl/mgl32"
	"log"
	"math"
	"runtime"
	"strings"
)

const (
	width  = 800
	height = 600
)

func init() {
	runtime.LockOSThread()
}

func main() {
	if err := glfw.Init(); err != nil {
		log.Fatalln("failed to initialize glfw:", err)
	}
	defer glfw.Terminate()

	glfw.WindowHint(glfw.ContextVersionMajor, 4)
	glfw.WindowHint(glfw.ContextVersionMinor, 1)
	glfw.WindowHint(glfw.OpenGLProfile, glfw.OpenGLCoreProfile)
	glfw.WindowHint(glfw.OpenGLForwardCompatible, glfw.True)

	window, err := glfw.CreateWindow(width, height, "Harmonic Sum Graph", nil, nil)
	if err != nil {
		panic(err)
	}
	window.MakeContextCurrent()

	if err := gl.Init(); err != nil {
		panic(err)
	}

	program := initOpenGL()
	gl.UseProgram(program)

	var vao uint32
	gl.GenVertexArrays(1, &vao)
	gl.BindVertexArray(vao)

	vertices := generateGraphData(-6*math.Pi, 6*math.Pi, 1000)
	var vbo uint32
	gl.GenBuffers(1, &vbo)
	gl.BindBuffer(gl.ARRAY_BUFFER, vbo)
	gl.BufferData(gl.ARRAY_BUFFER, len(vertices)*4, gl.Ptr(vertices), gl.STATIC_DRAW)

	gl.VertexAttribPointer(0, 2, gl.FLOAT, false, 0, nil)
	gl.EnableVertexAttribArray(0)

	for !window.ShouldClose() {
		draw(window, program, vao)
		window.SwapBuffers()
		glfw.PollEvents()
	}
}

func generateGraphData(start, end float64, steps int) []float32 {
	stepSize := (end - start) / float64(steps)
	data := make([]float32, 0, steps*2)
	for i := 0; i <= steps; i++ {
		x := start + float64(i)*stepSize
		y := math.Sin(3*x) + math.Cos(2*x+12*math.Pi)
		data = append(data, float32(x), float32(y))
	}
	return data
}

func draw(window *glfw.Window, program uint32, vao uint32) {
	gl.Clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	width, height := window.GetSize()
	aspect := float32(width) / float32(height)
	var projection mgl32.Mat4
	if width >= height {
		projection = mgl32.Ortho2D(-6*math.Pi*aspect, 6*math.Pi*aspect, -10, 10)
	} else {
		projection = mgl32.Ortho2D(-6*math.Pi, 6*math.Pi, -10/aspect, 10/aspect)
	}

	gl.UniformMatrix4fv(gl.GetUniformLocation(program, gl.Str("projection\x00")), 1, false, &projection[0])

	gl.BindVertexArray(vao)
	gl.DrawArrays(gl.LINE_STRIP, 0, 1001)
}

func initOpenGL() uint32 {
	vertexShader, err := compileShader(vertexShaderSource, gl.VERTEX_SHADER)
	if err != nil {
		panic(err)
	}

	fragmentShader, err := compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
	if err != nil {
		panic(err)
	}

	program := gl.CreateProgram()
	gl.AttachShader(program, vertexShader)
	gl.AttachShader(program, fragmentShader)
	gl.LinkProgram(program)

	gl.DeleteShader(vertexShader)
	gl.DeleteShader(fragmentShader)

	return program
}

func compileShader(source string, shaderType uint32) (uint32, error) {
	shader := gl.CreateShader(shaderType)

	csources, free := gl.Strs(source)
	gl.ShaderSource(shader, 1, csources, nil)
	free()
	gl.CompileShader(shader)

	var status int32
	gl.GetShaderiv(shader, gl.COMPILE_STATUS, &status)
	if status == gl.FALSE {
		var logLength int32
		gl.GetShaderiv(shader, gl.INFO_LOG_LENGTH, &logLength)

		log := strings.Repeat("\x00", int(logLength+1))
		gl.GetShaderInfoLog(shader, logLength, nil, gl.Str(log))

		return 0, fmt.Errorf("failed to compile %v: %v", source, log)
	}

	return shader, nil
}

const vertexShaderSource = `
#version 410
in vec2 position;
uniform mat4 projection;
void main() {
    gl_Position = projection * vec4(position, 0.0, 1.0);
}
` + "\x00"

const fragmentShaderSource = `
#version 410
out vec4 color;
void main() {
    color = vec4(1.0, 0.0, 0.0, 1.0); // Red color for the graph
}
` + "\x00"
