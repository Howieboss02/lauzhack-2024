document.getElementById("scrape").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "startScraping" });
});

console.log("Element in setState:", element);
if (!element) {
  console.error("Element not found!");
  return;
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.data) {
    const results = document.getElementById("results");
    message.data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      results.appendChild(li);
    });
  }
});