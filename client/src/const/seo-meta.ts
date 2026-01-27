export const SEO_META = {
  title: 'Agência Comnectar - Marketing Digital com Foco em Performance',
  description: 'Transformamos dados em resultados reais. Tráfego pago, gestão de Instagram e estratégias data-driven que comprovam ROI. Auditoria gratuita.',
  keywords: 'agência marketing digital, tráfego pago, gestão instagram, marketing performance, ROI, estratégia digital',
  author: 'Patrick Azevedo',
  ogTitle: 'Agência Comnectar - Performance em Tempo Real',
  ogDescription: 'Marketing digital orientado por dados. Tráfego pago, gestão de redes sociais e estratégias que comprovam ROI.',
  ogImage: '/logo-comnectar.png',
  ogUrl: 'https://comnectar.manus.space',
  twitterCard: 'summary_large_image',
  twitterCreator: '@comnectar',
};

export const SCHEMA_ORG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agência Comnectar',
    url: 'https://comnectar.manus.space',
    logo: 'https://comnectar.manus.space/logo-comnectar.png',
    description: 'Agência de Marketing Digital com foco em Performance e ROI',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+55-11-XXXXX-XXXX',
      email: 'contato@comnectar.com.br',
    },
    sameAs: [
      'https://www.instagram.com/comnectar',
      'https://www.linkedin.com/company/comnectar',
    ],
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Agência Comnectar',
    image: 'https://comnectar.manus.space/logo-comnectar.png',
    description: 'Agência de Marketing Digital especializada em Performance',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'São Paulo',
      addressCountry: 'BR',
    },
    priceRange: '$$',
  },
};
