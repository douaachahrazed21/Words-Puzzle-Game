const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")))

// Route pour obtenir 10 questions aléatoires
app.get("/api/questions", (req, res) => {
  try {
    // Lire le fichier JSON
    const questionsData = fs.readFileSync(path.join(__dirname, "questions.json"), "utf8")
    const allQuestions = JSON.parse(questionsData)

    // Sélectionner 10 questions aléatoires
    const randomQuestions = getRandomQuestions(allQuestions, 10)

    res.json(randomQuestions)
  } catch (error) {
    console.error("Erreur lors de la récupération des questions:", error)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// Fonction pour sélectionner des questions aléatoires
function getRandomQuestions(questions, count) {
  const shuffled = [...questions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Route par défaut pour servir l'application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
