import { setTimeout } from "timers/promises";
import { scrollDown } from "../utils/scroll";

describe("task1", () => {
  it("footer bar should interactible", async () => {
    await $('//android.widget.Button[@resource-id="android:id/button1"]').tap();

    // scroll into bottom
    await scrollDown();

    await $("~My lists").tap();
    await setTimeout(3_000);
    await $("~History").tap();
    await setTimeout(3_000);
    await $("~Nearby").tap();
    await setTimeout(3_000);
    // get back
    await $("~Explore").tap();
    await setTimeout(3_000);

    await driver.scroll(0, 0);
  });
});
