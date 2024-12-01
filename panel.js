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
                        console.log(articleContent);
                    } else {
                        divDisplay.textContent = response ? response.content : "Failed to retrieve content.";
                    }
                });
            }
        );
    });

    let fakeCoeff = false;
    let hate_speech_aggressive = null;
    let hate_speech_hateful = null;
    let hate_speech_targeted = null;


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
                // data should be a json object which has fake_coefficient as one of the fiels
                fakeCoeff = data['fake_coefficient'];
                console.log(fakeCoeff);
            })
            .catch(error => console.error('Error:', error));

        console.log("Div content extraction request sent.");
    }, 1000); // 

    setTimeout(() => {
        const hateValue = fetch('http://127.0.0.1:5000/sent_hate_speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: articleContent }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from Flask:', data);
                hate_speech_hateful = data["hateful"]
                hate_speech_aggressive = data["aggressive"]
                hate_speech_targeted = data["targeted"]
            })
            .catch(error => console.error('Error:', error));

        console.log("Div content extraction request sent.");
    }, 1000); //


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




        if (fakeCoeff == 1) {
            messageContainer.textContent = "Great! You are right!";
            messageContainer.style.color = "#28a745"; // Green for success
        } else {
            messageContainer.textContent = "Take into consideration that not everything you see is true.";
            messageContainer.style.color = "#dc3545"; // Red for warning
        }
        

        sentimentText.textContent = "Hate Speech Analysis";
        sentimentContainer.style.display = "block";

        // Static sentiment data


        const sentimentData = {
            aggressive: hate_speech_aggressive * 100,
            hateful: hate_speech_hateful * 100,
            targeted: hate_speech_targeted * 100
        };

        console.log("Sentiment Data:", sentimentData);

        // Update slider values dynamically
        document.getElementById("aggressiveValue").textContent = sentimentData.aggressive;
        document.getElementById("aggressiveSlider").value = sentimentData.aggressive;

        document.getElementById("hatefulValue").textContent = sentimentData.hateful;
        document.getElementById("hatefulSlider").value = sentimentData.hateful;

        document.getElementById("targetedValue").textContent = sentimentData.targeted;
        document.getElementById("targetedSlider").value = sentimentData.targeted;

        

        // Emotions data

        emotionsText.textContent = "Emotions Analysis";
        emotionsContainer.style.display = "block";

        // Static sentiment data


        const emotionsData = {
            anger: 0.798, surprise: 0.055, fear: 0.040, disgust: 0.036, joy: 0.028, others: 0.023, sadness: 0.019
        };

        console.log("Sentiment Data:", emotionsData);

        // Update slider values dynamically
        document.getElementById("angerValue").textContent = emotionsData.anger;
        document.getElementById("angerSlider").value = emotionsData.anger;

        document.getElementById("surpriseValue").textContent = emotionsData.surprise;
        document.getElementById("surpriseSlider").value = emotionsData.surprise;

        document.getElementById("fearValue").textContent = emotionsData.fear;
        document.getElementById("fearSlider").value = emotionsData.fear;

        document.getElementById("disgustValue").textContent = emotionsData.disgust;
        document.getElementById("disgustSlider").value = emotionsData.disgust;
        
        document.getElementById("joyValue").textContent = emotionsData.joy;
        document.getElementById("joySlider").value = emotionsData.joy;
        
        document.getElementById("othersValue").textContent = emotionsData.others;
        document.getElementById("othersSlider").value = emotionsData.others;
        
        document.getElementById("sadnessValue").textContent = emotionsData.sadness;
        document.getElementById("sadnessSlider").value = emotionsData.sadness;

        noButton.disabled = true;
        document.getElementById("yesButton").disabled = true;

        function updateSliderValues() {
            // Get the current value of each slider
            const aggressiveValue = document.getElementById("aggressiveSlider").value;
            const hatefulValue = document.getElementById("hatefulSlider").value;
            const targetedValue = document.getElementById("targetedSlider").value;

            // Update the text content of the span elements to show the slider values
            document.getElementById("aggressiveValue").textContent = aggressiveValue + '%';
            document.getElementById("hatefulValue").textContent = hatefulValue + '%';
            document.getElementById("targetedValue").textContent = targetedValue + '%';

            // Optionally, log the updated values to the console
            console.log("Updated Aggressive Value: " + aggressiveValue + '%');
            console.log("Updated Hateful Value: " + hatefulValue + '%');
            console.log("Updated Targeted Value: " + targetedValue + '%');
        }

// Call the function initially to set the values when the page loads
        updateSliderValues();
// Add event listeners to update the values when the user moves the sliders
        document.getElementById("aggressiveSlider").addEventListener("input", updateSliderValues);
        document.getElementById("hatefulSlider").addEventListener("input", updateSliderValues);
        document.getElementById("targetedSlider").addEventListener("input", updateSliderValues)

    });

    // Add event listener for "Yes" button
    const yesButton = document.getElementById("yesButton");
    yesButton.addEventListener("click", () => {
        const messageContainer = document.getElementById("messageContainer");
        const sentimentContainer = document.getElementById("sentimentContainer");
        const sentimentText = document.getElementById("sentimentText");


        if (fakeCoeff == 0) {
            messageContainer.textContent = "Great! You are right!";
            messageContainer.style.color = "#28a745"; // Green for success
        } else {
            messageContainer.textContent = "Take into consideration that not everything you see is true.";
            messageContainer.style.color = "#dc3545"; // Red for warning
        }

        sentimentText.textContent = "Hate Speech Analysis";
        sentimentContainer.style.display = "block";

        // Static sentiment data


        const sentimentData = {
            aggressive: hate_speech_aggressive * 100,
            hateful: hate_speech_hateful * 100,
            targeted: hate_speech_targeted * 100
        };

        console.log("Sentiment Data:", sentimentData);

        // Update slider values dynamically
        document.getElementById("aggressiveValue").textContent = sentimentData.aggressive;
        document.getElementById("aggressiveSlider").value = sentimentData.aggressive;

        document.getElementById("hatefulValue").textContent = sentimentData.hateful;
        document.getElementById("hatefulSlider").value = sentimentData.hateful;

        document.getElementById("targetedValue").textContent = sentimentData.targeted;
        document.getElementById("targetedSlider").value = sentimentData.targeted;


        // Emotions data

        emotionsText.textContent = "Emotions Analysis";
        emotionsContainer.style.display = "block";

        // Static sentiment data


        const emotionsData = {
            anger: 0.798, surprise: 0.055, fear: 0.040, disgust: 0.036, joy: 0.028, others: 0.023, sadness: 0.019
        };

        console.log("Sentiment Data:", emotionsData);

        // Update slider values dynamically
        document.getElementById("angerValue").textContent = emotionsData.anger;
        document.getElementById("angerSlider").value = emotionsData.anger;

        document.getElementById("surpriseValue").textContent = emotionsData.surprise;
        document.getElementById("surpriseSlider").value = emotionsData.surprise;

        document.getElementById("fearValue").textContent = emotionsData.fear;
        document.getElementById("fearSlider").value = emotionsData.fear;

        document.getElementById("disgustValue").textContent = emotionsData.disgust;
        document.getElementById("disgustSlider").value = emotionsData.disgust;
        
        document.getElementById("joyValue").textContent = emotionsData.joy;
        document.getElementById("joySlider").value = emotionsData.joy;
        
        document.getElementById("othersValue").textContent = emotionsData.others;
        document.getElementById("othersSlider").value = emotionsData.others;
        
        document.getElementById("sadnessValue").textContent = emotionsData.sadness;
        document.getElementById("sadnessSlider").value = emotionsData.sadness;



        yesButton.disabled = true;
        document.getElementById("noButton").disabled = true;

        function updateSliderValues1() {
            // Get the current value of each slider
            const aggressiveValue = document.getElementById("aggressiveSlider").value;
            const hatefulValue = document.getElementById("hatefulSlider").value;
            const targetedValue = document.getElementById("targetedSlider").value;

            // Update the text content of the span elements to show the slider values
            document.getElementById("aggressiveValue").textContent = aggressiveValue;
            document.getElementById("hatefulValue").textContent = hatefulValue;
            document.getElementById("targetedValue").textContent = targetedValue;

            // Optionally, log the updated values to the console
            console.log("Updated Aggressive Value: " + aggressiveValue);
            console.log("Updated Hateful Value: " + hatefulValue);
            console.log("Updated Targeted Value: " + targetedValue);
        }

// Call the function initially to set the values when the page loads
        updateSliderValues1();

// Add event listeners to update the values when the user moves the sliders
        document.getElementById("aggressiveSlider").addEventListener("input", updateSliderValues);
        document.getElementById("hatefulSlider").addEventListener("input", updateSliderValues);
        document.getElementById("targetedSlider").addEventListener("input", updateSliderValues)
    });


});
