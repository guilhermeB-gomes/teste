# Portfólio — Guilherme Barros Gomes

HTML + CSS + JS puro, com GSAP e ScrollTrigger (cdnjs) e EmailJS (jsDelivr). Abra `index.html` no navegador. Precisa de internet para fontes e bibliotecas.

## Onde editar
Tudo em `js/config.js`:
- **Links**: `links.github`, `links.linkedin`, `links.email`. Vazio = oculto.
- **Projetos**: copie um objeto de `projetos`, ajuste nome, tipo (Front-end/Back-end/Full-stack), origem (Acadêmico/Pessoal), tecnologias, textos, `demo` e `codigo`. Links vazios desativam o botão. Imagens: coloque em `assets/projects/` e informe o nome em `imagem`. Os 4 projetos atuais são exemplos.
- **Habilidades**: lista `skills`.
- **Currículo**: coloque seu PDF em `docs/curriculo.pdf`.
- **Experiência e formação**: funções `tl(...)` em `js/main.js`.

## Formulário (EmailJS)
Crie conta em emailjs.com, configure serviço e template com os campos `nome`, `email`, `assunto`, `mensagem` e preencha `emailjs` em `config.js`. A Public Key é pública por design. Nunca use a Private Key no front-end. Sem as chaves, o formulário valida e avisa que não está configurado.

## Notas
Respeita `prefers-reduced-motion`. Cursor personalizado e tilt só em dispositivos com mouse.
