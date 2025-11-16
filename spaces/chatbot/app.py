import gradio as gr
import os

def chat_response(message, history):
    return f"Nexora AI: {message}"

demo = gr.ChatInterface(
    fn=chat_response,
    title="Nexora AI Chat",
    description="Chat inteligente powered by Nexora"
)

if __name__ == "__main__":
    demo.launch()

