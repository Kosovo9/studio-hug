import gradio as gr
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY', ''))

def chat_response(message, history):
    if not client.api_key:
        return "⚠️ Por favor configura tu OPENAI_API_KEY. [Upgrade to Pro](https://nexora-hug.com/pricing) para acceso completo."
    
    messages = [{"role": "system", "content": "Eres un asistente útil de Nexora-Hug. Responde en español de manera amigable y profesional."}]
    
    for h in history:
        messages.append({"role": "user", "content": h[0]})
        messages.append({"role": "assistant", "content": h[1]})
    
    messages.append({"role": "user", "content": message})
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"❌ Error: {str(e)}. [Upgrade to Pro](https://nexora-hug.com/pricing) para mejor experiencia."

demo = gr.ChatInterface(
    fn=chat_response,
    title="🤖 Nexora AI Chat",
    description="Chat inteligente powered by Nexora-Hug | [Upgrade to Pro](https://nexora-hug.com/pricing) | [Programa de Afiliados](https://nexora-hug.com/affiliates)",
    theme=gr.themes.Soft(primary_hue="purple"),
    examples=["Hola, ¿cómo estás?", "Explícame qué es la IA", "Ayúdame con mi código"]
)

if __name__ == "__main__":
    demo.launch()

