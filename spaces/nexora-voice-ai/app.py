import gradio as gr
import os

def text_to_speech(text, voice="es-MX"):
    """Convierte texto a voz"""
    # Simulación - en producción usar TTS real
    return f"Audio generado para: {text} (voz: {voice})"

def speech_to_text(audio):
    """Convierte voz a texto"""
    # Simulación - en producción usar STT real
    return "Texto transcrito del audio"

demo = gr.TabbedInterface(
    [
        gr.Interface(
            fn=text_to_speech,
            inputs=[
                gr.Textbox(label="Texto", placeholder="Escribe lo que quieres convertir a voz..."),
                gr.Radio(choices=["es-MX", "es-ES", "en-US"], value="es-MX", label="Voz")
            ],
            outputs=gr.Audio(label="Audio Generado"),
            title="Texto a Voz",
            description="Convierte texto en voz natural"
        ),
        gr.Interface(
            fn=speech_to_text,
            inputs=gr.Audio(label="Grabación de Voz", type="filepath"),
            outputs=gr.Textbox(label="Texto Transcrito"),
            title="Voz a Texto",
            description="Transcribe audio a texto"
        )
    ],
    title="🎤 Nexora Voice AI",
    description="TTS y STT con IA | [Upgrade to Pro](https://nexora-hug.com/pricing) | [Afiliados](https://nexora-hug.com/affiliates)",
    theme=gr.themes.Soft(primary_hue="purple")
)

if __name__ == "__main__":
    demo.launch()

