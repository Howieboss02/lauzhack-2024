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
                    const headingContent = document.getElementById("headingContent");
                    headingContent.textContent = "Could not inject script. The page may restrict access.";

                    const articleContent = document.getElementById("articleContent");
                    articleContent.textContent = "Could not inject script. The page may restrict access.";
                    return;
                }

                // Send a message to the content script
                chrome.tabs.sendMessage(tabs[0].id, { action: "getHeading and Article" }, (response) => {
                    const headingContent = document.getElementById("headingContent");
                    headingContent.textContent = "Could not inject script. The page may restrict access.";

                    const articleContent = document.getElementById("articleContent");
                    articleContent.textContent = "Could not inject script. The page may restrict access.";

                    if (chrome.runtime.lastError) {
                        console.error("Error communicating with content script:", chrome.runtime.lastError.message);
                        const headingContent = document.getElementById("headingContent");
                        headingContent.textContent = "Could not inject script. The page may restrict access.";

                        const articleContent = document.getElementById("articleContent");
                        articleContent.textContent = "Could not inject script. The page may restrict access.";
                        return;
                    }

                    if (response && response.headings && response.headings.length > 0) {
                        response.headings.forEach((heading) => {
                            const headingContent = document.getElementById("headingContent");
                            headingContent.textContent = "Could not inject script. The page may restrict access.";

                            const articleContent = document.getElementById("articleContent");
                            articleContent.textContent = "Could not inject script. The page may restrict access.";
                        });
                    } else {
                        const listItem = document.createElement("li");
                        listItem.textContent = "No Content found on this page.";
                        headingsList.appendChild(listItem);
                    }
                });
            }
        );
    });
});
