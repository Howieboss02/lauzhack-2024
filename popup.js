document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            },
            () => {
                if (chrome.runtime.lastError) {
                    const currentHost = window.location.hostname;
                    console.log("Connected to host:", currentHost);
                    // if twitter.com use this code == twitter.com
                    
                    console.error("Error injecting content script:", chrome.runtime.lastError.message);
                    if (currentHost === "x.com") {
                        const divDisplay = document.getElementById("divContent");
                        divDisplay.textContent = "Could not inject script. The page may restrict access.";
                        return;
                    }
                    else if (currentHost === "www.nbcnews.com") {

                        // else if https://www.nbcnews.com/
                        const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                        const articleContent = document.querySelector("div.article-body__content")?.textContent.trim() || "No article content found.";
                        
                        // Combine both into a single string
                        divDisplay = `${headingContent}\n\n${articleContent}`;
                        divDisplay.textContent = divDisplay;
                        return;
                    }
                    else if (currentHost === "edition.cnn.com") {
                        console.log("Processing content for CNN.");

                        // Extract the headline
                        const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";

                        // Extract the article body
                        const articleBodyElements = document.querySelectorAll(".article__content .Paragraph__component, .l-container .zn-body__paragraph, article .Article__content p");

                        let articleContent = "";

                        articleBodyElements.forEach(paragraph => {
                            articleContent += paragraph.textContent.trim() + "\n\n";
                        });

                        articleContent = articleContent.trim() || "No article content found.";
                        divContent = `${headingContent}\n\n${articleContent}`;
                        divDisplay.textContent = divDisplay;
                        return;
                    }
                    else if (hostname === "www.toronto99.com") {
                        const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                        const articleContent = document.querySelector("div.entry-content.article-content")?.textContent.trim() || "No article content found.";
                        
                        // Combine both into a single string
                        divDisplay = `${headingContent}\n\n${articleContent}`;
                        divDisplay.textContent = divDisplay;
                        return;
                    }
                    else {
                        const divDisplay = document.getElementById("divContent");
                        divDisplay.textContent = "Content extraction is not configured for the host: " + currentHost;
                        return;
                    }
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
