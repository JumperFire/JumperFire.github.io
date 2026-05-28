
// ── Stars ────────────────────────────────────────────────────
const stEl=document.getElementById('stars');
for(let i=0;i<130;i++){
  const s=document.createElement('div');s.className='s';
  const sz=Math.random()*1.9+.3;
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;`
    +`--o:${(Math.random()*.45+.08).toFixed(2)};--d:${(Math.random()*4+2).toFixed(1)}s;`
    +`animation-delay:${(Math.random()*6).toFixed(1)}s`;
  stEl.appendChild(s);
}

// ── SVG constants ─────────────────────────────────────────────
const NS='http://www.w3.org/2000/svg',CX=300,CY=300;
const INNER_R=76, ZONE_R=102, OUTER_R=258, LABEL_R=274;

// ── Persona segs ─────────────────────────────────────────────
const PERSONA_SEGS={
  student:new Set(['verstehen:1','verstehen:2','verstehen:3','verstehen:4','verstehen:5',
    'bewerten:1','bewerten:2','bewerten:3','bewerten:4','bewerten:5','bewerten:6',
    'anwenden:1','anwenden:2','anwenden:3','anwenden:4','anwenden:5',
    'tools:1','tools:2','skills:1','skills:2']),
  worker:new Set(['verstehen:1','verstehen:2','verstehen:3','verstehen:4','verstehen:5','verstehen:6',
    'bewerten:1','bewerten:2','bewerten:3','bewerten:4','bewerten:5','bewerten:6',
    'anwenden:1','anwenden:2','anwenden:3','anwenden:4','anwenden:5','anwenden:6',
    'tools:1','tools:2','skills:1','skills:3','skills:4']),
  leader:new Set(['verstehen:1','verstehen:2','verstehen:3','verstehen:4','verstehen:5','verstehen:6',
    'bewerten:1','bewerten:2','bewerten:3','bewerten:4','bewerten:5','bewerten:6',
    'anwenden:1','anwenden:2','anwenden:3','anwenden:4','anwenden:5','anwenden:6',
    'tools:3','tools:4','skills:5','skills:6']),
};

// ── Data ─────────────────────────────────────────────────────
// Angles:
//   A: Verstehen -90→-18 (72°) + Bewerten -18→54 (72°)  = 144°
//   B: Anwenden   54→126 (72°) + Tools1-2 126→150 (24°) = 96°
//   C: Tools3-4  150→174 (24°) + Skills  174→270 (96°)  = 120°
//   Total = 360°

const CATS=[
  {id:'verstehen',name:'Verstehen',zone:'A',col:'#0c3060',colL:'#1a4a80',a1:-90,sw:72,
   subs:[
    {n:1,id:'A1',klasse:'Klasse 1',
     t:'Was ist KI? Definitionen, Arten',
     d:'KI bezeichnet Systeme, die Aufgaben ausführen, die bisher menschliche Intelligenz erforderten. Heute existiert ausschließlich schwache KI (ANI).',
     pts:['Definition allgemein kennen','3 Definitionen kennen: technisch, praktisch, strategisch','4 KI-Typen unterscheiden: ANI, AGI, ASI, Generative KI','KI-Typen in eigenen Alltagsprodukten identifizieren']},
    {n:2,id:'A2',klasse:'Klasse 1',
     t:'Geschichte der KI',
     d:'Der Weg der KI – von den Anfängen bis heute, eingebettet in Hype-Zyklen und Durchbrüche.',
     pts:['Geschichte der KI als Hype-Zyklen einordnen','Entwicklung von den 1950er Jahren bis heute verstehen']},
    {n:3,id:'A3',klasse:'Klasse 1',
     t:'Wie lernt eine KI? Machine Learning',
     d:'Machine Learning ist Optimierung: Ein Modell macht Vorhersagen, berechnet den Fehler und passt seine Parameter iterativ an.',
     pts:['4-Schritte-Lernzyklus erklären: Daten → Vorhersage → Fehler → Anpassung','Supervised, Unsupervised, Reinforcement & Self-Supervised Learning unterscheiden','Unterschied zwischen klassischem ML und Deep Learning verstehen','Overfitting und Underfitting erkennen und erklären','Hands-on: Teachable Machine selbst ausprobieren']},
    {n:4,id:'A4',klasse:'Klasse 1',
     t:'Deep Learning, neuronale Netze & LLMs',
     d:'Millionen gewichteter mathematischer Funktionen in Schichten verarbeiten Eingaben zunehmend abstrakt. Der Transformer-Mechanismus ist das Fundament moderner Sprachmodelle.',
     pts:['Aufbau eines neuronalen Netzes erklären: Input, Hidden, Output Layer','Gewichte und Training verstehen','Transformer-Grundprinzipien beschreiben: Self-Attention, Positional Encoding','Emergente Fähigkeiten kennen und einordnen','Wichtige Architekturen benennen: Decoder, Encoder, ViT, Diffusion, Multimodal']},
    {n:5,id:'A5',klasse:'Klasse 1',
     t:'Die wichtigsten KI-Schlagwörter',
     d:'30+ operativ definierte Kernbegriffe – von Token, Prompt und Halluzination bis zu RAG, RLHF und Alignment.',
     pts:['Textverarbeitung: Token, Context Window, Prompt, System Prompt, Embedding','Modellverhalten: Halluzination, Temperature, Top-P, Sampling, Refusal','Training: Pretraining, Fine-Tuning, RLHF, Constitutional AI, RAG','Sicherheit & Ethik: Alignment, Bias, Jailbreak, Prompt Injection','Produktsysteme: API, Inference, Agent, Tool Use, Multimodal']},
    {n:6,id:'A6',klasse:'Klasse 1',
     t:'KI-Mythen vs. Realität',
     d:'KI versteht nicht, fühlt nicht und ersetzt keine Jobs vollständig – unterschätzt wird sie bei Teilaufgaben-Automatisierung und agentic Workflows.',
     pts:['3 Überschätzungs-Mythen widerlegen: Verstehen, Gefühle, Jobersatz','3 Unterschätzungs-Realitäten benennen: Aufgabenstärke, Promptqualität, Agenten','5-Fragen-Framework für kalibriertes KI-Denken anwenden','Incentives hinter KI-Behauptungen erkennen','Typische Anfängerfehler im Umgang mit KI kennen und vermeiden']},
   ]},
  {id:'bewerten',name:'Bewerten',zone:'A',col:'#2a7faa',colL:'#3a96c2',a1:-18,sw:72,
   subs:[
    {n:1,id:'B1',klasse:'Klasse 1',
     t:'EU AI Act: Überblick & Risikoklassen',
     d:'Das erste verbindliche KI-Gesetz weltweit klassifiziert KI-Systeme nach Risikoklassen und definiert Pflichten für Anbieter und Betreiber.',
     pts:['4 Risikoklassen des EU AI Act kennen und Beispiele zuordnen','Verbotene KI-Anwendungen erkennen','Pflichten für Hochrisiko-KI-Systeme benennen','Eigene Unternehmens-KI-Tools einordnen','Zeitplan und Inkrafttreten der Regelungen kennen','Konsequenzen bei Verstößen einschätzen']},
    {n:2,id:'B2',klasse:'Klasse 1',
     t:'DSGVO & KI: Was darf ich eingeben?',
     d:'Personenbezogene Daten dürfen ohne Rechtsgrundlage nicht in externe KI-Systeme eingegeben werden.',
     pts:['Personenbezogene Daten sicher definieren','Kritische Datenkategorien erkennen: Gesundheit, biometrische Daten etc.','Grundsätze kennen: Datensparsamkeit, Zweckbindung, Speicherbegrenzung','Rechtsgrundlagen benennen: Einwilligung, berechtigtes Interesse','Betroffenenrechte einordnen: Auskunft, Widerspruch, Löschung']},
    {n:3,id:'B3',klasse:'Klasse 1',
     t:'Urheberrecht & KI-generierte Inhalte',
     d:'KI-generierte Werke genießen keinen automatischen Urheberrechtsschutz. Inputs können Drittrechte verletzen.',
     pts:['Verstehen, warum KI-Outputs kein eigenes Urheberrecht genießen','Risiken beim Input erkennen: geschützte Texte, Bilder, Code','Einordnen, wann KI-Output als eigenes Werk gelten kann','Lizenzmodelle für KI-Training und Output einordnen','Praktische Regeln für sicheren Umgang im Unternehmen kennen']},
    {n:4,id:'B4',klasse:'Klasse 1',
     t:'Ethik & faire Algorithmen',
     d:'Trainingsdaten spiegeln historische Ungleichheiten wider – KI kann diese reproduzieren und verstärken.',
     pts:['Verstehen, wie Bias in KI-Systeme gelangt','Bias-Arten unterscheiden: Auswahl-Bias, Bestätigungs-Bias, historischer Bias','Beispiele für KI-Diskriminierung einordnen','Maßnahmen für fairere KI benennen: Audit, diverse Teams, Datenprüfung','Eigene ethische Haltung zum KI-Einsatz formulieren']},
    {n:5,id:'B5',klasse:'Klasse 3',
     t:'Haftung & Compliance beim KI-Einsatz',
     d:'Wer KI-Outputs ohne Prüfung weiterverwendet, trägt das Haftungsrisiko.',
     pts:['Verstehen, dass KI-Output keine rechtsverbindliche Auskunft ersetzt','Haftungskette kennen: Anbieter, Betreiber, Nutzer','Grundregeln für KI-Richtlinien benennen','Kritische Outputs menschlich prüfen','Compliance-Anforderungen für den eigenen Berufskontext ableiten','Dokumentationspflichten kennen']},
    {n:6,id:'B6',klasse:'Klasse 1',
     t:'KI-Bewertung & Qualitätssicherung',
     d:'Bewertung von KI-Systemen nach Qualität, Zuverlässigkeit und Eignung für den konkreten Anwendungsfall.',
     pts:['Kriterien zur KI-Systembewertung kennen','Qualitätsmerkmale wie Genauigkeit, Robustheit und Fairness einordnen','Evaluierungsmethoden verstehen: Benchmarks, Human Evaluation','Grenzen und Schwächen eines KI-Systems einschätzen','Eignung für Anwendungsfall kritisch prüfen']},
   ]},
  {id:'anwenden',name:'Anwenden',zone:'B',col:'#4a8800',colL:'#5da800',a1:54,sw:72,
   subs:[
    {n:1,id:'C1',klasse:'Klasse 2',
     t:'Was ist ein Prompt? Grundprinzipien',
     d:'Ein Prompt ist die Eingabe an ein KI-Modell – von der einfachen Frage bis zur präzisen Arbeitsanweisung. Qualität des Outputs = Qualität des Inputs.',
     pts:['Prompt definieren und abgrenzen','Prompt als Arbeitsanweisung verstehen, nicht als Suchanfrage','3 Grundprinzipien kennen: Klarheit, Kontext, Ziel','Zusammenhang zwischen Promptqualität und Outputqualität einschätzen','Anfängerfehler benennen und vermeiden']},
    {n:2,id:'C2',klasse:'Klasse 2',
     t:'Prompt-Aufbau: RKTF-Methode',
     d:'RKTF steht für Rolle + Kontext + Task + Format – ein strukturierter Rahmen für reproduzierbar gute Prompts.',
     pts:['4 RKTF-Elemente kennen und erklären','Rolle: Persona-Zuweisung nutzen','Kontext: Hintergrundinformationen liefern','Task: Aufgaben präzise formulieren','Format: Ausgabeformate steuern: Liste, Tabelle, JSON','Eigene Prompts nach RKTF strukturieren']},
    {n:3,id:'C3',klasse:'Klasse 2',
     t:'Gute vs. schlechte Prompts & Few-Shot',
     d:'Derselbe Inhalt, unterschiedlich formuliert – der Unterschied im Output kann enorm sein. Beispiele im Prompt führen das Modell zuverlässiger ans Ziel.',
     pts:['Schlechte Prompts analysieren und verbessern','Zero-Shot, One-Shot und Few-Shot unterscheiden','Few-Shot Prompting gezielt einsetzen','Geeignete Beispiele auswählen: repräsentativ, konsistent, klar strukturiert','Iterativen Prozess verstehen: Prompt → Output → Verbesserung']},
    {n:4,id:'C4',klasse:'Klasse 2',
     t:'Chain-of-Thought: Schrittweise Analyse',
     d:'KI denkt besser, wenn sie laut denkt. Chain-of-Thought zwingt das Modell, Zwischenschritte sichtbar zu machen.',
     pts:['Verstehen, warum CoT komplexe Aufgaben verbessert','Standard-Prompt und CoT-Prompt unterscheiden','CoT durch Formulierungen aktivieren: „Denk Schritt für Schritt"','Geeignete Aufgaben kennen: Analyse, Entscheidungen, Logik','Zero-Shot CoT und Few-Shot CoT unterscheiden']},
    {n:5,id:'C5',klasse:'Klasse 2',
     t:'Halluzinationen erkennen & Fakten prüfen',
     d:'KI lügt nicht – aber erfindet. Das Modell maximiert Plausibilität, nicht Wahrheit.',
     pts:['Verstehen, warum Halluzinationen entstehen','Typische Muster erkennen: Zitate, Zahlen, URLs, Personennamen','Warnsignale erkennen: übertriebene Sicherheit, fehlende Quellen','Verifikationsstrategien anwenden: Gegenfragen, Quellenabgleich, zweiter KI-Lauf','Eigene Prüfregel entwickeln']},
    {n:6,id:'C6',klasse:'Klasse 2',
     t:'Systemanweisungen & Persona-Prompts',
     d:'System-Prompts sind unsichtbare Regisseure – sie bestimmen Ton, Rolle und Grenzen des Modells, bevor der Nutzer überhaupt spricht.',
     pts:['Unterschied zwischen System Prompt und User Prompt erklären','Vorkonfiguration durch System-Prompts verstehen','Eigene Systemanweisungen formulieren','Persona-Prompts gezielt einsetzen: Experten-Rolle, Zielgruppe, Tonalität','System-Prompt für konkreten Unternehmensfall bauen']},
   ]},
  // Tools 1+2 → Zone B
  {id:'tools',name:'Tools',zone:'B',col:'#c85000',colL:'#e06018',a1:126,sw:24,
   subs:[
    {n:1,id:'D1',klasse:'Klasse 2',
     t:'KI-Programme im Allgemeinen',
     d:'KI-Programme sind Anwendungen, die mithilfe KI bestimmte Medien, Inhalte oder Arbeitsergebnisse erzeugen, bearbeiten oder analysieren.',
     pts:['Grundtypen von KI-Tools unterscheiden','Text-, Bild-, Video-, Audio- und Präsentations-KI einordnen','Verstehen, welche Eingaben ein Tool benötigt','Typische Ausgabeformate kennen: Text, Bild, Video, Audio, Code','Passendes Tool für einen Arbeitsauftrag auswählen','Grenzen erkennen: Qualität, Datenschutz, Urheberrecht, Kosten']},
    {n:2,id:'D2',klasse:'Klasse 2',
     t:'Medienkompetenz & Desinformation',
     d:'Medienkompetenz im KI-Kontext bedeutet, digitale Inhalte kritisch zu prüfen und KI-generierte Inhalte wie Fake News oder Deepfakes zu erkennen.',
     pts:['KI-generierte Inhalte kritisch einordnen','Fake News, Deepfakes und manipulierte Bilder erkennen','Quellen prüfen und Vertrauenswürdigkeit bewerten','Warnsignale für Desinformation benennen','Faktencheck-Methoden anwenden','Verantwortungsvollen Umgang mit KI-generierten Medien entwickeln']},
   ]},
  // Tools 3+4 → Zone C
  {id:'tools',name:'Tools',zone:'C',col:'#c85000',colL:'#e06018',a1:150,sw:24,
   subs:[
    {n:3,id:'D3',klasse:'Klasse 3',
     t:'Spezialisierung Bild, Video & Ton',
     d:'Spezialisierte KI-Tools für Bild-, Video- und Audioinhalte – Workflows, Qualitätsbewertung und rechtliche Grenzen.',
     pts:['Bild-KI wie Midjourney, DALL·E, Adobe Firefly einordnen','Video-KI und Text-zu-Video-Anwendungen verstehen','Audio-KI für Stimme, Musik, Transkription kennen','Prompts für Bild, Video und Ton gezielt formulieren','Stil, Qualität, Konsistenz und Nachbearbeitung bewerten','Einsatzgrenzen kennen: Urheberrecht, Deepfakes, Markenrechte']},
    {n:4,id:'D4',klasse:'Klasse 3',
     t:'Weitere KI-Tools',
     d:'Ergänzende und spezialisierte KI-Anwendungen für verschiedene Arbeitsbereiche und Anwendungsfälle.',
     pts:['Zusätzliche KI-Tools nach Bedarf einordnen','Zielgruppenspezifische Tools auswählen','Praxisbeispiele aus verschiedenen Arbeitsbereichen','Transferaufgaben für den eigenen Kontext entwickeln','Neue KI-Entwicklungen laufend aufnehmen']},
   ]},
  // Skills 6 → Zone C
  {id:'skills',name:'Skills',zone:'C',col:'#a07a00',colL:'#c09500',a1:174,sw:96,
   subs:[
    {n:1,id:'E1',klasse:'Klasse 1',
     t:'KI im Schulalltag',
     d:'KI kann im Schulalltag beim Verstehen, Üben, Strukturieren und Wiederholen von Lerninhalten unterstützen.',
     pts:['KI als Unterstützung beim Lernen verstehen','Lerninhalte erklären, vereinfachen und zusammenfassen lassen','Übungsaufgaben und Beispiele generieren','Eigene Antworten überprüfen und verbessern','Grenzen kennen: Abschreiben, falsche Informationen','Verantwortungsvolle Nutzung im Schulkontext reflektieren']},
    {n:2,id:'E2',klasse:'Klasse 1',
     t:'Lernhilfe & Prüfungsvorbereitung',
     d:'KI kann bei der Prüfungsvorbereitung helfen: Lernpläne erstellen, Wissen abfragen, schwierige Inhalte erklären.',
     pts:['Lernplan mit KI erstellen','Karteikarten, Quizfragen und Übungsaufgaben generieren','Komplexe Themen in einfacher Sprache erklären lassen','Prüfungsfragen simulieren','Eigene Wissenslücken erkennen','KI-Ergebnisse mit Unterrichtsmaterialien abgleichen']},
    {n:3,id:'E3',klasse:'Klasse 2',
     t:'KI in der Immobilienwelt',
     d:'KI kann in der Immobilienwirtschaft Prozesse unterstützen: Exposés, Kundenkommunikation, Dokumentenanalyse und Verwaltung.',
     pts:['Typische Einsatzfelder in der Immobilienwirtschaft kennen','Exposés und Kundentexte mit KI vorbereiten','Dokumente zusammenfassen und Informationen extrahieren','Kundenkommunikation effizienter gestalten','Chancen und Risiken im Arbeitsalltag bewerten','Datenschutz bei Immobiliendaten beachten']},
    {n:4,id:'E4',klasse:'Klasse 2',
     t:'Weiteres Angebot',
     d:'Ergänzende KI-Anwendungen und Vertiefungsangebote, die je nach Zielgruppe oder Lernbedarf flexibel ergänzt werden können.',
     pts:['Zusätzliche KI-Themen nach Bedarf einordnen','Zielgruppenspezifische Lernangebote auswählen','Praxisbeispiele aus verschiedenen Arbeitsbereichen','Transferaufgaben für den eigenen Kontext entwickeln','Lernpfade individuell erweitern','Neue KI-Entwicklungen aufnehmen']},
    {n:5,id:'E5',klasse:'Klasse 3',
     t:'KI-Strategie & Führung',
     d:'KI-Strategie und Führung: den Einsatz von KI nicht nur operativ, sondern strategisch planen – Ziele, Verantwortlichkeiten und Risiken.',
     pts:['Strategische Ziele für KI-Einsatz formulieren','Führungskräfte-Rolle beim KI-Einsatz verstehen','Potenziale und Risiken für Teams bewerten','KI-Kompetenzen im Team aufbauen','Leitlinien für verantwortungsvolle Nutzung entwickeln','Entscheidungen zu Tools, Prozessen und Zuständigkeiten treffen']},
    {n:6,id:'E6',klasse:'Klasse 3',
     t:'KI-Strategie, Change & Risikomanagement',
     d:'KI im Unternehmen erfordert Veränderungsmanagement, Risikobewertung, klare Governance und die Einbindung der Mitarbeitenden.',
     pts:['KI-Einsatz im Unternehmen systematisch planen','Change-Prozesse begleiten und Akzeptanz fördern','Risiken identifizieren: Datenschutz, Compliance, Qualität','Governance-Strukturen und Verantwortlichkeiten definieren','KI-Richtlinien und Freigabeprozesse entwickeln','Erfolgskriterien und Kontrollmechanismen festlegen']},
   ]},
];

const ZONE_CFG={
  A:{col:'#1a5080',a1:-90,a2:54},
  B:{col:'#3a6010',a1:54, a2:150},
  C:{col:'#806000',a1:150,a2:270},
};

// ── CRITICAL: Label definitions with CORRECT angles ──────────
// Each label is placed on an arc at LABEL_R (just outside OUTER_R)
// The textPath arc must span exactly the category's angular range
// Tools: combined 126→174 (48°) so the word sits centered over both halves
const LABEL_DEFS=[
  {id:'verstehen',name:'Verstehen',a1:-90,sw:72},
  {id:'bewerten', name:'Bewerten', a1:-18,sw:72},
  {id:'anwenden', name:'Anwenden', a1:54, sw:72},
  {id:'tools',    name:'Tools',    a1:126,sw:48},   // spans B+C tools portions
  {id:'skills',   name:'Skills',   a1:174,sw:96},
];

// ── SVG helpers ───────────────────────────────────────────────
function mk(tag,a={}){
  const e=document.createElementNS(NS,tag);
  for(const[k,v]of Object.entries(a))e.setAttribute(k,v);
  return e;
}
function polar(r,deg){
  const rad=(deg-90)*Math.PI/180;
  return[CX+r*Math.cos(rad),CY+r*Math.sin(rad)];
}
function arcD(iR,oR,a1,a2){
  const[ox1,oy1]=polar(oR,a1),[ox2,oy2]=polar(oR,a2);
  const[ix1,iy1]=polar(iR,a2),[ix2,iy2]=polar(iR,a1);
  const lg=(a2-a1)>180?1:0;
  return `M${ox1},${oy1} A${oR},${oR} 0 ${lg} 1 ${ox2},${oy2} L${ix1},${iy1} A${iR},${iR} 0 ${lg} 0 ${ix2},${iy2} Z`;
}
// Open arc path for textPath / sweep — from a1 to a2
function openArcD(r,a1,a2){
  const[x1,y1]=polar(r,a1),[x2,y2]=polar(r,a2);
  const lg=(a2-a1)>180?1:0;
  return `M${x1},${y1} A${r},${r} 0 ${lg} 1 ${x2},${y2}`;
}
// Reversed arc (a2→a1) used for bottom-half labels so text reads left-to-right
function openArcDRev(r,a1,a2){
  const[x1,y1]=polar(r,a2),[x2,y2]=polar(r,a1);
  const lg=(a2-a1)>180?1:0;
  return `M${x1},${y1} A${r},${r} 0 ${lg} 0 ${x2},${y2}`;
}

const sg=document.getElementById('sg');
const tpg=document.getElementById('tpg');
const zg=document.getElementById('zg');
const pg=document.getElementById('pg');
const swg=document.getElementById('swg');
let sweepState={};

// ── Build wheel ───────────────────────────────────────────────
function build(){
  sg.innerHTML='';tpg.innerHTML='';zg.innerHTML='';swg.innerHTML='';
  let tpid=0;

  // ── Segments ──
  CATS.forEach(cat=>{
    const nSeg=cat.subs.length,segSw=cat.sw/nSeg;
    cat.subs.forEach((sub,si)=>{
      const a1=cat.a1+si*segSw,a2=a1+segSw,mid=(a1+a2)/2;
      const shade=si%2===0?cat.col:cat.colL;
      const path=mk('path',{
        d:arcD(INNER_R+2,OUTER_R,a1,a2),fill:shade,
        stroke:'rgba(7,16,31,.65)','stroke-width':'1.2',
        class:'seg','data-cat':cat.id,'data-zone':cat.zone,
        'data-n':sub.n,'data-key':cat.id+':'+sub.n,
        'data-col':cat.colL,'data-name':cat.name,
        'data-title':sub.t,'data-desc':sub.d,
      });
      path.addEventListener('mouseenter',e=>onSegEnter(e,path,cat,sub));
      path.addEventListener('mousemove',e=>onSegMove(e));
      path.addEventListener('mouseleave',onSegLeave);
      path.addEventListener('click',()=>openDetailCat(cat.id));
      sg.appendChild(path);

      const[nx,ny]=polar(OUTER_R-17,mid);
      // Always rotate number to read from outside (perpendicular to radius, always upright)
      const rb=mid-90;
      // For left half of wheel (mid 90-270°), flip 180° so text doesn't appear upside-down
      const rot=(rb>90&&rb<270)?rb+180:rb;
      const sn=mk('text',{x:nx,y:ny,class:'snum',
        'data-cat':cat.id,'data-zone':cat.zone,'data-n':sub.n,
        'text-anchor':'middle','dominant-baseline':'central',
        transform:`rotate(${rot},${nx},${ny})`});
      sn.textContent=sub.n;
      sg.appendChild(sn);
    });
    [cat.a1,cat.a1+cat.sw].forEach(ang=>{
      const[x1,y1]=polar(INNER_R+2,ang),[x2,y2]=polar(OUTER_R,ang);
      sg.appendChild(mk('line',{x1,y1,x2,y2,stroke:'rgba(7,16,31,.85)','stroke-width':'2.2'}));
    });
  });

  // ── Curved outer labels ──────────────────────────────────────
  // Key fix: for each label, determine if it is in the bottom half.
  // "Bottom half" means the midpoint angle (0=top, clockwise) is between 90° and 270°.
  // For bottom half: reverse the arc so text flows left-to-right (not upside-down).
  // We also push the label radius slightly further out so it doesn't collide with outer ring.

  const LR = LABEL_R + 4; // 278 — just outside the outer ring at 258

  LABEL_DEFS.forEach(ld=>{
    const catMid = ld.a1 + ld.sw/2;
    // Normalise to 0-360
    const midNorm = ((catMid % 360) + 360) % 360;
    // Bottom half = 90 < midNorm < 270
    const isBottom = midNorm > 90 && midNorm < 270;

    const pid='tp'+(tpid++);

    // For bottom labels, draw arc reversed so textPath baseline faces outward
    const pd = isBottom
      ? openArcDRev(LR, ld.a1, ld.a1+ld.sw)
      : openArcD(LR, ld.a1, ld.a1+ld.sw);

    tpg.appendChild(mk('path',{id:pid,d:pd,fill:'none',stroke:'none'}));

    const txt=mk('text',{class:'olabel','data-labelid':ld.id});
    const ts=mk('textPath',{href:'#'+pid,startOffset:'50%','text-anchor':'middle'});
    ts.textContent=ld.name.toUpperCase();
    txt.appendChild(ts);
    tpg.appendChild(txt);

    // Hit area
    const hit=mk('path',{
      d:arcD(LR-16,LR+16,ld.a1,ld.a1+ld.sw),
      fill:'transparent',stroke:'none',cursor:'pointer','data-labelid':ld.id});
    tpg.appendChild(hit);

    [txt,hit].forEach(el=>{
      el.addEventListener('mouseenter',()=>{txt.classList.add('zone-bold');hlLabel(ld.id)});
      el.addEventListener('mouseleave',()=>{txt.classList.remove('zone-bold');clearHL()});
      el.addEventListener('click',()=>openDetailCat(ld.id));
    });

    // Small tick from outer ring to label
    const[t1x,t1y]=polar(OUTER_R+3,catMid),[t2x,t2y]=polar(LR-6,catMid);
    const catEntry=CATS.find(c=>c.id===ld.id)||CATS.find(c=>c.id==='tools');
    tpg.appendChild(mk('line',{x1:t1x,y1:t1y,x2:t2x,y2:t2y,
      stroke:catEntry.colL,'stroke-width':'1',opacity:'.4','data-labelid':ld.id}));
  });

  // ── Zone A/B/C inner arcs ──
  Object.entries(ZONE_CFG).forEach(([zid,zone])=>{
    const{a1,a2}=zone,mid=(a1+a2)/2;
    const[zx,zy]=polar((INNER_R+ZONE_R)*.5,mid);
    const g=mk('g',{class:'zbtn','data-zone':zid});
    g.appendChild(mk('path',{d:arcD(INNER_R+2,ZONE_R,a1,a2),fill:zone.col,
      stroke:'rgba(7,16,31,.7)','stroke-width':'1.5',class:'zfill'}));
    g.appendChild(mk('circle',{cx:zx,cy:zy,r:'17',fill:zone.col,
      stroke:'rgba(255,255,255,.22)','stroke-width':'1.3',filter:'url(#cglow2)'}));
    const letter=mk('text',{x:zx,y:zy,class:'zletter'});
    letter.textContent=zid;
    g.appendChild(letter);
    zg.appendChild(g);

    // Sweep arc on outer border
    const sweepPath=mk('path',{
      d:openArcD(OUTER_R+2,a1,a2),
      fill:'none',stroke:'rgba(255,255,255,0)','stroke-width':'4',
      'stroke-linecap':'round',class:'sweep-arc','data-zone':zid,
      filter:'url(#sweepF)'});
    swg.appendChild(sweepPath);

    g.addEventListener('mouseenter',()=>{hlZone(zid);startSweep(zid,a1,a2)});
    g.addEventListener('mouseleave',()=>{clearHL();stopSweep(zid)});
    g.addEventListener('click',()=>openZoneInfo(zid));
  });
}

// ── Bouncing sweep ────────────────────────────────────────────
function startSweep(zid,a1,a2){
  if(sweepState[zid]?.running)return;
  const arcEl=swg.querySelector(`.sweep-arc[data-zone="${zid}"]`);
  if(!arcEl)return;
  const totalLen=arcEl.getTotalLength();
  const shimW=totalLen*0.2;
  let pos=0,dir=1;
  sweepState[zid]={running:true,raf:null};
  function frame(){
    if(!sweepState[zid]?.running)return;
    pos+=dir*5;
    if(pos>=totalLen){pos=totalLen;dir=-1;}
    if(pos<=0){pos=0;dir=1;}
    const before=Math.max(0,pos-shimW/2);
    arcEl.style.stroke='rgba(255,255,255,.95)';
    arcEl.style.strokeDasharray=`${shimW} ${totalLen+shimW}`;
    arcEl.style.strokeDashoffset=-before;
    arcEl.style.filter='drop-shadow(0 0 5px rgba(200,230,255,.9)) drop-shadow(0 0 12px rgba(120,190,255,.7)) drop-shadow(0 0 20px rgba(80,160,255,.5))';
    sweepState[zid].raf=requestAnimationFrame(frame);
  }
  sweepState[zid].raf=requestAnimationFrame(frame);
}
function stopSweep(zid){
  if(sweepState[zid]){sweepState[zid].running=false;cancelAnimationFrame(sweepState[zid].raf);delete sweepState[zid];}
  const arcEl=swg.querySelector(`.sweep-arc[data-zone="${zid}"]`);
  if(arcEl){arcEl.style.stroke='rgba(255,255,255,0)';arcEl.style.strokeDasharray='';arcEl.style.strokeDashoffset='0';arcEl.style.filter='';}
}

// ── Highlight ────────────────────────────────────────────────
function hlZone(zid){
  document.querySelectorAll('.seg').forEach(p=>{
    const inZ=p.dataset.zone===zid;
    p.classList.toggle('zone-hi',inZ);p.classList.toggle('dim',!inZ);
  });
  document.querySelectorAll('.snum').forEach(n=>n.classList.toggle('dim',n.dataset.zone!==zid));
  document.querySelectorAll('[data-labelid]').forEach(e=>{
    if(!e.dataset.labelid)return;
    const lid=e.dataset.labelid;
    // zone A → verstehen+bewerten, B → anwenden+tools, C → tools+skills
    const zoneLabels={A:['verstehen','bewerten'],B:['anwenden','tools'],C:['tools','skills']};
    const inZ=zoneLabels[zid].includes(lid);
    e.classList.toggle('dim',!inZ);
    if(e.classList.contains('olabel'))e.classList.toggle('zone-bold',inZ);
  });
}
function hlLabel(labelId){
  document.querySelectorAll('.seg').forEach(p=>{
    const m=p.dataset.cat===labelId;
    p.classList.toggle('zone-hi',m);p.classList.toggle('dim',!m);
  });
  document.querySelectorAll('.snum').forEach(n=>n.classList.toggle('dim',n.dataset.cat!==labelId));
}
function hlPersona(key){
  const segs=PERSONA_SEGS[key];
  document.querySelectorAll('.seg').forEach(p=>{
    const inP=segs.has(p.dataset.key);
    p.classList.toggle('hi',inP);p.classList.toggle('dim',!inP);p.classList.remove('zone-hi');
  });
  document.querySelectorAll('.snum').forEach(n=>
    n.classList.toggle('dim',!segs.has(n.dataset.cat+':'+n.dataset.n)));
}
function clearHL(){
  document.querySelectorAll('.seg').forEach(p=>p.classList.remove('hi','dim','zone-hi'));
  document.querySelectorAll('.snum').forEach(n=>n.classList.remove('dim'));
  document.querySelectorAll('[data-labelid]').forEach(e=>e.classList.remove('dim','zone-bold'));
  if(activePersona)hlPersona(activePersona);
}

// ── Segment hover ─────────────────────────────────────────────
const slb=document.getElementById('slb');
let slbOn=false;
function onSegEnter(e,path,cat,sub){
  path.classList.add('seg-hover');
  document.getElementById('slb-cat').textContent=cat.zone+' · '+cat.name;
  document.getElementById('slb-title').textContent=sub.t;
  document.getElementById('slb-desc').textContent=sub.d;
  document.getElementById('slb-bar').style.background=cat.colL;
  slb.classList.add('show');slbOn=true;onSegMove(e);
}
function onSegMove(e){
  if(!slbOn)return;
  const x=e.clientX+20,y=e.clientY-20;
  slb.style.left=(x+slb.offsetWidth>window.innerWidth?e.clientX-slb.offsetWidth-16:x)+'px';
  slb.style.top=(y+slb.offsetHeight>window.innerHeight?e.clientY-slb.offsetHeight:y)+'px';
}
function onSegLeave(){
  document.querySelectorAll('.seg.seg-hover').forEach(p=>p.classList.remove('seg-hover'));
  slb.classList.remove('show');slbOn=false;
}

// ── Zone A/B/C info overlay ──────────────────────────────────
const ZONE_INFO={
  A:{
    badge:'A', col:'#1a5080',
    title:'Grundlagen-Zertifikat',
    sub:'Lernbereich A · Verstehen & Bewerten',
    desc:'Das Grundlagen-Zertifikat vermittelt das essentielle Fundament für den kompetenten Umgang mit KI. Du lernst, wie KI funktioniert, welche Begriffe und Konzepte relevant sind und wie du KI-Systeme kritisch bewerten und rechtlich einordnen kannst. Dieses Zertifikat ist der Einstieg in den KI-Führerschein und für alle Lernenden geeignet.',
  },
  B:{
    badge:'B', col:'#3a6010',
    title:'Erweiterungs-Zertifikat',
    sub:'Lernbereich B · Anwenden & Tools',
    desc:'Das Erweiterungs-Zertifikat baut auf den Grundlagen auf und befähigt dich, KI aktiv in deinem Arbeitsalltag einzusetzen. Du erlernst professionelles Prompting, Chain-of-Thought-Methoden, den Umgang mit Halluzinationen sowie erste spezialisierte KI-Tools. Ideal für alle, die KI nicht nur verstehen, sondern produktiv nutzen wollen.',
  },
  C:{
    badge:'C', col:'#806000',
    title:'Spezialisierungs-Zertifikat',
    sub:'Lernbereich C · Tools & Skills',
    desc:'Das Spezialisierungs-Zertifikat richtet sich an Fortgeschrittene, die KI strategisch einsetzen und tiefgehende Kompetenzen entwickeln möchten. Von spezialisierten KI-Tools über Bild-, Video- und Audiogenerierung bis hin zu KI-Strategie, Change Management und Führungskompetenz im KI-Zeitalter – dieses Zertifikat bereitet auf die KI-Transformation vor.',
  },
};

function openZoneInfo(zid){
  const d=ZONE_INFO[zid];
  const badge=document.getElementById('zone-info-badge');
  badge.textContent=d.badge;
  badge.style.background=d.col;
  badge.style.boxShadow=`0 0 24px ${d.col}88`;
  document.getElementById('zone-info-title').textContent=d.title;
  document.getElementById('zone-info-sub').textContent=d.sub;
  document.getElementById('zone-info-desc').textContent=d.desc;
  document.getElementById('zone-info').classList.add('show');
}
function closeZoneInfo(){
  document.getElementById('zone-info').classList.remove('show');
}
document.getElementById('zone-info').addEventListener('click',function(e){
  if(e.target===this) closeZoneInfo();
});

// ── Card hover info panel ──────────────────────────────────────
const cardInfo=document.getElementById('card-info');
let cardInfoActive=false, cardInfoTimer=null;

function showCardInfo(sub, catCol, anchorEl){
  clearTimeout(cardInfoTimer);
  document.getElementById('ci-id').textContent=sub.id||'';
  document.getElementById('ci-klasse').textContent=sub.klasse||'';
  document.getElementById('ci-title').textContent=sub.t;
  document.getElementById('ci-def').textContent=sub.d;
  const ptsList=document.getElementById('ci-pts');
  ptsList.innerHTML='';
  (sub.pts||[]).forEach(pt=>{
    const li=document.createElement('li');
    li.textContent=pt;
    ptsList.appendChild(li);
  });
  // Color the border accent
  cardInfo.style.borderColor=catCol+'88';
  cardInfo.style.boxShadow=`-6px 0 40px ${catCol}33, 0 0 0 1px ${catCol}22, inset 0 0 30px rgba(10,30,80,.15)`;
  cardInfo.classList.add('show');
  cardInfoActive=true;

  // Activate glow on anchor card
  if(anchorEl){
    anchorEl.classList.add('card-active');
  }
}
function hideCardInfo(anchorEl){
  cardInfoTimer=setTimeout(()=>{
    cardInfo.classList.remove('show');
    cardInfoActive=false;
    if(anchorEl) anchorEl.classList.remove('card-active','card-loading');
  },120);
}

// ── Detail overlay ────────────────────────────────────────────
let inDetail=false;
function openDetailCat(labelId){
  if(inDetail||!revealed)return;inDetail=true;
  const allSubs=[];let refCat=null;
  CATS.forEach(cat=>{if(cat.id===labelId){if(!refCat)refCat=cat;allSubs.push(...cat.subs);}});
  if(!refCat||!allSubs.length){inDetail=false;return;}
  const wr=document.getElementById('wrap');
  wr.style.transition='transform .65s ease,opacity .6s ease';
  wr.style.transform='scale(.1) translateY(160%)';wr.style.opacity='0';wr.style.pointerEvents='none';
  const cw=document.getElementById('cards-wrap');cw.innerHTML='';
  document.getElementById('detail-title').textContent=refCat.name.toUpperCase()+' — Lernbereich '+refCat.zone;

  allSubs.forEach((sub,i)=>{
    const card=document.createElement('div');card.className='dcard';
    card.style.animationDelay=(i*75)+'ms';
    card.innerHTML=`
      <div class="dcard-num" style="background:${refCat.col};border:1px solid ${refCat.colL}">${sub.n}</div>
      <div class="dcard-body">
        <div class="dcard-id">${sub.id||''}<span class="dcard-klasse">${sub.klasse||''}</span></div>
        <div class="dcard-title">${sub.t}</div>
        <div class="dcard-desc">${sub.d}</div>
      </div>`;

    // Card hover → show stichpunkte panel
    card.addEventListener('mouseenter',()=>{
      // Loading flash first
      card.classList.add('card-loading');
      setTimeout(()=>{
        card.classList.remove('card-loading');
        showCardInfo(sub, refCat.colL, card);
      },280);
    });
    card.addEventListener('mouseleave',()=>hideCardInfo(card));

    cw.appendChild(card);
    requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add('entering')));
  });
  document.getElementById('detail').classList.add('show');
  cardInfo.classList.remove('show');
}
function closeDetail(){
  if(!inDetail)return;inDetail=false;
  document.getElementById('detail').classList.remove('show');
  cardInfo.classList.remove('show');
  const w=document.getElementById('wrap');
  w.style.transition='transform .75s cubic-bezier(.34,1.3,.64,1),opacity .65s ease';
  w.style.transform='';w.style.opacity='';w.style.pointerEvents='';
  setTimeout(()=>w.style.transition='',800);clearHL();
}

// ── Reveal sequence ───────────────────────────────────────────
let revealed=false;
function doReveal(){
  if(revealed)return;revealed=true;

  const btnEl=document.getElementById('center-start');

  // Disable pointer events immediately
  btnEl.style.pointerEvents='none';

  // 1. Switch to loading state (ring fills up + counter)
  btnEl.classList.add('loading');

  // Animate the % counter in JS (0 → 100 over 1400ms)
  const pctEl=document.getElementById('cs-pct');
  const startTime=performance.now();
  const duration=1400;
  function tickPct(now){
    const pct=Math.min(100,Math.round((now-startTime)/duration*100));
    pctEl.textContent=pct+'%';
    if(pct<100) requestAnimationFrame(tickPct);
  }
  requestAnimationFrame(tickPct);

  // 2. After loading completes (1500ms): fade out button, build wheel
  setTimeout(()=>{
    // Fade out start button
    btnEl.style.transition='opacity .4s ease';
    btnEl.style.opacity='0';

    setTimeout(()=>{
      btnEl.style.display='none';

      // Pulse waves from center
      for(let i=0;i<3;i++) setTimeout(()=>{
        const c=mk('circle',{cx:300,cy:300,r:55,class:'pwave'});
        pg.appendChild(c);setTimeout(()=>c.remove(),1050);
      },i*160);

      // Show wheel content
      const wc=document.getElementById('wheel-content');
      wc.style.opacity='0';
      build();
      document.querySelectorAll('.seg,.snum,.olabel').forEach(e=>e.style.opacity='0');

      requestAnimationFrame(()=>{
        wc.style.transition='opacity .4s ease';
        wc.style.opacity='1';
      });

      // Stagger-reveal segments A → B → C
      const segs=[...document.querySelectorAll('.seg')];
      const nums=[...document.querySelectorAll('.snum')];
      let delay=250;
      ['A','B','C'].forEach(zid=>{
        const zSegs=segs.filter(s=>s.dataset.zone===zid);
        zSegs.forEach((s,i)=>setTimeout(()=>{
          s.classList.add('anim-in');s.style.opacity='';
          s.addEventListener('animationend',()=>s.classList.remove('anim-in'),{once:true});
        },delay+i*40));
        delay+=zSegs.length*40+110;
      });

      // Numbers + labels
      setTimeout(()=>{
        nums.forEach((n,i)=>setTimeout(()=>n.style.opacity='',i*12));
        document.querySelectorAll('.olabel').forEach((l,i)=>{
          l.style.opacity='0';
          setTimeout(()=>{l.style.transition='opacity .7s ease';l.style.opacity='';},100+i*100);
        });
        document.getElementById('persona-btn').classList.add('show');
      },800);

    },400);
  },1500);
}

// ── Persona ───────────────────────────────────────────────────
let menuOpen=false,activePersona=null;
document.getElementById('persona-btn').addEventListener('click',e=>{
  e.stopPropagation();menuOpen=!menuOpen;
  document.getElementById('persona-menu').classList.toggle('open',menuOpen);
});
document.addEventListener('click',()=>{
  menuOpen=false;document.getElementById('persona-menu').classList.remove('open');
});
function hoverPersona(key){hlPersona(key);}
function unhoverPersona(){if(activePersona)hlPersona(activePersona);else clearHL();}
function selectPersona(key){
  document.querySelectorAll('.pmenu-item').forEach(el=>el.classList.toggle('active',el.dataset.persona===key));
  activePersona=activePersona===key?null:key;
  if(activePersona)hlPersona(activePersona);else clearHL();
  menuOpen=false;document.getElementById('persona-menu').classList.remove('open');
}
