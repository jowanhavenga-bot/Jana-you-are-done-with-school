const scenes = [...document.querySelectorAll(".scene")];
function showScene(id) {
  scenes.forEach(scene => scene.classList.toggle("active", scene.id === id));
}
const lilyScene = document.getElementById("lily-scene");
const catcher = document.getElementById("gesture-catcher");
let startX = 0, startY = 0, swept = false;
function beginSwipe(e) { startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0; startY = e.clientY ?? e.touches?.[0]?.clientY ?? 0; }
function finishSwipe(e) {
  if (swept) return;
  const x = e.clientX ?? e.changedTouches?.[0]?.clientX ?? startX;
  const y = e.clientY ?? e.changedTouches?.[0]?.clientY ?? startY;
  if (Math.abs(x - startX) > 55 && Math.abs(x - startX) > Math.abs(y - startY) * .8) revealPanda();
}
function revealPanda() {
  if (swept) return;
  swept = true;
  lilyScene.classList.add("swept");
  setTimeout(() => { showScene("panda-scene"); startPandaTyping(); }, 850);
}
catcher.addEventListener("pointerdown", beginSwipe);
catcher.addEventListener("pointerup", finishSwipe);
catcher.addEventListener("touchstart", beginSwipe, {passive:true});
catcher.addEventListener("touchend", finishSwipe, {passive:true});
catcher.addEventListener("click", () => { if (!swept) revealPanda(); });

const typedLine = document.getElementById("typed-line");
let typingStarted = false;
function startPandaTyping() {
  if (typingStarted) return;
  typingStarted = true;
  const message = "I've got something for you.";
  let i = 0;
  const timer = setInterval(() => {
    typedLine.textContent = message.slice(0, ++i);
    if (i >= message.length) clearInterval(timer);
  }, 72);
}
function openPandaGift() { showScene("gift-scene"); }
document.getElementById("panda-gift-hit").addEventListener("click", openPandaGift);
document.querySelector(".panda-image").addEventListener("click", openPandaGift);
document.getElementById("gift-hint").addEventListener("click", openPandaGift);
document.getElementById("open-gift").addEventListener("click", () => {
  showScene("fireworks-scene");
  startFireworks();
});

document.getElementById("next-button").addEventListener("click", () => showScene("letter-scene"));
document.getElementById("read-done").addEventListener("click", () => {
  showScene("drive-scene");
  requestAnimationFrame(() => document.getElementById("drive-scene").classList.add("arrive"));
});

// A small canvas particle system: pastel/gold shells, heart-shaped bursts and delayed secondary sparks.
const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");
let particles = [], rockets = [], animationFrame = 0, fireworkStart = 0, lastLaunch = 0, running = false;
const palette = ["#f5b9c8","#f7d0d6","#f2c1a8","#f4d58d","#ffe8b7","#c8d9e7"];
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resizeCanvas); resizeCanvas();
function launchRocket(now) {
  const x = innerWidth * (.12 + Math.random() * .76);
  rockets.push({x, y:innerHeight + 10, tx:x + (Math.random()-.5)*90, ty:innerHeight*(.13 + Math.random()*.42), speed:5+Math.random()*2, color:palette[Math.floor(Math.random()*palette.length)]});
  lastLaunch = now;
}
function burst(x,y,color,heart=false,secondary=false) {
  const count = secondary ? 22 : 70 + Math.floor(Math.random()*35);
  for(let i=0;i<count;i++){
    let angle = Math.PI*2*i/count, speed = secondary ? 1.1+Math.random()*2 : 1.4+Math.random()*3.4;
    let vx=Math.cos(angle)*speed, vy=Math.sin(angle)*speed;
    if(heart){
      const t=angle, hx=16*Math.pow(Math.sin(t),3), hy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
      vx=hx*.13; vy=hy*.13;
    }
    particles.push({x,y,vx,vy,life:secondary?38:65+Math.random()*24,max:secondary?38:90,color,gravity:.035+Math.random()*.025, size:secondary?1.4:1.7+Math.random()*1.5, secondary:!secondary && !heart && Math.random()<.2});
  }
}
function startFireworks() {
  cancelAnimationFrame(animationFrame); particles=[]; rockets=[]; fireworkStart=performance.now();lastLaunch=0;running=true; resizeCanvas(); tickFireworks(fireworkStart);
}
function tickFireworks(now) {
  if(!running) return;
  const elapsed=(now-fireworkStart)/1000;
  const duration=15;
  const intensity=elapsed<3?1.7:elapsed<10?5.2:elapsed<13?2.8:.9;
  const interval=1000/intensity;
  if(elapsed<duration && now-lastLaunch>interval) launchRocket(now);
  ctx.fillStyle="rgba(17,19,27,.22)";ctx.fillRect(0,0,innerWidth,innerHeight);
  rockets.forEach((r,i)=>{
    r.x+=(r.tx-r.x)*.025;r.y-=r.speed;
    ctx.beginPath();ctx.arc(r.x,r.y,2,0,Math.PI*2);ctx.fillStyle=r.color;ctx.fill();
    if(r.y<=r.ty){burst(r.x,r.y,r.color,Math.random()<.16);rockets.splice(i,1);}
  });
  particles.forEach((p,i)=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.gravity;p.vx*=.986;p.vy*=.986;p.life--;
    ctx.globalAlpha=Math.max(0,p.life/p.max);
    ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle=p.color;ctx.fill();
    if(p.life<=0){if(p.secondary)burst(p.x,p.y,p.color,false,true);particles.splice(i,1);}
  });
  ctx.globalAlpha=1;
  if(elapsed>duration && particles.length===0 && rockets.length===0){running=false;return;}
  animationFrame=requestAnimationFrame(tickFireworks);
}
