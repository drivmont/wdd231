document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  navToggle.addEventListener("click", function () {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  const membershipLabels = {
    1: "Member",
    2: "Silver Member",
    3: "Gold Member"
  };

  function renderMembers(members) {
    const container = document.getElementById("directoryList");
    container.innerHTML = "";
    members.forEach(function (m) {
      const card = document.createElement("li");
      card.className = "member-card";
      card.innerHTML =
        '<h3>' + m.name + '</h3>' +
        '<p class="tagline">' + m.industry + '</p>' +
        '<img src="' + m.image + '" alt="' + m.name + ' logo">' +
        '<p class="membership-badge level-' + m.membership + '">' + (membershipLabels[m.membership] || "Member") + '</p>' +
        '<p>' + m.description + '</p>' +
        '<p><strong>ADDRESS:</strong> ' + m.address + '</p>' +
        '<p><strong>PHONE:</strong> ' + m.phone + '</p>' +
        '<p><strong>WEBSITE:</strong> <a href="' + m.website + '" target="_blank" rel="noopener">' + m.website + '</a></p>';
      container.appendChild(card);
    });
  }

  async function loadMembers() {
    const container = document.getElementById("directoryList");
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) {
        throw new Error("Network response was not ok (" + response.status + ")");
      }
      const members = await response.json();
      renderMembers(members);
    } catch (error) {
      console.error("Unable to load the member directory:", error);
      container.innerHTML = "<li>Sorry, the member directory could not be loaded right now.</li>";
    }
  }

  loadMembers();

  document.getElementById("gridBtn").addEventListener("click", function () {
    document.getElementById("directoryList").className = "member-list grid-view";
    this.classList.add("is-active");
    document.getElementById("listBtn").classList.remove("is-active");
  });
  document.getElementById("listBtn").addEventListener("click", function () {
    document.getElementById("directoryList").className = "member-list list-view";
    this.classList.add("is-active");
    document.getElementById("gridBtn").classList.remove("is-active");
  });
});
