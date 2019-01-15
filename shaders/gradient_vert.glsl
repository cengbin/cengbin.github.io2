attribute vec4 a_Position;
varying vec2 uv;

void main() {
  gl_Position = a_Position;
  uv = vec2(0.5,0.5) * (vec2(a_Position) + vec2(1.0,1.0));
}