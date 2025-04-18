const sampleData = {
  companyName: "TechCorp",
  matchScore: 86,
  accountStatus: "Target",
};

function createWidget(data) {
  const widget = document.createElement("div");
  widget.id = "profile-enhancer-widget";
  widget.innerHTML = `
    <div class="header">
      <strong>${data.companyName}</strong>
      <button id="toggle-btn">✖</button>
    </div>
    <div class="progress-container">
      <label>Match Score: ${data.matchScore}</label>
      <div class="progress-bar">
        <div class="progress" style="width: ${data.matchScore}%;"></div>
      </div>
    </div>
    <div class="status ${data.accountStatus === 'Target' ? 'green' : 'red'}">
      ${data.accountStatus}
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById("toggle-btn").onclick = () => {
    widget.remove();
    chrome.storage.local.set({ widgetVisible: false });
  };
}

chrome.storage.local.get("widgetVisible", (result) => {
  if (result.widgetVisible === false) return;
  createWidget(sampleData);
  chrome.storage.local.set({ widgetVisible: true });
});
