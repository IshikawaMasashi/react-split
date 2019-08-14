const layoutThrottleDuration = 10;
let layoutTimeout = 0;

export default function layout() {
  if (layoutTimeout) {
    window.clearTimeout(layoutTimeout);
  }
  window.setTimeout(() => {
    layoutTimeout = 0;
    document.dispatchEvent(new Event('layout'));
  }, layoutThrottleDuration);
}
