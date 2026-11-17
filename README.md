# Álbum Romântico — Guilherme & Julya
Abra `index.html` no navegador, ou publique a pasta em qualquer hospedagem estática.
Como personalizar
Tudo fica no topo de `js/script.js`, no objeto `CONFIG`:
Data de início: `inicio` (AAAA-MM-DD). Os meses são calculados sozinhos.
Fotos: coloque os arquivos em `assets/images/` e ajuste `src`, `legenda` e `h` (altura) em `fotos`. Sem o arquivo, aparece uma imagem provisória.
Foto principal e final: `foto-principal.jpg` e `momento-03.jpg` (atributo `data-photo` no `index.html`).
Linha do tempo, momentos e carta: `linhaDoTempo`, `momentos` e `carta`.
Música: coloque `musica.mp3` em `assets/music/`. Ela só toca ao clicar no botão ♪.
Cores: variáveis no início de `css/style.css`.
Sem bibliotecas de JavaScript; só as fontes vêm do Google Fonts. Respeita `prefers-reduced-motion`.