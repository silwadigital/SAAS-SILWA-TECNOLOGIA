# Silwa Tecnologia - Plataforma SaaS White-Label

Este projeto é um protótipo de arquitetura de software para uma plataforma SaaS de Delivery (estilo iFood/Cardápio Digital), desenvolvido com React, TypeScript e Vite.

## Ambientes do Sistema

1.  **Landing Page:** Página Institucional.
2.  **Gestor (KDS):** Painel para restaurantes gerenciarem pedidos (com IA Gemini).
3.  **App Consumidor:** Cardápio digital para clientes.
4.  **Parceiros:** Dashboard de afiliados.

## Como Rodar Localmente

Certifique-se de ter o Node.js instalado.

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o projeto:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:3000`.

## Como Publicar no GitHub Pages

Para colocar o site no ar gratuitamente:

1.  No terminal do projeto, rode:
    ```bash
    npm run deploy
    ```
2.  Aguarde o comando finalizar.
3.  Vá no seu repositório no GitHub.
4.  Entre em **Settings** > **Pages**.
5.  Em "Branch", selecione **gh-pages** e clique em Save.

O link do seu site aparecerá no topo da página em alguns minutos.

---

**Tecnologias:** React 18, Vite, Tailwind CSS, Google GenAI SDK.
