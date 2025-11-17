import gradio as gr

def code_completion(code, language="python"):
    """Completa código con IA"""
    # Simulación - en producción usar modelo de código
    completion = f"""
# Completado para {language}:
{code}

# Sugerencia de continuación:
def optimized_function():
    # Tu código optimizado aquí
    pass
"""
    return completion

def code_explain(code):
    """Explica código"""
    return f"Este código hace lo siguiente: {code[:100]}..."

demo = gr.TabbedInterface(
    [
        gr.Interface(
            fn=code_completion,
            inputs=[
                gr.Code(label="Código", language="python", value="def hello():"),
                gr.Radio(choices=["python", "javascript", "java", "cpp"], value="python", label="Lenguaje")
            ],
            outputs=gr.Code(label="Código Completado", language="python"),
            title="Code Completion",
            description="Completa tu código con IA"
        ),
        gr.Interface(
            fn=code_explain,
            inputs=gr.Code(label="Código a Explicar", language="python"),
            outputs=gr.Textbox(label="Explicación"),
            title="Code Explanation",
            description="Explica qué hace tu código"
        )
    ],
    title="💻 Nexora Code Helper",
    description="Asistente de código con IA | [Upgrade to Pro](https://nexora-hug.com/pricing) | [Afiliados](https://nexora-hug.com/affiliates)",
    theme=gr.themes.Soft(primary_hue="purple")
)

if __name__ == "__main__":
    demo.launch()

