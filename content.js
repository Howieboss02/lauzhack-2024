chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getDivContent") {
        try {
            // Get the current hostname
            const hostName = window.location.hostname;
            console.log("Connected to host:", hostName);

            let divContent = ""; // Initialize the variable to store the content

            // Handle Twitter case
            if (hostName === "x.com") {
                const div = document.querySelector('div[data-testid^="tweet"]');
                divContent = div ? `${div.textContent.trim()} \n\nFake news?` : "No Twitter post found.";
            }
            // Handle NBC News case
            else if (hostName === "www.nbcnews.com") {
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                divContent = `Title: ${headingContent}`;
            } 
            else if (hostName === "edition.cnn.com") {
                console.log("Processing content for CNN.");

                // Extract the headline
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";

                divContent = `Title: ${headingContent}`;
            }
            else if (hostName === "www.toronto99.com") {
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                divContent = `Title: ${headingContent}`;
            }
            else {
                divContent = `Content extraction is not configured for the host: ${hostName}`;
            }

            // Send the content back to popup.js
            sendResponse({ success: true, content: divContent });


        } catch (error) {
            console.error("Error extracting content:", error);
            sendResponse({ success: false, content: "An error occurred while extracting content." });
        }
    }
    return true; // Important for asynchronous responses
});
