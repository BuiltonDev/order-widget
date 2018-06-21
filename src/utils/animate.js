import React from 'react';

class Animate {
  constructor() {
    this.index = 0;
    this.lastMove = new Date();
  }

  static moveItem(items, delay = 50) {
    const now = new Date();
    if (now - this.lastMove < delay || !items[this.index]) {
      return;
    }
    this.lastMove = now;
    items[this.index].classList.add('is-moved');
    this.index += 1;
  }

  static resetIndex() {
    this.index = 0;
  }
}

export default Animate;
