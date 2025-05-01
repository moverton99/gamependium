#!/bin/bash

# Exit immediately if a command fails
set -e

echo "🔨 Building project..."
npm run build

echo "🚚 Deploying dist/ to gh-pages branch..."

# Navigate into the dist folder
cd dist

# Initialize a temporary Git repo
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')"

# Push to gh-pages branch on GitHub
git push --force "https://github.com/moverton99/game-voyage-explorer.git" gh-pages

# Go back to root folder
cd ..

echo "✅ Deployed to GitHub Pages!"
