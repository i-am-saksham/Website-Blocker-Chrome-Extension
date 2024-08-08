// Get blocked sites from storage
chrome.storage.sync.get("blockedSites", function (data) {
    const blockedSites = data.blockedSites || [];
    const currentURL = window.location.href;
  
    if (blockedSites.some(site => currentURL.includes(site))) {
      // Redirect or take action to block the site
      window.location.href = "your_blocking_page.html";
    }
});
  