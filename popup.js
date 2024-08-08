document.addEventListener("DOMContentLoaded", function () {
    const addSiteBtn = document.getElementById("addSiteBtn");
    const siteInput = document.getElementById("siteInput");
    const blockedSitesList = document.getElementById("blockedSitesList");

    const removeSiteBtn = document.getElementById("removeSiteBtn");
  
    // Fetch blocked sites and display in the popup
    chrome.storage.sync.get("blockedSites", function (data) {
      const blockedSites = data.blockedSites || [];
      blockedSites.forEach(site => {
        const li = document.createElement("li");
        li.textContent = site;
        blockedSitesList.appendChild(li);
      });
    });
  
    // Add event listener for adding a site
    addSiteBtn.addEventListener("click", function () {
      const site = siteInput.value.trim();
      if (site !== "") {
        chrome.runtime.sendMessage({ action: "addSite", site });
        const li = document.createElement("li");
        li.textContent = site;
        blockedSitesList.appendChild(li);
        siteInput.value = "";
      }
    });

    // Add event listener for removing a site
    removeSiteBtn.addEventListener("click", function () {
      const selectedSite = prompt("Enter the site URL to remove:");
      if (selectedSite) {
        chrome.runtime.sendMessage({ action: "removeSite", site: selectedSite });
        const siteLis = blockedSitesList.querySelectorAll("li");
        siteLis.forEach(li => {
          if (li.textContent === selectedSite) {
            blockedSitesList.removeChild(li);
          }
        });
      }
    });
  });  