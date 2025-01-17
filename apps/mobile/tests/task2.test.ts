describe.only("task2", () => {
  it("search should find result", async () => {
    // accept
    await $('//android.widget.Button[@resource-id="android:id/button1"]').tap();

    // TODO: fix the test

    // click to search
    await driver
      .action("pointer")
      .move({ duration: 200, x: 200, y: 320 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    // todo: fix the issue with find element
    // const search$ = $(
    //   '//android.widget.AutoCompleteTextView[@resource-id="org.wikipedia.alpha:id/search_src_text"]',
    // );
    const search$ = $(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")',
    );

    await search$.waitForExist();
    await search$.sendKeys("New York".split(""));

    await expect(await search$.getText()).toBe("New York");

    const searchContainer$ = $(
      '//android.widget.ListView[@resource-id="org.wikipedia.alpha:id/search_results_list"]',
    );
    await searchContainer$.waitForExist();

    const searchResults$ = $$(
      '//android.widget.LinearLayout[@resource-id="org.wikipedia.alpha:id/page_list_item_container"]',
    );

    const length = await searchResults$.length;
    expect(length).toBe(6);

    await $("~Clear query").doubleClick();

    await $("~Explore").click();
  });
});
