#!/usr/bin/env python3
"""
Script para desplegar Spaces a Hugging Face automáticamente
"""

import os
import subprocess
import sys
from pathlib import Path

SPACES = [
    'nexora-ai-chat',
    'nexora-image-gen',
    'nexora-voice-ai',
    'nexora-code-helper'
]

HF_TOKEN = os.getenv('HUGGINGFACE_TOKEN')

def deploy_space(space_name):
    """Despliega un space a Hugging Face"""
    space_path = Path(__file__).parent.parent / 'spaces' / space_name
    
    if not space_path.exists():
        print(f"❌ Space {space_name} no encontrado")
        return False
    
    print(f"🚀 Desplegando {space_name}...")
    
    try:
        # Cambiar al directorio del space
        os.chdir(space_path)
        
        # Inicializar git si no existe
        if not (space_path / '.git').exists():
            subprocess.run(['git', 'init'], check=True)
            subprocess.run(['git', 'remote', 'add', 'origin', 
                          f'https://huggingface.co/spaces/nexora/{space_name}'], 
                         check=False)
        
        # Agregar archivos
        subprocess.run(['git', 'add', '.'], check=True)
        subprocess.run(['git', 'commit', '-m', f'Deploy {space_name}'], check=True)
        
        # Push a Hugging Face
        subprocess.run(['git', 'push', 'origin', 'main'], check=True)
        
        print(f"✅ {space_name} desplegado exitosamente")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error desplegando {space_name}: {e}")
        return False
    finally:
        os.chdir(Path(__file__).parent)

def main():
    if not HF_TOKEN:
        print("❌ HUGGINGFACE_TOKEN no configurado")
        sys.exit(1)
    
    print("🚀 Iniciando deployment de Spaces...")
    
    results = []
    for space in SPACES:
        results.append(deploy_space(space))
    
    success_count = sum(results)
    print(f"\n🎉 Deployment completado: {success_count}/{len(SPACES)} spaces desplegados")
    
    if success_count == len(SPACES):
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()

