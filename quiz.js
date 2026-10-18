"use strict";
(async()=>{
const slug=document.body.dataset.subject,root=document.getElementById("quiz-root");
if(!root||!["mathe","englisch","franzoesisch"].includes(slug))return;
const KEY="mia-lernen-local-v1:"+slug,DAY=86400000;
let progress={};
try{const saved=JSON.parse(localStorage.getItem(KEY)||"{}");if(saved&&typeof saved==="object"&&!Array.isArray(saved))progress=saved}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}; // ausschließlich lokale Speicherung
let quizzes;
try{const r=await fetch("./quizzes/"+slug+".json",{cache:"no-store"});if(!r.ok)throw Error();quizzes=await r.json();if(!Array.isArray(quizzes))throw Error()}catch{root.textContent="Quizze konnten nicht geladen werden.";return}
const el=(tag,txt,cls)=>{const x=document.createElement(tag);if(txt!==undefined)x.textContent=txt;if(cls)x.className=cls;return x};
const id=(q,a)=>slug+"::"+(q.id||q.title)+"::"+(a.id||a.text);
const status=k=>progress[k]||{streak:0,attempts:0,wrong:0,due:0};
const all=()=>quizzes.flatMap(q=>(q.questions||[]).map(a=>({q,a,key:id(q,a)})));
function update(key,correct){const p=status(key);const streak=correct?Math.min(5,p.streak+1):0;const delay=correct?(streak===1?0:streak===2?DAY:streak===3?3*DAY:7*DAY):0;progress[key]={streak,attempts:p.attempts+1,wrong:p.wrong+(correct?0:1),due:Date.now()+delay};save()}
function overview(){
root.replaceChildren();
const entries=all(),newCount=entries.filter(x=>!status(x.key).attempts).length;
const review=entries.filter(x=>status(x.key).attempts&&status(x.key).due<=Date.now()).length;
const mastered=entries.filter(x=>status(x.key).streak>=3).length;
const box=el("section",undefined,"panel");box.append(el("h2","Deine Lernrunde ♡"),el("p","Du musst nicht alles auf einmal können. Jeder kleine Schritt zählt.","muted"));
const stats=el("div",undefined,"stats");for(const t of ["Neu: "+newCount,"Jetzt üben: "+review,"Gut gefestigt: "+mastered])stats.append(el("span",t));box.append(stats);
const ready=entries.filter(x=>status(x.key).due<=Date.now());const btn=el("button",ready.length?"Jetzt gezielt üben →":"Für heute alles geschafft ♡","btn");btn.disabled=!ready.length;btn.onclick=()=>session(ready);box.append(btn);root.append(box);
for(const q of quizzes){const items=(q.questions||[]).map(a=>({q,a,key:id(q,a)})).filter(x=>status(x.key).due<=Date.now());const panel=el("section",undefined,"panel");panel.append(el("span","QUIZ · "+items.length+" Fragen bereit","pill"),el("h2",q.title),el("p",q.description||"Kurzes Übungsquiz.","muted"));const b=el("button",items.length?"Dieses Thema üben":"Gerade nichts zu wiederholen","btn");b.disabled=!items.length;b.onclick=()=>session(items);panel.append(b);root.append(panel)}
root.append(el("p","Der Fortschritt wird nur in diesem Browser gespeichert. Auf anderen Geräten ist er nicht verfügbar. Wird der Browser-Speicher gelöscht, geht er verloren.","privacy"));
}
function session(items){
const queue=items.slice().sort((x,y)=>(status(x.key).streak-status(y.key).streak)||(status(y.key).wrong-status(x.key).wrong)).slice(0,8);
let pos=0,correctCount=0;
function question(){
root.replaceChildren();
if(pos>=queue.length){const panel=el("section",undefined,"panel center");panel.append(el("span","✨ Geschafft!","pill"),el("h2",correctCount===queue.length?"Stark gemacht! ♡":"Du hast heute dazugelernt! ♡"),el("p",correctCount+" von "+queue.length+" Antworten richtig. Fehler zeigen dir, was du als Nächstes üben kannst."),el("p","Du kannst stolz auf deinen Einsatz sein!","muted"));const b=el("button","Zurück zur Übersicht","btn");b.onclick=overview;panel.append(b);root.append(panel);return}
const {q,a,key}=queue[pos],card=el("section",undefined,"panel");
card.append(el("span","Frage "+(pos+1)+" von "+queue.length,"pill"),el("h2",q.title));
const bar=el("div",undefined,"bar");const fill=el("div");fill.style.width=(pos/queue.length*100)+"%";bar.append(fill);card.append(bar);
const tip=el("div",undefined,"tip");tip.append(el("strong","💡 Kurz erklärt"),el("p",q.explanation||""),el("strong","♡ Merksatz"),el("p",q.memoryTip||""));card.append(tip,el("h3",a.text));
const fb=el("div"),next=el("button",pos===queue.length-1?"Ergebnis ansehen →":"Weiter →","btn hidden");const buttons=[];
(a.options||[]).forEach((option,i)=>{const b=el("button",option,"option");b.onclick=()=>{const right=i===a.correctIndex;update(key,right);if(right)correctCount++;buttons.forEach((v,j)=>{v.disabled=true;if(j===a.correctIndex)v.classList.add("right");if(j===i&&!right)v.classList.add("wrong")});fb.className="feedback";fb.replaceChildren(el("strong",right?["Genau richtig! 🌟","Super gemacht! ✨","Klasse, weiter so! ♡"][pos%3]:"Guter Versuch! ♡ Das üben wir nochmal."),el("p",a.feedback||"Die richtige Antwort ist: "+a.options[a.correctIndex]));next.classList.remove("hidden")};buttons.push(b);card.append(b)});
next.onclick=()=>{pos++;question()};card.append(fb,next);root.append(card)
}question();
}
overview();
})();