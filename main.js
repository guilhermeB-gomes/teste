/* Portfólio — Guilherme Barros. Dados em js/config.js */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const root = document.documentElement;

/* ----- Tema ----- */
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
$("#theme").addEventListener("click", () => {
  const n = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = n;
  try { localStorage.setItem("theme", n); } catch {}
});

/* ----- Conteúdo ----- */
$("#year").textContent = new Date().getFullYear();
$("#skills-grid").innerHTML = SITE.skills.map(g => `<div class="sk glass" data-r data-tilt><h3>${g.cat}</h3><ul>${g.items.map(i => `<li>${i[0]}<em>${i[1]}</em></li>`).join("")}</ul></div>`).join("");

const tl = (id, list) => $(id).innerHTML = list.map(i => `<li class="glass" data-r><time>${i.t}</time><h3>${i.h}</h3><p class="muted">${i.p}</p>${i.l ? `<ul>${i.l.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}</li>`).join("");
tl("#exp", [{ t: "Estágio", h: "Prefeitura Municipal de Quadra", p: "Rotinas administrativas que desenvolveram organização, responsabilidade, comunicação e atenção aos detalhes.", l: ["Organização e gerenciamento de documentos", "Atendimento ao público", "Atualização e filtragem de dados em sistemas administrativos", "Apoio às rotinas internas e processos administrativos"] }]);
tl("#edu", [{ t: "2025 – 2026", h: "Análise e Desenvolvimento de Sistemas", p: "FATEC Tatuí. Base em programação, desenvolvimento web e bancos de dados." }]);

const L = SITE.links;
$("#links").innerHTML = [["E-mail", L.email && "mailto:" + L.email, L.email], ["LinkedIn", L.linkedin, L.linkedin], ["GitHub", L.github, L.github]]
  .map(([n, h, v]) => h ? `<a href="${esc(h)}" target="_blank" rel="noopener"><b>${n}</b><br><span class="muted">${esc(v)}</span></a>` : `<p class="off"><b>${n}</b><br><span class="muted">Adicione em js/config.js</span></p>`).join("");
$$("[data-link]").forEach(a => { const u = L[a.dataset.link]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } else a.remove(); });

/* ----- Projetos: filtros + modal ----- */
const P = SITE.projetos, filters = ["Todos", "Front-end", "Back-end", "Full-stack", "Acadêmicos", "Pessoais"];
const match = (p, f) => f === "Todos" || p.tipo === f || (f === "Acadêmicos" && p.origem === "Acadêmico") || (f === "Pessoais" && p.origem === "Pessoal");
const thumb = p => p.imagem ? `<div class="thumb"><img src="assets/projects/${esc(p.imagem)}" alt="Prévia de ${esc(p.nome)}" loading="lazy" width="400" height="150"></div>` : `<div class="thumb ph">${esc(p.tipo)}</div>`;
function renderProj(f) {
  $("#proj-grid").innerHTML = P.map((p, i) => match(p, f) ? `<button class="card" data-i="${i}" data-tilt aria-label="Ver detalhes de ${esc(p.nome)}">${thumb(p)}<div class="in"><span class="tag">${esc(p.tipo)} · ${esc(p.origem)}</span><h3>${esc(p.nome)}</h3><p class="muted">${esc(p.resumo)}</p><div class="chips">${p.tecnologias.map(t => `<span>${esc(t)}</span>`).join("")}</div></div></button>` : "").join("") || `<p class="muted">Nenhum projeto nesta categoria.</p>`;
  bindCards();
  if (hasGsap && !reduce) gsap.from("#proj-grid .card", { opacity: 0, y: 24, stagger: .07, duration: .5, clearProps: "all" });
}
$("#filters").innerHTML = filters.map((f, i) => `<button aria-pressed="${i === 0}">${f}</button>`).join("");
$("#filters").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; $$("#filters button").forEach(x => x.setAttribute("aria-pressed", x === b)); renderProj(b.textContent); });

const modal = $("#modal"); let lastF;
function openModal(i) {
  const p = P[i]; lastF = document.activeElement;
  const btn = (t, u) => `<a class="btn ${u ? "pri" : ""}" ${u ? `href="${esc(u)}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}>${t}</a>`;
  $("#m-body").innerHTML = `${thumb(p)}<span class="tag">${esc(p.tipo)} · ${esc(p.origem)}</span><h3 id="m-title">${esc(p.nome)}</h3><p>${esc(p.detalhes)}</p><div class="chips">${p.tecnologias.map(t => `<span>${esc(t)}</span>`).join("")}</div><div class="btns">${btn("Ver projeto", p.demo)}${btn("Código no GitHub", p.codigo)}</div>`;
  modal.hidden = false; document.body.style.overflow = "hidden"; $("#m-close").focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; lastF && lastF.focus(); }
$("#m-close").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); if (e.key === "Escape") closeMenu(); });

/* ----- Tilt 3D e botões magnéticos (só mouse) ----- */
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
function bindCards() {
  $$(".card").forEach(c => c.onclick = () => openModal(c.dataset.i));
  if (!fine || reduce) return;
  $$("[data-tilt]").forEach(c => {
    c.onpointermove = e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; };
    c.onpointerleave = () => c.style.transform = "";
  });
}
renderProj("Todos");
if (fine && !reduce) $$(".mag").forEach(b => {
  b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * .2}px ${(e.clientY - r.top - r.height / 2) * .3}px`; });
  b.addEventListener("pointerleave", () => b.style.translate = "");
});

/* ----- Menu mobile ----- */
const burger = $("#burger"), menu = $("#menu");
function closeMenu() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
$$("#menu a").forEach(a => a.addEventListener("click", closeMenu));

/* ----- Digitação do título ----- */
const roles = ["Desenvolvedor Web", "Desenvolvedor Front-end", "Estudante de Tecnologia", "Entusiasta de Desenvolvimento de Software"];
const typed = $("#typed");
if (reduce) typed.textContent = roles[0]; else (function type(r = 0, c = 0, del = false) {
  typed.textContent = roles[r].slice(0, c);
  if (!del && c === roles[r].length) return setTimeout(() => type(r, c, true), 1600);
  if (del && c === 0) return type((r + 1) % roles.length, 0, false);
  setTimeout(() => type(r, c + (del ? -1 : 1), del), del ? 30 : 65);
})();

/* ----- Painel de código (digitado uma vez) ----- */
const code = `const dev = {\n  nome: "Guilherme Barros",\n  curso: "ADS · FATEC Tatuí",\n  stack: ["HTML", "CSS", "JS",\n          "PHP", "Laravel", "SQL"],\n  aprendendo: true\n};\n\ndev.criar("ideias digitais");`;
const cv = $("#codeview"); if (reduce) cv.textContent = code; else { let i = 0; const t = setInterval(() => { cv.textContent = code.slice(0, ++i); if (i >= code.length) clearInterval(t); }, 35); }

/* ----- Cursor, luz do mouse, partículas ----- */
const hero = $(".hero");
if (fine && !reduce) {
  document.body.classList.add("cur");
  const dot = $("#dot"), ring = $("#ring"); let rx = 0, ry = 0, mx = 0, my = 0;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
  (function f() { rx += (mx - rx) * .15; ry += (my - ry) * .15; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(f); })();
  document.addEventListener("pointerover", e => ring.classList.toggle("big", !!e.target.closest("a,button,.card")));
  hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect(); hero.style.setProperty("--mx", e.clientX - r.left + "px"); hero.style.setProperty("--my", e.clientY - r.top + "px"); });
}
const pc = $("#parts"), px = pc.getContext("2d");
if (!reduce) {
  const sz = () => { pc.width = hero.clientWidth; pc.height = hero.clientHeight; }; sz(); addEventListener("resize", sz);
  const ps = Array.from({ length: innerWidth < 700 ? 25 : 55 }, () => ({ x: Math.random() * pc.width, y: Math.random() * pc.height, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }));
  let vis = true; new IntersectionObserver(e => vis = e[0].isIntersecting).observe(hero);
  (function d() {
    if (vis) {
      px.clearRect(0, 0, pc.width, pc.height); px.fillStyle = "rgba(120,150,255,.6)";
      ps.forEach(p => { p.x = (p.x + p.vx + pc.width) % pc.width; p.y = (p.y + p.vy + pc.height) % pc.height; px.fillRect(p.x, p.y, 1.8, 1.8); });
    }
    requestAnimationFrame(d);
  })();
}

/* ----- Progresso, FAB ----- */
const bar = $("#bar"), fab = $("#fab");
addEventListener("scroll", () => {
  const m = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`;
  fab.classList.toggle("show", scrollY > 700);
}, { passive: true });

/* ----- GSAP: preloader, reveals, parallax ----- */
function start() { document.body.classList.remove("loading"); }
if (hasGsap && !reduce) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline({ delay: 1.1, onComplete: start })
    .to("#pre", { yPercent: -100, duration: .8, ease: "power4.inOut" })
    .from(".hero-txt > *", { y: 40, opacity: 0, stagger: .1, duration: .8, ease: "power3.out" }, "-=.3")
    .from(".code", { x: 60, opacity: 0, duration: .9 }, "-=.7");
  $$("[data-r]").forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
  $$("[data-p]").forEach(el => gsap.to(el, { y: +el.dataset.p, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } }));
} else { $("#pre").remove(); start(); }
addEventListener("load", () => { if (!hasGsap) $("#pre")?.remove(); });

/* ----- Formulário ----- */
const form = $("#form"), status = $("#status");
form.addEventListener("submit", async e => {
  e.preventDefault(); let ok = true;
  $$("input,textarea", form).forEach(f => {
    const v = f.value.trim(), bad = !v || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    f.nextElementSibling.textContent = bad ? (f.type === "email" ? "Informe um e-mail válido." : "Campo obrigatório.") : ""; if (bad) ok = false;
  });
  if (!ok) { status.textContent = "Revise os campos destacados."; return; }
  const c = SITE.emailjs;
  if (!c.publicKey || !c.serviceId || !c.templateId || typeof emailjs === "undefined") { status.textContent = "Envio ainda não configurado. Preencha as chaves do EmailJS em js/config.js."; return; }
  status.textContent = "Enviando…";
  try { await emailjs.send(c.serviceId, c.templateId, Object.fromEntries(new FormData(form)), { publicKey: c.publicKey }); status.textContent = "Mensagem enviada. Obrigado!"; form.reset(); }
  catch { status.textContent = "Não foi possível enviar agora. Tente novamente mais tarde."; }
});
