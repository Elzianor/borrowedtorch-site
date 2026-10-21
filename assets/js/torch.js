// Torch flicker: layered sines + occasional dips, so it never looks like a loop
(function () {
  const glow = document.querySelector('.flame-glow');
  if (!glow || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const waves = [[1.7, .35], [3.1, .25], [5.3, .15], [9.7, .08]].map(([hz, amp]) => [hz, amp, Math.random() * 6.28]);
  let dip = 0, value = .6;
  function frame(t) {
    t /= 1000;
    let n = 0;
    for (const [hz, amp, ph] of waves) n += Math.sin(t * hz + ph) * amp;
    if (Math.random() < .004) dip = .35 + Math.random() * .25;   // brief gust
    dip *= .9;
    const target = Math.min(1, Math.max(0, .62 + n * .55 - dip));
    value += (target - value) * .25;                             // smooth it
    glow.style.setProperty('--f', value.toFixed(3));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// Living flame: distorts the flame with scrolling noise; strength grows toward the tips
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const torch = document.querySelector('.torch');
  if (!torch) return;
  const canvas = torch.querySelector('.flame-canvas');
  const logo = torch.querySelector('.logo');
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return;

  const vs = `attribute vec2 p; varying vec2 uv;
    void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`;
  const fs = `precision mediump float;
    uniform sampler2D tex; uniform float t; varying vec2 uv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y); }
    float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= .5; } return v; }
    void main(){
      float k = pow(clamp(1. - uv.y, 0., 1.), 1.6);          // 0 at the cup, 1 at the tips
      vec2 q = vec2(uv.x * 3.2, uv.y * 3.6 + t * 1.15);        // noise scrolls upward
      float dx = fbm(q) - .5;
      float dy = fbm(q + vec2(5.2, 1.3)) - .5;
      vec2 off = vec2(dx * .075, dy * .05 - .012 * (sin(t * 2.3) * .5 + .5)) * k;
      vec4 c = texture2D(tex, uv + off);
      float flick = .94 + .1 * fbm(vec2(t * 1.7, 3.1));          // gentle brightness pulse
      gl_FragColor = vec4(c.rgb * flick, c.a);
    }`;
  function sh(type, src){ const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s); return s; }
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  } catch (e) { return; }
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uT = gl.getUniformLocation(prog, 't');

  const img = new Image();
  img.onload = () => {
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (gl.getError() !== gl.NO_ERROR) return;               // e.g. opened from file://
    const body = new Image();
    body.onload = () => {
      logo.parentElement.querySelectorAll('source').forEach(s => s.remove());
      logo.src = body.src;                                     // logo without the static flame
      torch.classList.add('live');
      requestAnimationFrame(draw);
    };
    body.src = '/logo-body.png';
  };
  img.src = '/logo-flame.png';

  const t0 = performance.now() + Math.random() * 1e5;
  function draw(now){
    const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (canvas.width !== w || canvas.height !== h){ canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uT, (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(draw);
  }
})();
