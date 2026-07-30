function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// DATA
const planets = [
  {name: "☀️ Sun", info: "Center of Solar System. Temp: 5500°C"},
  {name: "🌍 Earth", info: "Only planet with Life. 1 Moon"},
  {name: "🔴 Mars", info: "Red Planet. ISRO Mangalyaan 2013"},
  {name: "🪐 Jupiter", info: "Biggest Planet. 79 Moons"},
  {name: "💫 Asteroid Belt", info: "Between Mars & Jupiter"},
  {name: "🌌 Galaxy", info: "Milky Way has 100 Billion Stars"}
];

const missions = [
  "1969 - Apollo 11 - NASA - First Moon Landing",
  "1984 - Rakesh Sharma - First Indian in Space",
  "2013 - Mangalyaan - ISRO - Mars Orbit in 1st Attempt",
  "2023 - Chandrayaan 3 - ISRO - Moon South Pole Landing",
  "2025 - Gaganyaan - ISRO - First Indian Human Spaceflight",
  "2026 - Artemis II - NASA - Moon Orbit Mission"
];

const scientists = [
  {name: "Dr. APJ Abdul Kalam", work: "Missile Man of India. Father of Agni Missile"},
  {name: "Dr. Vikram Sarabhai", work: "Father of Indian Space Program"},
  {name: "Rakesh Sharma", work: "First Indian in Space. 1984 Soyuz T-11"},
  {name: "Kalpana Chawla", work: "NASA Astronaut. Columbia STS-87, STS-107"},
  {name: "Dr. K Sivan", work: "Ex ISRO Chairman. Chandrayaan-2,3"}
];

// LOAD FUNCTIONS
function loadPlanets() {
  document.getElementById('planets').innerHTML = planets.map(p =>
    `<div class="card"><h3>${p.name}</h3><p>${p.info}</p></div>`
  ).join('');
}

function loadMissions() {
  document.getElementById('missionList').innerHTML = missions.map(m =>
    `<li class="card" style="width:90%;">${m}</li>`
  ).join('');
}

function loadScientists() {
  document.getElementById('scientistList').innerHTML = scientists.map(s =>
    `<div class="card"><h3>${s.name}</h3><p>${s.work}</p></div>`
  ).join('');
}

// ROCKET LAUNCH
function launchRocket() {
  document.getElementById('rocket').style.bottom = '250px';
  document.getElementById('flame').style.display = 'block';
  document.getElementById('launchStatus').innerText = 'Launched! Reaching ISS in T+10s';
  setTimeout(()=>{document.getElementById('launchStatus').innerText = 'Docked at ISS Successfully!'}, 3000);
}

// SATELLITE CRASH
function crashSatellite() {
  document.getElementById('satellite').style.top = '250px';
  document.getElementById('crashInfo').innerText = 'Burning due to Atmospheric Friction! Temp > 1600°C';
}

// QUIZ
let score = 0;
const quizData = [
  {q: "ISRO ka full form?", a:["Indian Space Research Org", "International Space Org"], ans:0},
  {q: "Chandrayaan 3 kaha gira?", a:["North Pole", "South Pole"], ans:1}
];
let qIndex = 0;
function loadQuiz() {
  document.getElementById('question').innerText = quizData[qIndex].q;
  document.getElementById('options').innerHTML = quizData[qIndex].a.map((opt,i) =>
    `<button onclick="checkQuiz(${i})">${opt}</button>`
  ).join('');
}
function checkQuiz(i) {
  if(i === quizData[qIndex].ans) { score++; alert("Sahi!"); }
  else { alert("Galat!"); }
  document.getElementById('score').innerText = "Score: " + score;
  qIndex = (qIndex+1) % quizData.length;
  loadQuiz();
}

// INIT
window.onload = function() {
  loadPlanets(); loadMissions(); loadScientists(); loadQuiz();
}
