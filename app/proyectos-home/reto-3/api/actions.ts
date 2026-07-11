"use server";
import ollama from "ollama";

export async function askLlama(prompt: string) {
  try {
    const response = await ollama.chat({
      model: "llama3.1",
      messages: [{ role: "user", content: prompt }],
    });
    return { success: true, content: response.message.content };
  } catch (error) {
    console.error("Error en el servidor con Ollama:", error);
    return { success: false, error: "No se pudo conectar con el modelo local." };
  }
}