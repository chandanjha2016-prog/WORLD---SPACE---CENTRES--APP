// TAB SYSTEM
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// COMPLETE DATA
const planets = [
  {name: "☀️ Sun", info: "Center of Solar System. Temp: 5500°C. 99% mass", img:"https://apod.nasa.gov/apod/image/2307/SunEclipse_Schmidt_960.jpg"},
  {name: "🌍 Earth", info: "Only planet with Life. 1 Moon. 71% Water", img:"https://www.nasa.gov/wp-content/uploads/2015/06/earth_from_space.jpg"},
  {name: "🔴 Mars", info: "Red Planet. ISRO Mangalyaan 2013. 2 Moons", img:"https://mars.nasa.gov/system/resources/detail_files/8510_PIA24546-FigA.jpg"},
  {name: "🪐 Jupiter", info: "Biggest Planet. 79 Moons. Great Red Spot", img:""},
  {name: "💫 Asteroid Belt", info: "Between Mars & Jupiter. Millions of rocks", img:""},
  {name: "🌌 Milky Way", info: "Our Galaxy. 100 Billion Stars. 100,000 Light Years", img:""}
];

const missions = [
  "1969 - Apollo 11 - NASA - First Moon Landing - Neil Armstrong",
  "1984 - Soyuz T-11 - ISRO - Rakesh Sharma - First Indian in Space",
  "2013 - Mangalyaan - ISRO - Mars Orbit in 1st Attempt. $74 Million",
  "2019 - Chandrayaan 2 - ISRO - Orbiter still working",
  "2023 - Chandrayaan 3 - ISRO - First Moon South Pole Landing",
  "2025 - Gaganyaan - ISRO - First Indian Human Spaceflight Planned",
  "2026 - Artemis II - NASA - First Crewed Moon Orbit in 50 Years"
];

const scientists = [
  {name: "Dr. APJ Abdul Kalam", work: "Missile Man of India. 11th President. Father of Agni Missile"},
  {name: "Dr. Vikram Sarabhai", work: "Father of Indian Space Program. Founded ISRO in 1969"},
  {name: "Rakesh Sharma", work: "First Indian in Space. 1984. Said 'Sare Jahan Se Achha' from Space"},
  {name: "Kalpana Chawla", work: "NASA Astronaut. Columbia STS-87, STS-107. Inspiration for millions"},
  {name: "Dr. K Sivan", work: "Ex ISRO Chairman. Led Chandrayaan-2, Chandrayaan-3 Missions"}
];

// LOAD FUNCTIONS
function loadPlanets() {
  document.getElementById('planets').innerHTML = planets.map(p =>
    `<div class="card" onclick="alert('${p.name}: ${p.info}')">
      <img src="${p.img}" onerror="this.style.display='none'">
      <h3>${p.name}</h3>
      <p>${p.info.substring(0,40)}...</p>
    </div>`
  ).join('');
}

function loadMissions() {
  document.getElementById('missionList').innerHTML = missions.map(m =>
    `<li class="card" style="width:90%; text-align:left;">${m}</li>`
  ).join('');
}

function loadScientists() {
  document.getElementById('scientistList').innerHTML = scientists.map(s =>
    `<div class="card"><h3>${s.name}</h3><p>${s.work}</p></div>`
  ).join('');
}

// ROCKET LAUNCH SIMULATOR
function launchRocket() {
  document.getElementById('rocket').style.bottom = '250px';
  document.getElementById('flame').style.display = 'block';
  document.getElementById('launchStatus').innerText = 'Status: Launched! T+10s to ISS';
  setTimeout(()=>{document.getElementById('launchStatus').innerText = 'Status: Docked at ISS Successfully! Mission Complete';}, 3000);
  setTimeout(()=>{document.getElementById('rocket').style.bottom = '10px'; document.getElementById('flame').style.display = 'none';}, 4000);
}

// SATELLITE CRASH SIMULATOR
function crashSatellite() {
  document.getElementById('satellite').style.top = '250px';
  document.getElementById('crashInfo').innerText = 'Burning! Atmospheric Friction. Temp > 1600°C';
  setTimeout(()=>{document.getElementById('satellite').style.top = '10px'; document.getElementById('crashInfo').innerText = 'Click to see Science Again';}, 3000);
}

// QUIZ SYSTEM
let score = 0; let total = 0;
const quizData = [
  {q: "ISRO ka full form kya hai?", a:["Indian Space Research Organization", "International Space Org", "Indian Science Org"], ans:0},
  {q: "Chandrayaan 3 kaha gira?", a:["North Pole", "South Pole", "Equator"], ans:1},
  {q: "Pehle Bhartiya Antariksh Yatri kaun?", a:["APJ Kalam", "Rakesh Sharma", "Vikram Sarabhai"], ans:1}
];
let qIndex = 0;
function loadQuiz() {
  document.getElementById('question').innerText = quizData[qIndex].q;
  document.getElementById('options').innerHTML = quizData[qIndex].a.map((opt,i) =>
    `<button onclick="checkQuiz(${i})">${opt}</button>`
  ).join('');
}
function checkQuiz(i) {
  total++;
  if(i === quizData[qIndex].ans) { score++; alert("Sahi Jawab! 🚀"); }
  else { alert("Galat! Sahi jawab: " + quizData[qIndex].a[quizData[qIndex].ans]); }
  document.getElementById('score').innerText = `Score: ${score} / ${total}`;
  qIndex = (qIndex+1) % quizData.length;
  loadQuiz();
}
function resetQuiz(){ score=0; total=0; document.getElementById('score').innerText = `Score: 0 / 0`; loadQuiz(); }

// INIT ON LOAD
window.onload = function() {
  loadPlanets(); loadMissions(); loadScientists(); loadQuiz();
}
