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
                    const headingsList = document.getElementById("headings");
                    const listItem = document.createElement("li");
                    listItem.textContent = "Could not inject script. The page may restrict access.";
                    headingsList.appendChild(listItem);
                    return;
                }

                // Send a message to the content script
                chrome.tabs.sendMessage(tabs[0].id, { action: "getHeadings" }, (response) => {
                    const headingsList = document.getElementById("headings");

                    if (chrome.runtime.lastError) {
                        console.error("Error communicating with content script:", chrome.runtime.lastError.message);
                        const listItem = document.createElement("li");
                        listItem.textContent = "Unable to extract headings. The page may restrict access.";
                        headingsList.appendChild(listItem);
                        return;
                    }

                    if (response && response.headings && response.headings.length > 0) {
                        response.headings.forEach((heading) => {
                            const listItem = document.createElement("li");
                            listItem.textContent = heading;
                            headingsList.appendChild(listItem);
                        });
                    } else {
                        const listItem = document.createElement("li");
                        listItem.textContent = "No headings found on this page.";
                        headingsList.appendChild(listItem);
                    }
                });
            }
        );
    });
});
