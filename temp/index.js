/** Testing snake app. */

class App {
  constructor() {
    // init
    this.cvs = document.querySelector('#canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
    this.mouse = {x: 0, y: 0, tween: {x: 0, y: 0, radius: 70}};
    this.time = {
      now: (new Date()).getTime(),
      delta: 0,
    };

    // create snake
    this.snake = [];
    this.snake.phase = 0;
    this.snake.tongue = {
      active: false,
      age: 0,
    };
    const len = 60;
    const radius = 2.5;
    const width = 8;
    for (var i=0; i<len; i++) {
      const t = i / len;
      const f = t <= 0.5 ? t * 2 : 1 - (t - 0.5) * 2;
      this.snake.push({x: 0, y: 0, radius: radius, width: width, t:t, factor:f, angle: 0});
    }
    this.snake.head = {
      p1: {x: -1, y: -width},
      cp1: {x: width * 0.75, y: -width * 2},
      cp2: {x: width * 4, y: -width},
      p2: {x: width * 4, y: 0},
      cp3: {x: width * 4, y: width},
      cp4: {x: width * 0.75, y: width * 2},
      p3: {x: -1, y: width},
      // tongue
      p4: {x: width * 5, y: 0},
      p5: {x: width * 5.5, y: -width/3},
      p6: {x: width * 5.5, y: width/3}
    };

    // bind events
    window.addEventListener('mousemove', e => { this.onMouseMove(e); });

    // run
    this.loop();
  }

  onMouseMove(evt) {
    this.mouse.x = evt.clientX;
    this.mouse.y = evt.clientY;
    this.requiresUpdate = true;
  }

  magnetise(from, to) {
    // magnetise
    const rad = to.radius + from.radius;
    if (this.distance(from, to) > rad) {
      const theta = Math.atan2(from.y - to.y, from.x - to.x);
      from.x = to.x + Math.cos(theta) * rad;
      from.y = to.y + Math.sin(theta) * rad;
      from.angle = theta + Math.PI / 2;
    }
  }

  distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  update(delta) {
    // update mouse
    this.mouse.tween.x += (this.mouse.x - this.mouse.tween.x) * 0.15;
    this.mouse.tween.y += (this.mouse.y - this.mouse.tween.y) * 0.15;

    // increment snake
    this.snake.phase += 0.05;

    // flicker tongue
    this.snake.tongue.age += delta / 2 + delta / 2 * Math.random();
    const t = this.snake.tongue.age % 1;
    this.snake.tongue.active = (t < 0.15 || (t > 0.25 && t < 0.4));

    if (this.requiresUpdate) {
      // update first snake segment
      const d = this.distance(this.snake[0], this.mouse.tween);
      const r = this.snake[0].radius + this.mouse.tween.radius;
      if (d > r) {
        this.snake.phase += (d - r) * 0.03;
      }
      this.magnetise(this.snake[0], this.mouse.tween);

      // update snake
      for (var i=1, lim=this.snake.length; i<lim; ++i) {
        this.magnetise(this.snake[i], this.snake[i-1]);
      }
    }
  }

  transform(p) {
    // translate/ rotate p to snake's direction
    const res = {x: p.x, y: p.y};
    const theta = Math.atan2(p.y, p.x);
    const mag = Math.sqrt(p.x * p.x + p.y * p.y);
    res.x = this.snake[0].x + Math.cos(theta + this.snake[0].angle + Math.PI / 2) * mag;
    res.y = this.snake[0].y + Math.sin(theta + this.snake[0].angle + Math.PI / 2) * mag;
    return res;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();

    // calculate snake segment position and draw
    const segments = [];
    for (var i=0, lim=this.snake.length; i<lim; ++i) {
      const e = this.snake[i];
      const dist = Math.sin(e.t * Math.PI * 4 - this.snake.phase) * 50;
      const cosa = Math.cos(e.angle);
      const sina = Math.sin(e.angle);
      const x = e.x + e.factor * cosa * dist;
      const y = e.y + e.factor * sina * dist;
      const rad = e.width * (1 - e.t);

      // add segment position
      segments.push([x + cosa * rad, y + sina * rad, x - cosa * rad, y - sina * rad]);
    }

    // fill between segments
    this.ctx.fillStyle = '#f00';
    this.ctx.strokeStyle = '#f00';
    this.ctx.beginPath();
    this.ctx.moveTo(segments[0][0], segments[0][1]);
    for (var i=1, lim=segments.length; i<lim; ++i) {
      this.ctx.lineTo(segments[i][0], segments[i][1]);
    }
    for (var i=segments.length-2, lim=-1; i>lim; --i) {
      this.ctx.lineTo(segments[i][2], segments[i][3]);
    }
    this.ctx.fill();

    // draw snake head
    const p1 = this.transform(this.snake.head.p1);
    const cp1 = this.transform(this.snake.head.cp1);
    const cp2 = this.transform(this.snake.head.cp2);
    const p2 = this.transform(this.snake.head.p2);
    const cp3 = this.transform(this.snake.head.cp3);
    const cp4 = this.transform(this.snake.head.cp4);
    const p3 = this.transform(this.snake.head.p3);
    const p4 = this.transform(this.snake.head.p4);
    const p5 = this.transform(this.snake.head.p5);
    const p6 = this.transform(this.snake.head.p6);
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
    this.ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, p3.x, p3.y);
    this.ctx.fill();

    // draw tongue
    if (this.snake.tongue.active) {
      this.ctx.beginPath();
      this.ctx.moveTo(p2.x, p2.y);
      this.ctx.lineTo(p4.x, p4.y);
      this.ctx.lineTo(p5.x, p5.y);
      this.ctx.moveTo(p4.x, p4.y);
      this.ctx.lineTo(p6.x, p6.y);
      this.ctx.stroke();
    }
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    const now = (new Date()).getTime();
    this.time.delta = (now - this.time.now) / 1000.0;
    this.time.now = now;
    this.update(this.time.delta);
    this.draw();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});
