// Content script to scrape all <h1> tags
console.log("Content script is running...");

// Get all <h1> elements on the page
const headers = document.querySelectorAll("h1");

// Extract the text content of each <h1>
const headerTexts = Array.from(headers).map(header => header.textContent);

// Log the extracted text
console.log("Scraped H1 Elements:", headerTexts);

// Send the data back to the background script or do further processing
chrome.runtime.sendMessage({ type: "SCRAPED_DATA", data: headerTexts });
