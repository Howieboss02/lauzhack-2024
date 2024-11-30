document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            },
            () => {
                if (chrome.runtime.lastError) {
                    console.error("Error injecting content script:", chrome.runtime.lastError.message);
                    const divDisplay = document.getElementById("divContent");
                    divDisplay.textContent = "Could not inject script. The page may restrict access.";
                    return;
                }

                // Send a message to the content script to extract the div content
                chrome.tabs.sendMessage(tabs[0].id, { action: "getDivContent" }, (response) => {
                    const divDisplay = document.getElementById("divContent");
                    if (chrome.runtime.lastError) {
                        console.error("Error communicating with content script:", chrome.runtime.lastError.message);
                        divDisplay.textContent = "Unable to extract content. The page may restrict access.";
                        return;
                    }

                    // Display the extracted content
                    divDisplay.textContent = response.text || "No content found for the specified element.";
                });
            }
        );
    });
});
