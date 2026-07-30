
// Tab switch karne ke liye
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// Planets Data
const planets = [
  {name: "Sun", info: "Solar System ka center, sabse bada tara"},
  {name: "Earth", info: "Hamara ghar. Yahi life hai"},
  {name: "Mars", info: "Lal Grah. ISRO ka Mangalyaan yaha gaya"},
  {name: "Jupiter", info: "Sabse bada planet"}
];

function loadPlanets() {
  let html = "";
  planets.forEach(p => {
    html += `<div class="planet"><h3>${p.name}</h3><p>${p.info}</p></div>`;
  });
  document.getElementById('planets').innerHTML = html;
}

// Mission Data
const missions = [
  "1969 - Apollo 11 - NASA - Moon Landing",
  "2013 - Mangalyaan - ISRO - Mars Orbit",
  "2023 - Chandrayaan 3 - ISRO - Moon South Pole"
];

function loadMissions() {
  let html = "";
  missions.forEach(m => html += `<li>${m}</li>`);
  document.getElementById('missionList').innerHTML = html;
}

// Scientist Data
const scientists = [
  {name: "Dr. APJ Abdul Kalam", work: "Missile Man of India"},
  {name: "Rakesh Sharma", work: "Pehle Bhartiya Antariksh Yatri"},
  {name: "Kalpana Chawla", work: "NASA Astronaut"}
];

function loadScientists() {
  let html = "";
  scientists.forEach(s => {
    html += `<div class="planet"><h3>${s.name}</h3><p>${s.work}</p></div>`;
  });
  document.getElementById('scientistList').innerHTML = html;
}

// Quiz
function checkAns(ans) {
  if(ans === "Mars") {
    document.getElementById('result').innerText = "Sahi! Mars Lal Grah hai 🚀";
  } else {
    document.getElementById('result').innerText = "Galat! Sahi jawab Mars hai";
  }
}

// Page load hote hi data load karo
window.onload = function() {
  loadPlanets();
  loadMissions();
  loadScientists();
  document.getElementById('question').innerText = "Lal Grah kaun sa hai?";
}
