class Animate {
  constructor(delay) {
    this.index = 0;
    this.lastMove = new Date();
    this.delay = delay || 100;
    this.timeout = null;
  }

  animate(items) {
    if (this.index === items.length) {
      this.index = 0;
      cancelAnimationFrame(this.timeout);
    } else {
      this.timeout = requestAnimationFrame(() => {
        this.moveItem(items[this.index]);
        this.animate(items);
      });
    }
  }

  moveItem(item) {
    const now = new Date();
    if (now - this.lastMove < this.delay || !item) {
      return;
    }

    this.lastMove = now;
    item.classList.add('is-moved');
    this.index += 1;
  }
}

export default Animate;
