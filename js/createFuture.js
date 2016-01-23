'use strict';
import times from 'lodash.times';
import random from 'lodash.random';
import debounce from 'lodash.debounce';

class Future {
  constructor(canvas, target) {
    this.canvas = canvas;
    this.target = target;
    this.stage = new createjs.Stage(this.canvas);
    this.circles = [];
    this.start = false;
    this.timerId = null;
    this.clientX = 0;
    this.clientY = 0;
    this.interval = 2400;
    createjs.Ticker.framerate = 60;

    this.setSize();

    this.bindEvents();
  }
  bindEvents() {
    createjs.Ticker.addEventListener('tick', this.stage);
    window.addEventListener('resize', this.setSize);
    this.target.addEventListener('mouseenter', this.onMouseEnter);
    this.target.addEventListener('mouseleave', this.onMouseLeave);
    this.target.addEventListener('mousemove', this.onMouseMove);
  }
  setSize = debounce(() => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.circles.forEach(circle =>
      circle.y = this.height - circle.graphics.command.radius
    );
  }, 100);
  onMouseEnter = () => {
    if (!this.timerId) {
      setTimeout(() => {
        if (!this.start || this.timerId) { return; }
        this.createFuture();
        this.timerId = setInterval(
          this.createFuture,
          this.interval * 0.8
        );
      }, 600);

      this.start = true;
    }
  };
  onMouseLeave = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.start = false;
  };
  onMouseMove = evt => {
    this.clientX = evt.clientX;
    this.clientY = evt.clientY;
  };
  createFuture = () => {
    times(random(3, 8), this.createCircle);
  };
  createCircle = () => {
    const circle = new createjs.Shape();
    const r = () => random(0, 255);
    const color = `rgba(${r()}, ${r()}, ${r()}, ${random(0.2, 0.8, true)})`;
    const radius = random(10, 50);
    const tl = new createjs.Timeline();

    circle.graphics.beginFill(color).drawCircle(0, 0, radius);
    circle.x = this.clientX;
    circle.y = this.clientY;
    circle.scaleX = 0;
    circle.scaleY = 0;
    this.circles.push(circle);
    this.stage.addChild(circle);

    tl.addTween(
      createjs.Tween.get(circle)
        .set({ scaleX: 0, scaleY: 0 })
        .to(
          { scaleX: 1, scaleY: 1 },
          this.interval / 3,
          createjs.Ease.circOut
        ),

      createjs.Tween.get(circle)
        .to(
          { x: random(-radius + 2, this.width + radius - 2) },
          this.interval, createjs.Ease.getPowOut(1)
        ),

      createjs.Tween.get(circle)
        .to(
          { y: this.height - radius },
          this.interval,
          createjs.Ease.getBackIn(random(1, 4, true))
        ),

      createjs.Tween.get(circle)
        .wait(this.interval + 5000)
        .to({ alpha: 0 }, 10000)
        .call(() => {
          this.circles = this.circles.filter(addedCircle =>
            addedCircle !== circle
          );
          this.stage.removeChild(circle);
        })
    );

    tl.gotoAndPlay();
  };
}

export default function () {
  new Future(
    document.querySelector('.future'),
    document.querySelector('.target')
  );
}
