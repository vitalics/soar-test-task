/**
 * Scroll down by simulating a swipe down gesture.
 *
 * @param scrollDuration a lower scroll duration add more fling speed.
 * @see {@link https://stackoverflow.com/a/72886341}
 */
export async function scrollDown(scrollDuration = 300) {
  const startPercentage = 90;
  const endPercentage = 10;
  const anchorPercentage = 50;

  const { width, height } = await driver.getWindowSize();
  const density = (await driver.getDisplayDensity()) / 100;
  const anchor = (width * anchorPercentage) / 100;
  const startPoint = (height * startPercentage) / 100;
  const endPoint = (height * endPercentage) / 100;

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: anchor, y: startPoint },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 100 },
        {
          type: "pointerMove",
          duration: scrollDuration,
          origin: "pointer",
          x: 0,
          y: -endPoint * density,
        },
        { type: "pointerUp", button: 0 },
        { type: "pause", duration: scrollDuration },
      ],
    },
  ]);
}
