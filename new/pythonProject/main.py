from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *
import numpy as np

# Инициализация окна
def init():
    glClearColor(1.0, 1.0, 1.0, 1.0)
    gluOrtho2D(-20.0, 20.0, -20.0, 20.0)

# Функция для рисования осей
def draw_axes():
    glColor3f(0.0, 0.0, 0.0)
    glBegin(GL_LINES)
    # X axis
    glVertex2f(-20.0, 0.0)
    glVertex2f(20.0, 0.0)
    # Y axis
    glVertex2f(0.0, -20.0)
    glVertex2f(0.0, 20.0)
    glEnd()

# Функция для рисования графика
def draw_graph():
    glColor3f(1.0, 0.0, 0.0)
    glBegin(GL_LINE_STRIP)
    for x in np.linspace(-6 * np.pi, 6 * np.pi, 400):
        y = np.sin(3 * x) + np.cos(2 * x + 12 * np.pi)
        glVertex2f(x, y)
    glEnd()

# Функция отображения
def display():
    glClear(GL_COLOR_BUFFER_BIT)
    draw_axes()
    draw_graph()
    glFlush()

# Изменение размеров окна
def reshape(w, h):
    glViewport(0, 0, w, h)
    glMatrixMode(GL_PROJECTION)
    glLoadIdentity()
    if w <= h:
        gluOrtho2D(-20.0, 20.0, -20.0 * h / w, 20.0 * h / w)
    else:
        gluOrtho2D(-20.0 * w / h, 20.0 * w / h, -20.0, 20.0)
    glMatrixMode(GL_MODELVIEW)
    glLoadIdentity()

# Главная функция
def main():
    glutInit(sys.argv)
    glutInitDisplayMode(GLUT_RGB | GLUT_SINGLE)
    glutInitWindowSize(500, 500)
    glutInitWindowPosition(100, 100)
    glutCreateWindow("Harmonic Sum Graph")
    init()
    glutDisplayFunc(display)
    glutReshapeFunc(reshape)
    glutMainLoop()

if __name__ == "__main__":
    main()
