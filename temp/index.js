/** Testing snake app. */

class App {
  constructor() {
    // init
    this.cvs = document.querySelector('#canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
    this.mouse = {x: 0, y: 0, radius: 50};

    // create snake
    this.snake = [];
    this.snake.phase = 0;
    const len = 60;
    const radius = 2.5;
    const width = 8;
    for (var i=0; i<len; i++) {
      const t = i / len;
      const f = t <= 0.5 ? t * 2 : 1 - (t - 0.5) * 2;
      this.snake.push({x: 0, y: 0, radius: radius, width: width, t:t, factor:f, angle: 0});
    }

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

  update() {
    // increment snake
    this.snake.phase += 0.05;

    if (this.requiresUpdate) {
      // update first snake segment
      const d = this.distance(this.snake[0], this.mouse);
      const r = this.snake[0].radius + this.mouse.radius;
      if (d > r) {
        this.snake.phase += (d - r) * 0.03;
      }
      this.magnetise(this.snake[0], this.mouse);

      // update snake
      for (var i=1, lim=this.snake.length; i<lim; ++i) {
        this.magnetise(this.snake[i], this.snake[i-1]);
      }
    }
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
      this.ctx.beginPath();
      this.ctx.arc(x, y, rad * 0.8, 0, Math.PI * 2, false);
      this.ctx.fill();

      // add segment position
      segments.push([x + cosa * rad, y + sina * rad, x - cosa * rad, y - sina * rad]);
    }

    // fill between segments
    for (var i=1, lim=segments.length; i<lim; ++i) {
      const a = segments[i-1];
      const b = segments[i];
      this.ctx.beginPath();
      this.ctx.moveTo(a[0], a[1]);
      this.ctx.lineTo(a[2], a[3]);
      this.ctx.lineTo(b[2], b[3]);
      this.ctx.lineTo(b[0], b[1]);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    this.update();
    this.draw();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});
