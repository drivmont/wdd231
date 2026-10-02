import { places } from "../data/places.mjs";

const areaNames = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
const gallery = document.querySelector("#discoverGallery");

places.forEach((place, index) => {
  const card = document.createElement("article");
  card.className = "discover-card";
  card.dataset.area = areaNames[index];

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button" class="learn-more">Learn More</button>
  `;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ", " + place.address)}`;
  card.querySelector(".learn-more").addEventListener("click", () => {
    window.open(mapsUrl, "_blank", "noopener");
  });

  gallery.appendChild(card);
});

const msPerDay = 24 * 60 * 60 * 1000;
const now = Date.now();
const lastVisit = Number(localStorage.getItem("discoverLastVisit"));
let message;

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else if (now - lastVisit < msPerDay) {
  message = "Back so soon! Awesome!";
} else {
  const days = Math.floor((now - lastVisit) / msPerDay);
  message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

document.querySelector("#visitText").textContent = message;
localStorage.setItem("discoverLastVisit", now);

document.querySelector("#closeVisit").addEventListener("click", () => {
  document.querySelector("#visitMessage").remove();
});
