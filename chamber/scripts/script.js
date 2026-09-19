document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  navToggle.addEventListener("click", function () {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // --- Directory page only (chamber/directory.html) ---
  if (document.getElementById("directoryList")) {
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
          '<img src="' + m.image + '" alt="' + m.name + ' logo" width="300" height="160">' +
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
  }

  // --- Home page only (chamber/index.html) ---
  if (document.getElementById("currentTemp")) {
    loadWeather();
    loadSpotlights();
  }
});

const API_KEY = "cdde9c7581f60bc772684fba34e24b09";
const LAT = -17.7833;
const LON = -63.1821;

async function loadWeather() {
  try {
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
    );
    const current = await currentResponse.json();

    document.getElementById("currentTemp").textContent =
      `${Math.round(current.main.temp)}°C`;
    document.getElementById("currentDesc").textContent =
      current.weather[0].description;

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    // pick one reading per day, close to midday
    const dailyReadings = forecastData.list.filter(entry =>
      entry.dt_txt.includes("12:00:00")
    );

    const forecastList = document.getElementById("forecastList");
    forecastList.innerHTML = "";

    dailyReadings.slice(0, 3).forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${dayName}</h3>
        <p>${Math.round(day.main.temp)}°C</p>
      `;
      forecastList.appendChild(li);
    });
  } catch (error) {
    console.error("Unable to load weather data:", error);
  }
  
}

async function loadSpotlights() {
  const container = document.getElementById("spotlightList");
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Network response was not ok (" + response.status + ")");
    }
    const members = await response.json();

    // only silver (2) and gold (3) members are eligible for a spotlight ad
    const eligible = members.filter(m => m.membership === 2 || m.membership === 3);

    // shuffle, then take up to 3
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, 3);

    const membershipLabels = { 2: "Silver Member", 3: "Gold Member" };

    container.innerHTML = "";
    picks.forEach(m => {
      const card = document.createElement("li");
      card.className = "spotlight-card";
      card.innerHTML =
        '<img src="' + m.image + '" alt="' + m.name + ' logo" width="150" height="100">' +
        '<h3>' + m.name + '</h3>' +
        '<p class="membership-badge level-' + m.membership + '">' + membershipLabels[m.membership] + '</p>' +
        '<p><strong>Phone:</strong> ' + m.phone + '</p>' +
        '<p><strong>Address:</strong> ' + m.address + '</p>' +
        '<p><strong>Website:</strong> <a href="' + m.website + '" target="_blank" rel="noopener">' + m.website + '</a></p>';
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Unable to load spotlights:", error);
    container.innerHTML = "<li>Sorry, spotlights could not be loaded right now.</li>";
  }
}