# Verwende das Node.js-Image als Basis
FROM  node:22.13.0-slim

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest der Dateien in das Arbeitsverzeichnis
COPY . .

# Baue das React-Projekt
RUN npm run build

# Installiere einen einfachen Server (z.B. 'serve'), um die App zu hosten
RUN npm install -g serve

# Exponiere den Port, auf dem der Server läuft
EXPOSE 3000

# Starte den Server, um die gebauten Dateien bereitzustellen
CMD ["serve", "-s", "build", "-l", "3000"]
