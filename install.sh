#!/bin/bash
set -e

REPO="https://github.com/david-delaiglesia/design-copilot.git"
INSTALL_DIR="$HOME/.design-copilot"
SKILLS_DIR="$HOME/.claude/skills"

# ── Colores ──────────────────────────────────────────────────────────────────
BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
RESET="\033[0m"

ok()   { echo -e "${GREEN}✓${RESET} $1"; }
info() { echo -e "  $1"; }
warn() { echo -e "${YELLOW}!${RESET} $1"; }
fail() { echo -e "${RED}✗${RESET} $1"; exit 1; }

echo ""
echo -e "${BOLD}Design Copilot — Instalación${RESET}"
echo "────────────────────────────────────"
echo ""

# ── Verificar dependencias ───────────────────────────────────────────────────
command -v git  >/dev/null 2>&1 || fail "Git no está instalado. Instálalo desde https://git-scm.com"
command -v node >/dev/null 2>&1 || fail "Node.js no está instalado. Instálalo desde https://nodejs.org"
command -v npm  >/dev/null 2>&1 || fail "npm no está instalado. Viene incluido con Node.js."

# ── Clonar o actualizar el repo ──────────────────────────────────────────────
if [ -d "$INSTALL_DIR/.git" ]; then
  info "Actualizando design copilot..."
  git -C "$INSTALL_DIR" pull --quiet
  ok "Repositorio actualizado"
else
  info "Clonando repositorio..."
  info "(Si el repo es privado, introduce tus credenciales de GitHub cuando se pidan)"
  echo ""
  git clone "$REPO" "$INSTALL_DIR"
  ok "Repositorio clonado en $INSTALL_DIR"
fi

echo ""

# ── Instalar dependencias del DS ─────────────────────────────────────────────
info "Instalando design system..."
npm install --prefix "$INSTALL_DIR/ds" --silent
ok "Design system listo"

# ── Instalar dependencias del starter ────────────────────────────────────────
info "Instalando proyecto starter..."
npm install --prefix "$INSTALL_DIR/starter" --silent
ok "Starter listo"

echo ""

# ── Enlazar skill a ~/.claude/skills/ (symlink para actualizaciones automáticas)
mkdir -p "$SKILLS_DIR"
rm -rf "$SKILLS_DIR/design-copilot" "$SKILLS_DIR/design-copilot.md"
ln -sf "$INSTALL_DIR/.claude/skills/design-copilot" "$SKILLS_DIR/design-copilot"
ok "Skill enlazado en Claude desktop"

echo ""
echo "────────────────────────────────────"
echo -e "${GREEN}${BOLD}¡Design Copilot instalado!${RESET}"
echo ""
echo -e "Abre ${BOLD}Claude desktop${RESET} y escribe ${BOLD}/design-copilot${RESET} para empezar."
echo ""
