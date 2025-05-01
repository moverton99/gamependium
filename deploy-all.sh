#!/bin/bash

set -e  # Exit if any command fails

# === CONFIG ===
COMMIT_MSG=${1:-"Auto-commit and deploy"}
REPO_URL="https://github.com/moverton99/game-voyage-explorer.git"

echo "🔄 Staging all changes..."
git add .

echo "📝 Committing changes with message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG" || echo "⚠️ Nothing to commit."

echo "🚀 Pushing to main branch on GitHub..."
git push origin main

echo "🏗️  Building production build..."
npm run build

echo "🌍 Deploying to gh-pages branch..."
cd dist
rm -rf .git
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy: $COMMIT_MSG"
git push --force "$REPO_URL" gh-pages
cd ..

echo "✅ Done! Your site should be live at:"
echo "   https://moverton99.github.io/game-voyage-explorer/"
