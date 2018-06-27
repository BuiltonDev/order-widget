class Animate {
  constructor(delay) {
    this.index = 0;
    this.lastMove = new Date();
    this.delay = delay || 100;
    this.timeout = null;
  }

  animateInViewTransition() {
    const items = document.getElementsByClassName('in-page-transition');
    const itemsArray = [].slice.call(items);
    if (this.index === itemsArray.length) {
      this.index = 0;
      cancelAnimationFrame(this.timeout);
    } else {
      this.timeout = requestAnimationFrame(() => {
        this.moveItem(itemsArray[this.index]);
        this.animateInViewTransition(itemsArray);
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
