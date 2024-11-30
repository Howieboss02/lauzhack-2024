chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getHeadings") {
        try {
            const headings = [];
            document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
                headings.push(`${heading.tagName}: ${heading.textContent.trim()}`);
            });

            // Log the found headings for debugging
            console.log("Extracted Headings:", headings);

            // Send the response back to popup.js
            sendResponse({ headings });
        } catch (error) {
            console.error("Error extracting headings:", error);
            sendResponse({ headings: [] });
        }
    }

    // Important: Return true to indicate asynchronous response
    return true;
});
