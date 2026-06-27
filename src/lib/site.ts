/** Configuração central do site — troque aqui marca, contatos e logo. */
export const site = {
  name: "Horizon Motors",
  tagline: "Curadoria automotiva premium",
  description:
    "Vitrine premium de veículos elétricos, híbridos e modelos de performance. Catálogo curado, ficha técnica completa e atendimento consultivo. Protótipo demonstrativo.",
  url: "https://horizon-motors.example.com",
  // Logo principal fornecida. Para usar uma logo local, baixe para /public/brand
  // e troque por "/brand/logo.webp".
  logo: "https://i.postimg.cc/fWxnvdcB/g-Qgzdk79XJFEm-Pq-ROf1WCgf-T3M.webp",
  contact: {
    email: "contato@horizonmotors.com.br",
    phone: "+55 (11) 4000-0000",
    address: "Av. das Nações, 1000 — São Paulo, SP",
  },
  social: {
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
} as const;
