chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  downloadImage(data);
  sendResponse({ data: "Отправлено в main.js" });
});

function downloadImage(data) {
  if (data) {
    let imageData = {};
    let imageCollection = document.querySelectorAll("img");
    console.log(imageCollection);
    let link = document.createElement("a");
    for (i = 0; i < imageCollection.length; i++) {
      fetch(imageCollection[i].src)
        .then((response) => response.blob())
        .then((blob) => {
          link.href = URL.createObjectURL(blob);
          link.download = new Date().getTime();
          link.click();
        });
    }
    // imageCollection.forEach(function (image, i) {
    //   imageData[i] = image.currentSrc;
    // });
    // console.log(imageData);
    // chrome.runtime.sendMessage({imageData}, function (response) {
    //   console.log(response);
    // });
  }
}
console.log("extension Run");
