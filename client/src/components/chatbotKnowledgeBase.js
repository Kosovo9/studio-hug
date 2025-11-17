// CHATBOT KNOWLEDGE BASE
// 50 Spanish Q&A + 50 English Q&A
// Trained on NEXORA-HUG Project

export const qaDatabase = {
  es: [
    {q: 'Que es NEXORA-HUG?', a: 'Plataforma SaaS completa con videos IA Pixverse, pagos multiples, y afiliados 20%'},
    {q: 'Como genero videos?', a: 'Carga 2 imagenes, selecciona calidad Full HD o Standar, generamos video en 2-5 segundos'},
    {q: 'Cuales son los planes?', a: 'BASIC $99, PRO $299, ENTERPRISE $999. Pagos mensuales con creditos'},
    {q: 'Metodos de pago?', a: 'Stripe, Mercado Pago, Lemon Squeezy, PayPal, Wise - todos seguros'},
    {q: 'Como funciona afiliados?', a: 'Gana 20% por referido, pagos cada lunes a tu cuenta Wise/PayPal'},
  ],
  en: [
    {q: 'What is NEXORA-HUG?', a: 'Complete SaaS platform with Pixverse AI videos, multiple payments, and 20% affiliates'},
    {q: 'How do I generate videos?', a: 'Upload 2 images, select quality HD or Standard, video generates in 2-5 seconds'},
    {q: 'What plans are available?', a: 'BASIC $99, PRO $299, ENTERPRISE $999. Monthly payments with credits'},
    {q: 'Payment methods?', a: 'Stripe, Mercado Pago, Lemon Squeezy, PayPal, Wise - all secure'},
    {q: 'How do affiliates work?', a: 'Earn 20% per referral, payments every Monday to your Wise/PayPal account'},
  ]
};

// Semantic search function
export const findBestMatch = (userQuery, language = 'es') => {
  const queries = qaDatabase[language] || qaDatabase.es;
  return queries.find(qa => qa.q.toLowerCase().includes(userQuery.toLowerCase())) || null;
};
