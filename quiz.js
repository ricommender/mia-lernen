"use strict";
(async function(){
 const slug=document.body.dataset.subject;
 const root=document.getElementById("quiz-root");
 if(!["mathe","englisch","franzoesisch"].includes(slug)||!root)return;
 let quizzes;
 try{
  const response=await fetch("./quizzes/"+slug+".json",{cache:"no-store"});
  if(!response.ok)throw new Error("Quizdatei nicht verfügbar");
  quizzes=await response.json();
  if(!Array.isArray(quizzes))throw new Error("Ungültiges Format");
 }catch(e){root.textContent="Quizze konnten nicht geladen werden.";return;}
 const element=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
 function list(){
  root.replaceChildren();
  if(!quizzes.length){root.append(element("p","Zurzeit sind keine Quizze verfügbar."));return;}
  const info=element("p","Aktuell sind nur neutrale Demo-Quizze hinterlegt. Keine persönlichen Daten werden geladen.","muted");root.append(info);
  for(const quiz of quizzes){const card=element("section",undefined,"panel");card.append(element("h2",quiz.title),element("p",quiz.description||"Kurzes Übungsquiz.","muted"));const btn=element("button","Quiz starten","btn");btn.onclick=()=>start(quiz);card.append(btn);root.append(card);}
 }
 function start(quiz){
  let pos=0,score=0;
  function render(){
   root.replaceChildren();
   if(pos>=quiz.questions.length){const done=element("section",undefined,"panel");done.append(element("h2","Quiz abgeschlossen"),element("p","Richtig beantwortet: "+score+" von "+quiz.questions.length));const again=element("button","Zur Quiz-Auswahl","btn");again.onclick=list;done.append(again);root.append(done);return;}
   const question=quiz.questions[pos],card=element("section",undefined,"panel");
   card.append(element("p","Frage "+(pos+1)+" von "+quiz.questions.length,"muted"),element("h2",quiz.title));
   const expl=element("div",undefined,"tip");expl.append(element("strong","Kurz erklärt"));expl.append(element("p",quiz.explanation));expl.append(element("strong","Merksatz"));expl.append(element("p",quiz.memoryTip));card.append(expl,element("h3",question.text));
   const feedback=element("div");const buttons=[];
   question.options.forEach((answer,i)=>{const button=element("button",answer,"option");button.onclick=()=>{
    buttons.forEach((b,j)=>{b.disabled=true;if(j===question.correctIndex)b.classList.add("right");if(j===i&&i!==question.correctIndex)b.classList.add("wrong");});
    if(i===question.correctIndex)score++;
    feedback.replaceChildren(element("p",i===question.correctIndex?"Richtig!":"Noch nicht richtig. Richtige Antwort: "+question.options[question.correctIndex]),element("p",question.feedback));
    next.classList.remove("hidden");
   };buttons.push(button);card.append(button);});
   const next=element("button",pos===quiz.questions.length-1?"Auswertung":"Nächste Frage","btn hidden");next.onclick=()=>{pos++;render();};card.append(feedback,next);root.append(card);
  }render();
 }
 list();
})();