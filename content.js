chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getDivContent") {
        try {
            // Select the div element with the class 'css-146c3p1' or other attributes
            const div = document.querySelector('div.css-146c3p1[data-testid="tweetText"]');
            const divContent = div ? div.textContent.trim() : "No twitter post found";

            // Send the content back to popup.js
            sendResponse({ text: divContent });
        } catch (error) {
            console.error("Error extracting div content:", error);
            sendResponse({ text: "Error extracting content." });
        }
    }
    return true; // Important for asynchronous responses
});
