chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCurrentTabUrl") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        sendResponse({ url: currentTab.url });
      });
      return true;  // Keeps the messaging channel open for async response
    }
  });