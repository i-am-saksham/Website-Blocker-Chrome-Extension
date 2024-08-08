chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ blockedSites: [] });
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "addSite") {
      chrome.storage.sync.get("blockedSites", function (data) {
        const blockedSites = data.blockedSites || [];
        blockedSites.push(request.site);
        chrome.storage.sync.set({ blockedSites });
      });                      
    } else if (request.action === "removeSite") {
      chrome.storage.sync.get("blockedSites", function (data) {
        const blockedSites = data.blockedSites || [];
        const updatedSites = blockedSites.filter(site => site !== request.site);
        chrome.storage.sync.set({ blockedSites: updatedSites });
      });
    }
  });
  