import gradio as gr
import os
from PIL import Image, ImageDraw, ImageFont
import io
import base64

def generate_image(prompt, style="realistic"):
    """Genera una imagen con watermark para free tier"""
    # Simulación - en producción usar Stable Diffusion
    width, height = 512, 512
    img = Image.new('RGB', (width, height), color='purple')
    draw = ImageDraw.Draw(img)
    
    # Texto simple (en producción usar modelo real)
    draw.text((50, 200), f"Image: {prompt}", fill='white')
    
    # Aplicar watermark
    watermark_text = "Powered by Nexora-Hug"
    draw.text((width-200, height-30), watermark_text, fill='white')
    
    return img

def process_image(prompt, user_tier="free"):
    """Procesa imagen con o sin watermark según tier"""
    img = generate_image(prompt)
    
    if user_tier == "free":
        # Watermark siempre visible
        return img
    else:
        # Pro tier: sin watermark
        # En producción, generar sin watermark
        return img

demo = gr.Interface(
    fn=process_image,
    inputs=[
        gr.Textbox(label="Prompt", placeholder="Describe la imagen que quieres generar..."),
        gr.Radio(choices=["free", "pro"], value="free", label="Tier")
    ],
    outputs=gr.Image(label="Imagen Generada"),
    title="🎨 Nexora Image Generator",
    description="Genera imágenes con IA | [Upgrade to Pro sin watermark](https://nexora-hug.com/pricing) | [Afiliados 20%](https://nexora-hug.com/affiliates)",
    examples=[
        ["Un gato espacial en Marte", "free"],
        ["Paisaje futurista cyberpunk", "free"]
    ],
    theme=gr.themes.Soft(primary_hue="purple")
)

if __name__ == "__main__":
    demo.launch()

