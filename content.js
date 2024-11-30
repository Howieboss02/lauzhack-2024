chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getHeadings") {
        try {
            const heading = document.querySelector("h1");
            const headingContent = heading ? heading.textContent.trim() : "No heading content found.";
            const article = document.querySelector("div.article-body__content");
            const articleContent = article ? article.textContent.trim() : "No article content found.";

            // Log the extracted data for debugging
            console.log("Extracted Heading:", headingContent);
            console.log("Extracted Article Content:", articleContent);

            // Send the response back to popup.js
            sendResponse({ heading: headingContent, text: articleContent });
        } catch (error) {
            console.error("Error extracting content:", error);
            sendResponse({ error: "Failed to extract content. See console for details." });
        }
    }

    // Important: Return true to indicate asynchronous response
    return true;
});
