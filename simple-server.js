const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = process.env.PORT || 3000

// Types MIME pour les différents fichiers
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
}

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  // Gérer l'API pour les questions
  if (req.url === "/api/questions") {
    try {
      const questionsData = fs.readFileSync(path.join(__dirname, "questions.json"), "utf8")
      const allQuestions = JSON.parse(questionsData)

      // Sélectionner 10 questions aléatoires
      const randomQuestions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10)

      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify(randomQuestions))
      return
    } catch (error) {
      console.error("Erreur lors de la récupération des questions:", error)
      res.writeHead(500, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: "Erreur serveur" }))
      return
    }
  }

  // Gérer les fichiers statiques
  let filePath = req.url

  // Si l'URL est '/', servir index.html
  if (filePath === "/") {
    filePath = "/index.html"
  }

  // Construire le chemin complet du fichier
  filePath = path.join(__dirname, "public", filePath)

  // Obtenir l'extension du fichier
  const extname = String(path.extname(filePath)).toLowerCase()

  // Définir le type de contenu
  const contentType = MIME_TYPES[extname] || "application/octet-stream"

  // Lire et servir le fichier
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Fichier non trouvé, servir index.html
        fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
          if (err) {
            res.writeHead(500)
            res.end("Erreur serveur")
            return
          }
          res.writeHead(200, { "Content-Type": "text/html" })
          res.end(content, "utf-8")
        })
      } else {
        // Autre erreur serveur
        res.writeHead(500)
        res.end(`Erreur serveur: ${err.code}`)
      }
    } else {
      // Succès
      res.writeHead(200, { "Content-Type": contentType })
      res.end(content, "utf-8")
    }
  })
})

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
