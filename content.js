chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getDivContent") {
        try {
            // Get the current hostname
            const hostName = window.location.hostname;
            console.log("Connected to host:", hostName);

            let divContent = ""; // Initialize the variable to store the content

            // Handle Twitter case
            if (hostName === "x.com") {
                //const div = document.querySelector('div.css-1dbjc4n[data-testid="tweet"]');
                const div = document.querySelector('div[data-testid^="tweet"]');
                divContent = div ? div.textContent.trim() : "No Twitter post found.";
            }
            // Handle NBC News case
            else if (hostName === "www.nbcnews.com") {
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                const articleContent = document.querySelector("div.article-body__content")?.textContent.trim() || "No article content found.";
                divContent = `${headingContent}\n\n${articleContent}`;
            } 
            else if (hostName === "edition.cnn.com") {
                console.log("Processing content for CNN.");

                // Extract the headline
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";

                // Extract the article body
                //const articleBodyElements = document.querySelectorAll(".article__content .Paragraph__component, .l-container .zn-body__paragraph, article .Article__content p");
                const articleBodyElements = document.querySelectorAll("div.article__content");
                let articleContent = "";

                articleBodyElements.forEach(paragraph => {
                    articleContent += paragraph.textContent.trim() + "\n\n";
                });

                articleContent = articleContent.trim() || "No article content found.";
                divContent = `${headingContent}\n\n${articleContent}`;
            }
            else if (hostName === "www.toronto99.com") {
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                const articleContent = document.querySelector("div.entry-content.article-content")?.textContent.trim() || "No article content found.";
                divContent = `${headingContent}\n\n${articleContent}`;
            }
            else {
                divContent = `Content extraction is not configured for the host: ${hostName}`;
            }

            // Send the content back to popup.js
            sendResponse({ text: divContent });
        } catch (error) {
            console.error("Error extracting div content:", error);
            sendResponse({ text: "Error extracting content." });
        }
    }
    return true; // Important for asynchronous responses
});
