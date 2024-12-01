document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            },
            () => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "getDivContent" }, (response) => {
                    const divDisplay = document.getElementById("divContent");
                    if (chrome.runtime.lastError) {
                        console.error("Error communicating with content script:", chrome.runtime.lastError.message);
                        divDisplay.textContent = "Unable to extract content. The page may restrict access.";
                        return;
                    }
                    divDisplay.textContent = getFakeCoefficient().then(result => result.data);
                });
            }
        );
    });

    // Get the value from app.py - endpoint send-text
    const newsValue = document.getElementById("getData").addEventListener("click", () => {
        // Send GET request to Flask
        fetch('http://127.0.0.1:5000/send-text')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                console.log('Data received from Flask:', data);

                // Display data in the DOM
                document.getElementById('response').innerText = `
                    Message: ${data.message},
                    Status: ${data.status}
                `;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

    // Add event listener for "No" button
    const noButton = document.getElementById("noButton");
    noButton.addEventListener("click", () => {
        const messageContainer = document.getElementById("messageContainer");
        const sentimentContainer = document.getElementById("sentimentContainer");
        const sentimentText = document.getElementById("sentimentText");





        if (newsValue) {
            messageContainer.textContent = "Great! You are right!";
            messageContainer.style.color = "#28a745"; // Green for success
        } else {
            messageContainer.textContent = "Take under consideration that not everything you see is true.";
            messageContainer.style.color = "#dc3545"; // Red for warning
        }
        

        sentimentText.textContent = "Sentiment Analysis";
        sentimentContainer.style.display = "block";

        // Static sentiment data


        const sentimentData = {
            neutral: 60,
            negative: 40,
            positive: 70,
        };

        console.log("Sentiment Data:", sentimentData);

        // Update slider values dynamically
        document.getElementById("neutralValue").textContent = sentimentData.neutral;
        document.getElementById("neutralSlider").value = sentimentData.neutral;

        document.getElementById("negativeValue").textContent = sentimentData.negative;
        document.getElementById("negativeSlider").value = sentimentData.negative;

        document.getElementById("positiveValue").textContent = sentimentData.positive;
        document.getElementById("positiveSlider").value = sentimentData.positive;

        
        noButton.disabled = true;
        document.getElementById("yesButton").disabled = true;
    });

    // Add event listener for "Yes" button
    const yesButton = document.getElementById("yesButton");
    yesButton.addEventListener("click", () => {
        const messageContainer = document.getElementById("messageContainer");
        const sentimentContainer = document.getElementById("sentimentContainer");
        const sentimentText = document.getElementById("sentimentText");


        if (newsValue) {
            messageContainer.textContent = "Great! You are right!";
            messageContainer.style.color = "#28a745"; // Green for success
        } else {
            messageContainer.textContent = "Take under consideration that not everything you see is true.";
            messageContainer.style.color = "#dc3545"; // Red for warning
        }

        // Show sentiment analysis text and container
        sentimentText.textContent = "Sentiment Analysis";
        sentimentContainer.style.display = "block";

        // Static sentiment data
        const sentimentData = {
            neutral: 60,
            negative: 40,
            positive: 70,
        };

        console.log("Sentiment Data:", sentimentData);

        // Update slider values dynamically
        document.getElementById("neutralValue").textContent = sentimentData.neutral;
        document.getElementById("neutralSlider").value = sentimentData.neutral;

        document.getElementById("negativeValue").textContent = sentimentData.negative;
        document.getElementById("negativeSlider").value = sentimentData.negative;

        document.getElementById("positiveValue").textContent = sentimentData.positive;
        document.getElementById("positiveSlider").value = sentimentData.positive;

        yesButton.disabled = true;
        document.getElementById("noButton").disabled = true;
    });
});
