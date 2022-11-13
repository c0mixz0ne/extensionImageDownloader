chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  downloadAction(data);
  sendResponse({ data: "Отправлено в popup.js" });
});

function downloadAction(data) {
  console.log(data);
  data.forEach((i) => {
    fetch(data[i])
      .then((response) => response.blob())
      .then((blob) => {
        link.href = URL.createObjectURL(blob);
        link.download = new Date().getTime();
        link.click();
      });
  });
}

document.querySelector(".downloadBtn").addEventListener("click", (event) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { data: "all" }, function (response) {
      console.log(response);
    });
  });
});
