function showTab(tabId){document.querySelectorAll('.tab').forEach(tab=>tab.style.display='none');document.getElementById(tabId).style.display='block'; if(tabId==='live') initMap();}

// 1. HINDI VOICE DATA
const planets=[{name:"☀️ Suraj",info:"Ye Suraj hai. Saare Solar System ka kendra. Tapman 5500°C"},{name:"🌍 Prithvi",info:"Ye Prithvi hai. Yahi jeevan sambhav hai. 1 Chand hai"},{name:"🔴 Mangal",info:"Ye Mangal hai. Lal Grah. ISRO yaha pahunch chuka hai"},{name:"🪐 Brihaspati",info:"Ye Brihaspati hai. Sabse bada Grah. 79 Chand hain"},{name:"💫 Kshudragrah Patti",info:"Ye Kshudragrah Patti hai. Mangal aur Brihaspati ke beech"},{name:"🌌 Akash Ganga",info:"Ye Akash Ganga Aakashganga hai. 100 Arab Sitare"}];

function speak(text){const msg=new SpeechSynthesisUtterance(text); msg.lang='hi-IN'; speechSynthesis.speak(msg);}

function loadPlanets(){document.getElementById('planets').innerHTML=planets.map(p=>`<div class="card" onclick="speak('${p.info}')"><h3>${p.name}</h3><p>Click karke suno</p></div>`).join('');}

// 2. LIVE SATELLITE MAP
let map;
function initMap(){
  if(map) return;
  map=L.map('map').setView([20,78],2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  fetch('https://api.wheretheiss.at/v1/satellites/25544').then(res=>res.json()).then(data=>{
    L.marker([data.latitude,data.longitude]).addTo(map).bindPopup("🛰️ ISS yaha hai abhi");
    document.getElementById('satInfo').innerText=`ISS Speed: ${data.velocity.toFixed(2)} km/h | Height: ${data.altitude.toFixed(2)} km`;
  });
}

// 3. AR CAMERA
function startAR(){
  navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
    document.getElementById('arVideo').srcObject=stream;
    alert("AR On! Ab table pe ungli se planet banao");
  });
}

// ROCKET + QUIZ + MISSIONS - PEHLE WALE HI
function launchRocket(){document.getElementById('rocket').style.bottom='250px';document.getElementById('flame').style.display='block';setTimeout(()=>{document.getElementById('rocket').style.bottom='10px';document.getElementById('flame').style.display='none';},4000);}
const missions=["2023 - Chandrayaan 3 - ISRO - Moon South Pole","2025 - Gaganyaan - ISRO - Human Spaceflight","2026 - Artemis II - NASA - Moon Orbit"];
function loadMissions(){document.getElementById('missionList').innerHTML=missions.map(m=>`<li class="card" style="width:90%;text-align:left;">${m}</li>`).join('');}
let score=0,total=0;const quizData=[{q:"ISRO ka full form?",a:["Indian Space Research Org","International Space Org"],ans:0}];let qIndex=0;
function loadQuiz(){document.getElementById('question').innerText=quizData[qIndex].q;document.getElementById('options').innerHTML=quizData[qIndex].a.map((opt,i)=>`<button onclick="checkQuiz(${i})">${opt}</button>`).join('');}
function checkQuiz(i){total++; if(i===quizData[qIndex].ans){score++;speak("Sahi jawab");} document.getElementById('score').innerText=`Score: ${score} / ${total}`; qIndex=(qIndex+1)%quizData.length; loadQuiz();}
window.onload=function(){loadPlanets();loadMissions();loadQuiz();}
