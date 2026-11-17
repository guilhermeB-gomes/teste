/* ==========================================================
   EDITE AQUI: datas, textos, fotos e carta.
   Fotos: coloque os arquivos em assets/images/ e troque o nome em "src".
   Se o arquivo não existir, aparece uma imagem provisória rosa.
   ========================================================== */
const CONFIG = {
  inicio: "2025-12-17",   // data em que tudo começou (AAAA-MM-DD) — troque pela real
  fotos: [
    { src: "momento-01.jpg", legenda: "O dia em que tudo mudou", h: 480 },
    { src: "momento-02.jpg", legenda: "Seu sorriso é meu lugar favorito", h: 340 },
    { src: "momento-03.jpg", legenda: "Pequenos gestos, grandes memórias", h: 420 },
    { src: "foto-principal.jpg", legenda: "Nós dois", h: 360 },
    { src: "momento-04.jpg", legenda: "Rindo de nada, feliz com tudo", h: 500 },
    { src: "momento-05.jpg", legenda: "Mais um dia ao seu lado", h: 320 }
  ],
  linhaDoTempo: [
    { data: "Dia 1", texto: "Nossos caminhos se cruzaram e nada mais foi igual." },
    { data: "Primeiro encontro", texto: "Nervosos, felizes e sem querer que a noite acabasse." },
    { data: "Primeiras vezes", texto: "Cada descoberta juntos virou um capítulo especial." },
    { data: "11 meses", texto: "Quase um ano de amor, e sempre com vontade de mais." }
  ],
  momentos: [
    { titulo: "Nosso primeiro encontro", sub: "Onde tudo começou", texto: "Escreva aqui como foi o primeiro encontro de vocês." },
    { titulo: "Primeiras lembranças", sub: "Os começos", texto: "Aquelas lembranças que a gente guarda com carinho." },
    { titulo: "Momentos engraçados", sub: "Risadas", texto: "Aquela história que sempre faz vocês rirem." },
    { titulo: "Datas comemorativas", sub: "Para celebrar", texto: "Aniversários, Dia dos Namorados e outras datas especiais." },
    { titulo: "Pequenos gestos", sub: "Carinho", texto: "Um bilhete, um abraço, um café. Os detalhes contam." },
    { titulo: "Nossos 11 meses", sub: "Juntos", texto: "Onze meses de histórias. E o melhor ainda vem aí." },
    { titulo: "Planos e sonhos", sub: "O futuro", texto: "Viagens, casa, projetos. Tudo o que vamos viver juntos." }
  ],
  carta: "Meu amor, cada lembrança ao seu lado é uma parte da história mais bonita que estamos construindo. Não importa quantos dias passem, sempre encontrarei motivos para escolher você novamente.",
  assinatura: "Com amor, Guilherme"
};

/* ---------- Utilitários ---------- */
const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const IMG = "assets/images/";
// Imagem provisória (SVG) usada se a foto ainda não existir
const placeholder = (w = 600, h = 450) =>
  "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#f6d5dc'/><stop offset='1' stop-color='#eadbc8'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='50%' fill='#8f3348' font-family='Georgia' font-style='italic' font-size='26' text-anchor='middle'>♥ Sua foto aqui</text></svg>`);
function setImg(img, file, w, h) {
  img.loading = "lazy"; img.decoding = "async";
  img.onerror = () => { img.onerror = null; img.src = placeholder(w, h); };
  img.src = IMG + file;
}
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

/* ---------- Conteúdo ---------- */
setImg($("#heroImg"), $("#heroImg").dataset.photo, 520, 650);
setImg($("#finalImg"), $("#finalImg").dataset.photo, 360, 450);
$("#heroImg").loading = "eager";

const d = new Date(CONFIG.inicio + "T00:00:00");
const meses = Math.max(0, Math.floor((Date.now() - d) / 2629800000));
$("#startLine").textContent = `Tudo começou em ${d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}. Já são ${meses} meses de nós.`;

CONFIG.linhaDoTempo.forEach(i => $("#timeline").append(el("li", "reveal", `<time>${i.data}</time><p>${i.texto}</p>`)));

CONFIG.fotos.forEach((f, idx) => {
  const b = el("button", "shot reveal");
  b.type = "button"; b.setAttribute("aria-label", "Ampliar: " + f.legenda);
  const img = el("img"); img.alt = f.legenda; img.width = 600; img.height = f.h;
  setImg(img, f.src, 600, f.h);
  b.append(img, el("span", "", f.legenda));
  b.addEventListener("click", () => openLB(idx));
  $("#masonry").append(b);
});

CONFIG.momentos.forEach(m => {
  const c = el("button", "card reveal");
  c.type = "button"; c.setAttribute("aria-pressed", "false");
  c.innerHTML = `<span class="card-in"><span class="face front"><b>${m.titulo}</b><small>${m.sub}</small></span><span class="face back">${m.texto}</span></span>`;
  c.addEventListener("click", () => c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") !== "true"));
  $("#cards").append(c);
});
$("#letterSign").textContent = CONFIG.assinatura;

/* ---------- Lightbox ---------- */
const lb = $("#lightbox"), lbImg = $("img", lb), lbCap = $("figcaption", lb);
let cur = 0, lastFocus;
function showLB(i) {
  cur = (i + CONFIG.fotos.length) % CONFIG.fotos.length;
  const f = CONFIG.fotos[cur];
  lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = placeholder(900, 700); };
  lbImg.src = IMG + f.src; lbImg.alt = f.legenda; lbCap.textContent = f.legenda;
}
function openLB(i) { lastFocus = document.activeElement; showLB(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb-close").focus(); }
function closeLB() { lb.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
$(".lb-close").onclick = closeLB;
$(".prev").onclick = () => showLB(cur - 1);
$(".next").onclick = () => showLB(cur + 1);
lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") showLB(cur - 1);
  if (e.key === "ArrowRight") showLB(cur + 1);
});

/* ---------- Carta: abre o envelope e revela palavra por palavra ---------- */
const env = $("#envelope"), letter = $("#letter");
env.addEventListener("click", () => {
  if (env.getAttribute("aria-expanded") === "true") return;
  env.setAttribute("aria-expanded", "true");
  const p = $("#letterText"); p.innerHTML = "";
  const words = CONFIG.carta.split(" ").map(w => { const s = el("span", "w", w + " "); p.append(s); return s; });
  letter.classList.add("open");
  words.forEach((w, i) => setTimeout(() => w.classList.add("on"), reduce ? 0 : 900 + i * 90));
});

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.style.transitionDelay = (e.target.dataset.d || 0) + "ms"; e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach((n, i) => { n.dataset.d = (i % 3) * 90; io.observe(n); });

/* ---------- Progresso, voltar ao topo e parallax (rAF, leve) ---------- */
const bar = $("#progress"), toTop = $("#toTop"), layers = [...document.querySelectorAll("[data-parallax]")];
let tick = false;
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  toTop.classList.toggle("show", y > 600);
  if (!reduce) layers.forEach(l => { const r = l.parentElement.getBoundingClientRect(); l.style.transform = `translate3d(0,${-r.top * l.dataset.parallax}px,0)`; });
  tick = false;
}
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
toTop.onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
onScroll();

/* ---------- Música (só toca após clique) ---------- */
const audio = $("#audio"), mb = $("#music");
mb.addEventListener("click", async () => {
  if (mb.getAttribute("aria-pressed") === "true") { audio.pause(); mb.setAttribute("aria-pressed", "false"); mb.setAttribute("aria-label", "Ativar música de fundo"); return; }
  try { await audio.play(); mb.setAttribute("aria-pressed", "true"); mb.setAttribute("aria-label", "Desativar música de fundo"); }
  catch { alert("Arquivo de música não encontrado. Adicione assets/music/musica.mp3."); }
});

/* ---------- Pétalas flutuantes (canvas) ---------- */
const cv = $("#petals"), cx = cv.getContext("2d");
function sizeCv() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", sizeCv); sizeCv();
if (!reduce) {
  const n = innerWidth < 600 ? 14 : 26;
  const petals = Array.from({ length: n }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, s: 5 + Math.random() * 7, v: .3 + Math.random() * .6, a: Math.random() * 6, c: Math.random() > .3 ? "rgba(234,180,192,.6)" : "rgba(184,146,74,.45)" }));
  (function loop() {
    if (!document.hidden) {
      cx.clearRect(0, 0, cv.width, cv.height);
      petals.forEach(p => {
        p.y += p.v; p.a += .015; p.x += Math.sin(p.a) * .6;
        if (p.y > cv.height + 20) { p.y = -20; p.x = Math.random() * cv.width; }
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = p.c;
        cx.beginPath(); cx.ellipse(0, 0, p.s, p.s / 2, 0, 0, 7); cx.fill(); cx.restore();
      });
    }
    requestAnimationFrame(loop);
  })();
}

/* ---------- Cursor: brilhos discretos (só mouse) ---------- */
let lastSpark = 0;
if (!reduce) addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse" || Date.now() - lastSpark < 90) return;
  lastSpark = Date.now();
  const s = el("span", "spark", "✦"); s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
  document.body.append(s); setTimeout(() => s.remove(), 900);
});

/* ---------- Loader ---------- */
addEventListener("load", () => setTimeout(() => { $("#loader").classList.add("done"); document.body.classList.remove("is-loading"); }, reduce ? 0 : 1400));
