const NASA_KEY = "DEMO_KEY"; // Yaha apni key daal. https://api.nasa.gov se free milegi

const planets=[{name:"☀️ Suraj",info:"Ye Suraj hai. Saare Solar System ka kendra."},{name:"🌍 Prithvi",info:"Ye Prithvi hai. Yahi jeevan sambhav hai."},{name:"🔴 Mangal",info:"Ye Mangal hai. ISRO ka Mangalyan yaha pahunch chuka hai."},{name:"🪐 Brihaspati",info:"Ye Brihaspati hai. Solar System ka sabse bada Grah."}];
const missions=["1957 - Sputnik 1 - First Satellite","2014 - Mangalyaan - ISRO - Mars Orbit","2023 - Chandrayaan 3 - ISRO - Moon South Pole","2025 - Gaganyaan - ISRO - Human Spaceflight"];
const quizData=[{q:"ISRO ka full form?",a:["Indian Space Research Organisation","International Space Research Org"],ans:0},{q:"Chandrayaan 3 kaha utara?",a:["Moon North Pole","Moon South Pole"],ans:1}];
let score=0,total=0,qIndex=0,map;

function showTab(tabId){document.querySelectorAll('.tab').forEach(tab=>tab.style.display='none');document.getElementById(tabId).style.display='block'; if(tabId==='nasa') loadAPOD(); if(tabId==='mars') loadMars(); if(tabId==='asteroid') loadAsteroids(); if(tabId==='live') initMap(); if(tabId==='quiz') loadQuiz();}

function speak(text){const msg=new SpeechSynthesisUtterance(text); msg.lang='hi-IN'; speechSynthesis.speak(msg);}

function loadPlanets(){document.getElementById('planets').innerHTML=planets.map(p=>`<div class="card" onclick="speak('${p.info}')"><h3>${p.name}</h3><p>Click karke suno</p></div>`).join('');}

async function loadAPOD(){
  try{const res=await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);const data=await res.json();
  document.getElementById('nasaImg').src=data.url; document.getElementById('nasaTitle').innerText=data.title; document.getElementById('nasaDesc').innerText=data.explanation;}
  catch(e){document.getElementById('nasaTitle').innerText="NASA Data Load Nahi Hua";}
}

async function loadMars(){
  try{const res=await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${NASA_KEY}`);const data=await res.json();
  document.getElementById('marsPhotos').innerHTML=data.latest_photos.slice(0,6).map(p=>`<div class="card"><img src="${p.img_src}" style="width:100%;border-radius:8px;"><p>Sol: ${p.sol} Date: ${p.earth_date}</p></div>`).join('');}
  catch(e){document.getElementById('marsPhotos').innerHTML="<p>Mars Photos Nahi Mili</p>";}
}

async function loadAsteroids(){
  let today=new Date().toISOString().split('T')[0];
  try{const res=await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_KEY}`);const data=await res.json();
  let list=data.near_earth_objects[today].slice(0,5).map(a=>`<li class="card" style="width:90%;text-align:left;">${a.name} - Size: ${a.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m - Dangerous: ${a.is_potentially_hazardous_asteroid?'HAAN':'NAHI'}</li>`).join('');
  document.getElementById('asteroidList').innerHTML=list;}
  catch(e){document.getElementById('asteroidList').innerHTML="<p>Asteroid Data Nahi Mila</p>";}
}

function initMap(){if(map) return; map=L.map('map').setView([20,78],2); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
fetch('https://api.wheretheiss.at/v1/satellites/25544').then(res=>res.json()).then(data=>{
L.marker([data.latitude,data.longitude]).addTo(map).bindPopup("🛰️ ISS");
document.getElementById('satInfo').innerText=`Speed: ${data.velocity.toFixed(2)} km/h | Height: ${data.altitude.toFixed(2)} km`;
});}

function loadMissions(){document.getElementById('missionList').innerHTML=missions.map(m=>`<li class="card" style="width:90%;text-align:left;margin:10px auto;">${m}</li>`).join('');}
function loadQuiz(){document.getElementById('question').innerText=quizData[qIndex].q;document.getElementById('options').innerHTML=quizData[qIndex].a.map((opt,i)=>`<button onclick="checkQuiz(${i})">${opt}</button>`).join('');}
function checkQuiz(i){total++; if(i===quizData[qIndex].ans){score++;speak("Sahi jawab");}else{speak("Galat jawab");} document.getElementById('score').innerText=`Score: ${score} / ${total}`; qIndex=(qIndex+1)%quizData.length; setTimeout(loadQuiz,1000);}
window.onload=function(){loadPlanets();loadMissions();}
