export const CONTACT_DATA = {
  whatsapp: '22998810032',
  email: 'contato@agenciacomnectar.com.br',
  address: 'Estrada das Caravelas, 12300 - Armação dos Búzios - Brasil',
  instagram: 'http://instagram.com/patrick.azvdo',
  linkedin: 'https://www.linkedin.com/in/patrick194/',
};

export const WHATSAPP_MESSAGES = {
  auditoria: `Olá! Gostaria de solicitar uma auditoria gratuita do meu tráfego pago. Veio através do site da Comnectar.`,
  roiCalculator: `Olá! Gostaria de conversar sobre como aumentar meu ROI em marketing digital. Veio através do site da Comnectar.`,
  contato: `Olá! Gostaria de conversar sobre os serviços de marketing digital da Comnectar.`,
  portfolio: `Olá! Gostaria de conhecer mais sobre os cases de sucesso da Comnectar.`,
};

export const getWhatsAppLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/55${CONTACT_DATA.whatsapp}?text=${encoded}`;
};
