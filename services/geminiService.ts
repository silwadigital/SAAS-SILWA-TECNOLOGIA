import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production build, ensure process.env.API_KEY is defined.
// For this demo, we assume the environment is correctly set up.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateDishDescription = async (dishName: string, ingredients: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key missing for Gemini.");
    return "Descrição gerada por IA indisponível (Chave de API ausente).";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Atue como um copywriter gastronômico profissional para um cardápio de restaurante.
      Crie uma descrição curta, apetitosa e vendedora (máximo 160 caracteres) para um prato chamado "${dishName}".
      Ingredientes principais: ${ingredients}.
      Não use aspas na resposta.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Delicioso prato preparado com ingredientes frescos.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Delicioso prato preparado com ingredientes selecionados.";
  }
};

export const generatePartnerInsight = async (stats: any): Promise<string> => {
    if (!apiKey) return "Adicione sua chave de API para obter insights de negócios.";

    try {
      const model = 'gemini-3-flash-preview';
      const prompt = `
        Analise estes dados de um parceiro afiliado de um sistema de delivery:
        Lojas ativas: ${stats.activeStores}.
        Comissão Pendente: R$ ${stats.pendingCommission}.
        Dê uma dica curta e motivacional de 1 frase sobre como ele pode aumentar seus ganhos indicando mais pizzarias e hamburguerias.
      `;
  
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
  
      return response.text || "Continue indicando novas lojas para aumentar sua renda recorrente!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Foque em trazer lojas com alto volume de vendas.";
    }
  };