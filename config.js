/* ===== EDITE AQUI: links, projetos e habilidades ===== */
const SITE = {
  // Deixe "" para ocultar. Coloque URLs reais (https://...).
  links: { github: "", linkedin: "", email: "" },   // email: apenas o endereço, ex. nome@dominio.com

  // EmailJS (https://www.emailjs.com). A Public Key é feita para ficar no front-end; NUNCA coloque a Private Key.
  emailjs: { publicKey: "", serviceId: "", templateId: "" },

  skills: [
    { cat: "Front-end", items: [["HTML5", "Acadêmico"], ["CSS3", "Acadêmico"], ["JavaScript", "Acadêmico"], ["Angular", "Em estudo"]] },
    { cat: "Back-end", items: [["PHP", "Acadêmico"], ["Laravel", "Em estudo"], ["Python", "Básico"]] },
    { cat: "Banco de dados", items: [["SQL", "Acadêmico"], ["Modelagem de dados", "Acadêmico"], ["Consultas e relacionamentos", "Acadêmico"]] },
    { cat: "Ferramentas", items: [["Git", "Acadêmico"], ["GitHub", "Acadêmico"], ["VS Code", "Uso diário"]] }
  ],

  /* PROJETOS DE EXEMPLO — substitua pelos seus.
     tipo: "Front-end" | "Back-end" | "Full-stack"   origem: "Acadêmico" | "Pessoal"
     demo e codigo: URL real ou "" (o botão fica desativado). imagem: arquivo em assets/projects/ ou "" */
  projetos: [
    { nome: "Projeto de exemplo 1", tipo: "Front-end", origem: "Pessoal", tecnologias: ["HTML5", "CSS3", "JavaScript"], resumo: "Exemplo de cartão de projeto front-end.", detalhes: "Substitua este texto pela descrição completa: objetivo, desafios e o que você aprendeu.", imagem: "", demo: "", codigo: "" },
    { nome: "Projeto de exemplo 2", tipo: "Back-end", origem: "Acadêmico", tecnologias: ["PHP", "SQL"], resumo: "Exemplo de cartão de projeto back-end.", detalhes: "Substitua pelos detalhes reais do seu projeto acadêmico.", imagem: "", demo: "", codigo: "" },
    { nome: "Projeto de exemplo 3", tipo: "Full-stack", origem: "Acadêmico", tecnologias: ["Laravel", "SQL", "JavaScript"], resumo: "Exemplo de cartão de projeto full-stack.", detalhes: "Substitua pelos detalhes reais.", imagem: "", demo: "", codigo: "" },
    { nome: "Projeto de exemplo 4", tipo: "Front-end", origem: "Acadêmico", tecnologias: ["Angular"], resumo: "Exemplo de cartão de projeto em Angular.", detalhes: "Substitua pelos detalhes reais.", imagem: "", demo: "", codigo: "" }
  ]
};
