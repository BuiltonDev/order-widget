export const steps = {
  next: 'next',
  previous: 'previous',
  error: 'error'
};

function getViews() {
  const mainElement = document.getElementById('kvass-widget-container');
  return mainElement.querySelectorAll('#kvass-widget-container>div');
}

export function navigate(step = null) {
  let currentIndex = 0;
  getViews().forEach((view, index) => {
    if (view.className.indexOf('active-view') >= 0) {
      if (step === steps.previous && index === 0) return;
      if (step === steps.next && index === getViews().length - 1) return;
      if (typeof step === 'number' && step - 1 < 0 && step - 1 >= getViews().length) return;
      view.classList.remove('active-view');
      currentIndex = index;
    }
  });

  switch (step) {
    case steps.next:
      if (getViews().length <= currentIndex + 1) return;
      getViews()[currentIndex + 1].classList.add('active-view');
      break;
    case steps.previous:
      if (currentIndex - 1 < 0) return;
      getViews()[currentIndex - 1].classList.add('active-view');
      break;
    case steps.error:
      getViews()[getViews().length - 1].classList.add('active-view');
      break;
    default:
      if (step < 0 || step >= getViews().length) return;
      getViews()[step].classList.add('active-view');
  }
}

export function initNavigation(initStep = 0) {
  navigate(initStep);
}
