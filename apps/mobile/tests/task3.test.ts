describe("task3", () => {
  it("disable all settings", async () => {
    // accept
    await $('//android.widget.Button[@resource-id="android:id/button1"]').tap();

    await $('//android.widget.TextView[@content-desc="More options"]').click();

    await $(
      '//android.widget.TextView[@resource-id="org.wikipedia.alpha:id/explore_overflow_settings"]',
    ).click();

    const allSwitches$ = $$(
      '(//android.widget.Switch[@resource-id="org.wikipedia.alpha:id/switchWidget"])',
    );

    await allSwitches$.forEach(async (el$) => {
      await el$.click();
    });
    await driver.takeScreenshot();

    await $("~Navigate up").click();
  });
});
