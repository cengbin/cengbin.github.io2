(function () {
  var vsFile = './shader/gradient_vert.glsl'
  var fsFile = './shader/gradient_frag.glsl'

  loadShaders(vsFile, fsFile)
})();

function loadShaders (vsFile, fsFile) {
  var vs = null;
  var fs = null;

  var onShaderLoaded = function () {
    if (vs && fs) {
      initWebGL(vs, fs)
    }
  };

  loadShaderFromFile(vsFile, function (data) {
    vs = data
    onShaderLoaded()
  })
  loadShaderFromFile(fsFile, function (data) {
    fs = data
    onShaderLoaded()
  })
}

function initWebGL (VSHADER_SOURCE, FSHADER_SOURCE) {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  var canvas = document.getElementById('webgl');
  canvas.width = width;
  canvas.height = height;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = 0;

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }


  initVertexBuffers(gl);

  var t = 0.0;
  var time = gl.getUniformLocation(gl.program, 'time');
  if (time < 0) {
    console.log('Failed to get the storage location of time');
    return -1;
  }
  gl.uniform1f(time, t)

  render(gl, time, t)
}

const VERTICES_LENGTH = 4

function render (gl, time, t) {
  t += 0.01;
  gl.uniform1f(time, t);

  draw(gl, VERTICES_LENGTH);

  requestAnimationFrame(render.bind(this, gl, time, t))
}

function draw (gl, n) {
  // 指定清空<canvas>的颜色
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制矩形
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}

function initVertexBuffers (gl) {
  var verticesSizesColors = new Float32Array([
    -1, 1, -0.3, 1.7,
    -1, -1, -0.3, -0.2,
    1, 1, 1.7, 1.7,
    1, -1, 1.7, -0.2
  ]);

  // 将顶点坐标传入着色器步骤：
  // 1：创建缓冲区对象
  var vertexSizeBuffer = gl.createBuffer();
  if (!vertexSizeBuffer) {
    return -1;
  }

  // 2：将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);

  // 3：向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizesColors, gl.STATIC_DRAW);

  var FSIZE = verticesSizesColors.BYTES_PER_ELEMENT;

  // 获取a_Position变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    return -1
  }

  // 4：将缓冲区对象分配给 attribute(a_Position)变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);

  // 5：开启attibute变量
  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return verticesSizesColors
}