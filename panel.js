document.addEventListener("DOMContentLoaded", () => {
    let articleContent = "";
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
                    if (response && response.success) {
                        divDisplay.textContent = response.content;
                        articleContent = response.content;
                        console.log("jazda mamy to \n " + articleContent);
                    } else {
                        divDisplay.textContent = response ? response.content : "Failed to retrieve content.";
                    }
                });
            }
        );
    });

    let fakeCoeff = false;

/*
    setTimeout(() => {
        const fakeValue = fetch('http://127.0.0.1:5000/send_text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: articleContent }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from Flask:', data);
            })
            .catch(error => console.error('Error:', error));

        console.log("Div content extraction request sent.");
    }, 3000); // 3000 milliseconds = 3 seconds
*/

    setTimeout(async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/send_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: articleContent }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Await JSON parsing
            console.log('JSON data received:', data);
            // Use the `data` object here
        } catch (error) {
            console.error('Error:', error);
        }
    }, 3000);

    //
    // const sentimentValue = fetch('http://127.0.0.1:5000/sent_sentiment', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ text: divContent}),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Response from Flask:', data);
    //     })
    //     .catch(error => console.error('Error:', error));
    //
    // console.log("Div content extracted:", sentimentValue);
    //
    // const emotionValue = fetch('http://127.0.0.1:5000/sent_emotion', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ text: divContent}),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Response from Flask:', data);
    //     })
    //     .catch(error => console.error('Error:', error));
    //
    // console.log("Div content extracted:", emotionValue);
    //
    // const hateSpeechValue = fetch('http://127.0.0.1:5000/sent_hate_speech', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ text: divContent}),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Response from Flask:', data);
    //     })
    //     .catch(error => console.error('Error:', error));
    //
    // console.log("Div content extracted:", hateSpeechValue);
    //
    // const ironyValue = fetch('http://127.0.0.1:5000/sent_irony', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ text: divContent}),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Response from Flask:', data);
    //     })
    //     .catch(error => console.error('Error:', error));
    //
    // console.log("Div content extracted:", ironyValue);



    // Add event listener for "No" button
    const noButton = document.getElementById("noButton");
    noButton.addEventListener("click", () => {
        const messageContainer = document.getElementById("messageContainer");
        const sentimentContainer = document.getElementById("sentimentContainer");
        const sentimentText = document.getElementById("sentimentText");




        let newsValue = true;
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
