const NASA_KEY = "DEMO_KEY"; // yaha apni NASA key daal dena

const planets=[{name:"☀️ Suraj",info:"Ye Suraj hai. Saare Solar System ka kendra. Tapman 5500 degree Celsius"},{name:"🌍 Prithvi",info:"Ye Prithvi hai. Yahi jeevan sambhav hai. Iska 1 Chand hai"},{name:"🔴 Mangal",info:"Ye Mangal hai. Lal Grah. ISRO ka Mangalyan yaha pahunch chuka hai"},{name:"🪐 Brihaspati",info:"Ye Brihaspati hai. Solar System ka sabse bada Grah. 79 Chand hain"},{name:"💫 Kshudragrah Patti",info:"Ye Kshudragrah Patti hai. Mangal aur Brihaspati ke beech mein hai"},{name:"🌌 Akash Ganga",info:"Ye Akash Ganga Aakashganga hai. Isme 100 Arab Sitare hain"}];

const missions=["1957 - Sputnik 1 - USSR - First Satellite","1969 - Apollo 11 - NASA - First Moon Landing","2014 - Mangalyaan - ISRO - Mars Orbit","2023 - Chandrayaan 3 - ISRO - Moon South Pole","2025 - Gaganyaan - ISRO - Human Spaceflight"];

const quizData=[{q:"ISRO ka full form kya hai?",a:["Indian Space Research Organisation","International Space Research Org"],ans:0},{q:"Chandrayaan 3 kaha utara tha?",a:["Moon North Pole","Moon South Pole"],ans:1},{q:"Pehle Bhartiya Antariksh Yatri?",a:["Dr. APJ Kalam","Rakesh Sharma"],ans:1}];
let score=0,total=0,qIndex=0,map;

function showTab(tabId){document.querySelectorAll('.tab').forEach(tab=>tab.style.display='none');document.getElementById(tabId).style.display='block'; if(tabId==='nasa') loadNASA(); if(tabId==='live') initMap(); if(tabId==='quiz') loadQuiz();}

function speak(text){const msg=new SpeechSynthesisUtterance(text); msg.lang='hi-IN'; speechSynthesis.speak(msg);}

function loadPlanets(){document.getElementById('planets').innerHTML=planets.map(p=>`<div class="card" onclick="speak('${p.info}')"><h3>${p.name}</h3><p>Click karke suno</p></div>`).join('');}

async function loadNASA(){
  document.getElementById('nasaTitle').innerText = "Loading from NASA...";
  try{
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
    const data = await res.json();
    document.getElementById('nasaImg').src = data.url;
    document.getElementById('nasaTitle').innerText = data.title;
    document.getElementById('nasaDesc').innerText = data.explanation;
  }catch(e){document.getElementById('nasaTitle').innerText = "NASA Data Load Nahi Hua";}
}

function initMap(){
  if(map) return;
  map=L.map('map').setView([20,78],2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  fetch('https://api.wheretheiss.at/v1/satellites/25544').then(res=>res.json()).then(data=>{
    L.marker([data.latitude,data.longitude]).addTo(map).bindPopup("🛰️ ISS yaha hai abhi");
    document.getElementById('satInfo').innerText=`ISS Speed: ${data.velocity.toFixed(2)} km/h | Height: ${data.altitude.toFixed(2)} km`;
  });
}

function launchRocket(){document.getElementById('launchStatus').innerText="Status: Launching...";document.getElementById('rocket').style.bottom='250px';document.getElementById('flame').style.display='block';setTimeout(()=>{document.getElementById('rocket').style.bottom='10px';document.getElementById('flame').style.display='none';document.getElementById('launchStatus').innerText="Status: Mission Success!";},4000);}

function loadMissions(){document.getElementById('missionList').innerHTML=missions.map(m=>`<li class="card" style="width:90%;text-align:left;margin:10px auto;">${m}</li>`).join('');}

function loadQuiz(){document.getElementById('question').innerText=quizData[qIndex].q;document.getElementById('options').innerHTML=quizData[qIndex].a.map((opt,i)=>`<button onclick="checkQuiz(${i})">${opt}</button>`).join('');}
function checkQuiz(i){total++; if(i===quizData[qIndex].ans){score++;speak("Sahi jawab");}else{speak("Galat jawab");} document.getElementById('score').innerText=`Score: ${score} / ${total}`; qIndex=(qIndex+1)%quizData.length; setTimeout(loadQuiz,1000);}

window.onload=function(){loadPlanets();loadMissions();}
