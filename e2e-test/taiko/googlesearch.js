const { openBrowser, goto, write, click, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("google.com");
        await write("taiko test automation");
        await click("Google 検索");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
