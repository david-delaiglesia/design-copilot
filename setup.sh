#!/bin/bash

echo "=== Setup Design Copilot Mercadona ==="

# Verificar que estamos en el directorio correcto
if [ ! -f CLAUDE.md ]; then
  echo "ERROR: Ejecuta este script desde la carpeta raíz del repo."
  exit 1
fi

echo "✓ CLAUDE.md encontrado"

# Preguntar si se usará Figma como referencia
read -p "¿Vas a usar referencias de Figma en tu flujo de trabajo? (s/n): " figma
if [ "$figma" = "s" ]; then
  claude mcp add --transport http figma https://mcp.figma.com/mcp
  echo "✓ MCP de Figma configurado"
else
  echo "✓ MCP de Figma omitido — puedes configurarlo más tarde"
fi

echo ""
echo "=== Setup completado ==="
echo "Ejecuta 'claude' para empezar."
