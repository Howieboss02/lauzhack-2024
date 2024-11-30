chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SCRAPED_DATA") {
      console.log("Data received from content script:", message.data);
      // Optionally, save data or send it to a server
    }
  });