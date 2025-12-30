# Silwa Tecnologia - Plataforma SaaS White-Label

Este projeto é um protótipo de arquitetura de software para uma plataforma SaaS de Delivery Multi-tenant (estilo iFood/Cardápio Digital), desenvolvido com React, TypeScript e Vite.

## 🚀 Ambientes Disponíveis

O sistema possui 4 interfaces integradas:
1.  **Landing Page:** Institucional.
2.  **Gestor (KDS):** Para restaurantes (com IA Gemini).
3.  **App Consumidor:** Cardápio digital.
4.  **Parceiros:** Dashboard de afiliados.

## 📦 Instalação e Execução Local

Você precisará do Node.js instalado.

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:3000`.

## ☁️ Como Publicar no GitHub Pages

Para publicar este projeto gratuitamente usando o **GitHub Pages**, siga os passos abaixo:

### 1. Preparação
Certifique-se de que você já commitaou e enviou (push) este código para um repositório no seu GitHub.

### 2. Instalação e Deploy
No seu terminal (dentro da pasta do projeto), execute:

```bash
# Instala as dependências (se ainda não fez)
npm install

# Faz o build e envia para o GitHub Pages
npm run deploy
```

Este comando irá:
1.  Criar a pasta `dist` com o site otimizado (Build).
2.  Criar um branch chamado `gh-pages` no seu repositório.
3.  Subir os arquivos para lá automaticamente.

### 3. Ativar no GitHub
1.  Vá até a página do seu repositório no GitHub.
2.  Clique em **Settings** > **Pages** (no menu lateral esquerdo).
3.  Em "Build and deployment" > "Source", certifique-se de que está selecionado **Deploy from a branch**.
4.  Em "Branch", selecione **gh-pages** e a pasta **/(root)**.
5.  Clique em **Save**.

Em alguns minutos, seu link aparecerá no topo da página (ex: `https://seu-usuario.github.io/nome-do-repo/`).

---

**Nota sobre a IA (Gemini):**
Para que a IA funcione no GitHub Pages, você precisará configurar a API Key de uma forma segura ou criar um backend proxy, pois o GitHub Pages é estático e expõe chaves no frontend. Para testes rápidos, você pode inserir a chave temporariamente no código local, mas **não recomenda-se commitar chaves reais**.

**Tecnologias:** React 18, Vite, Tailwind CSS, Google GenAI SDK, Recharts.
