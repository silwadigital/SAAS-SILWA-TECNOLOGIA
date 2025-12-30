Silwa Tecnologia - Plataforma SaaS White-Label
Este projeto é um protótipo de arquitetura de software para uma plataforma SaaS de Delivery Multi-tenant (estilo iFood/Cardápio Digital), desenvolvido com React, TypeScript e Vite.

🚀 Ambientes Disponíveis
O sistema possui 4 interfaces integradas:

Landing Page: Institucional.
Gestor (KDS): Para restaurantes (com IA Gemini).
App Consumidor: Cardápio digital.
Parceiros: Dashboard de afiliados.
📦 Instalação e Execução Local
Você precisará do Node.js instalado.

Clone o repositório.
Instale as dependências:
npm install
Rode o servidor de desenvolvimento:
npm run dev
Acesse http://localhost:3000.
☁️ Como Publicar (Deploy)
A maneira mais fácil de visualizar este projeto online é usar a Vercel:

Suba este código para o seu GitHub.
Crie uma conta na Vercel.
Clique em "Add New Project" e importe seu repositório.
A Vercel detectará automaticamente a configuração do Vite. Clique em Deploy.
Configuração da API Key (IA)
Para que a inteligência artificial (Gemini) funcione no ambiente online:

No painel da Vercel, vá em Settings > Environment Variables.
Adicione uma nova variável:
Key: API_KEY
Value: Sua chave da API do Google Gemini.
Redeploy o projeto.
Tecnologias: React 18, Vite, Tailwind CSS, Google GenAI SDK, Recharts.
