precision mediump float;
varying vec2 uv;
uniform float time; //变化时间

void main() {
    float r = uv.x;
    float g = uv.y;
    float b = abs(sin(time));
    gl_FragColor = vec4(r, g, b, 1.0);
}