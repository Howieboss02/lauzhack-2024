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
                divContent = `Title: ${headingContent} \n\nFake news?`;
            } 
            else if (hostName === "edition.cnn.com") {
                console.log("Processing content for CNN.");

                // Extract the headline
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";

                divContent = `Title: ${headingContent} \n\nFake news?`;
            }
            else if (hostName === "www.toronto99.com") {
                const headingContent = document.querySelector("h1")?.textContent.trim() || "No heading content found.";
                divContent = `Title: ${headingContent} \n\nFake news?`;
            }
            else {
                divContent = `Content extraction is not configured for the host: ${hostName}`;
            }

            // Send the content back to popup.js
            sendResponse({ text: divContent });
            // Send divContent to app.py
            const content = fetch('http://127.0.0.1:5000/send-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: divContent}),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from Flask:', data);
                })
                .catch(error => console.error('Error:', error));

            console.log("Div content extracted:", content);

        } catch (error) {
            console.error("Error extracting div content:", error);
            sendResponse({ text: "Error extracting content." });
        }
    }
    return true; // Important for asynchronous responses
});
