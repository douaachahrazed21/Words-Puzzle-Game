// Variables globales
let levels = []
let currentLevel = 0
let score = 0
const totalQuestions = 10

// Fonction pour charger les questions depuis le serveur
async function loadQuestions() {
  try {
    const response = await fetch("/api/questions")
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des questions")
    }
    levels = await response.json()

    // Sauvegarder les questions dans la session
    sessionStorage.setItem("gameQuestions", JSON.stringify(levels))
    sessionStorage.setItem("currentLevel", "0")
    sessionStorage.setItem("score", "0")

    // Initialiser le jeu
    initGame()
  } catch (error) {
    console.error("Erreur:", error)
    alert("Impossible de charger les questions. Veuillez réessayer.")
  }
}

// Fonction pour initialiser le jeu
function initGame() {
  // Récupérer les données de la session si elles existent
  const storedQuestions = sessionStorage.getItem("gameQuestions")
  const storedLevel = sessionStorage.getItem("currentLevel")
  const storedScore = sessionStorage.getItem("score")

  if (storedQuestions) {
    levels = JSON.parse(storedQuestions)
  }

  if (storedLevel) {
    currentLevel = Number.parseInt(storedLevel)
  }

  if (storedScore) {
    score = Number.parseInt(storedScore)
  }

  // Vérifier si toutes les questions sont complétées
  if (currentLevel >= levels.length) {
    alert(`🎉 Félicitations ! Vous avez complété tous les niveaux ! Score final: ${score}/${totalQuestions} 🎉`)
    resetGame()
    window.location.href = "index.html" // Rediriger vers le menu principal
    return
  }

  // Afficher la question actuelle
  displayCurrentQuestion()
}

// Fonction pour afficher la question actuelle
function displayCurrentQuestion() {
  const question = levels[currentLevel].question
  const answer = levels[currentLevel].answer.toUpperCase()

  // Afficher la question
  document.querySelector("#question-text").innerHTML = question

  // Créer les emplacements pour la réponse
  createAnswerSlots(answer)

  // Créer les boutons de lettres
  createLetterButtons(answer)

  // Afficher le score actuel
  const scoreElement = document.getElementById("score-display")
  if (scoreElement) {
    scoreElement.textContent = `Score: ${score}/${totalQuestions}`
  }
}

// Fonction pour créer les emplacements de réponse
function createAnswerSlots(answer) {
  const nbrSlot = answer.length
  const slotsContainer = document.querySelector(".answer-slots")

  // Vider le conteneur
  slotsContainer.innerHTML = ""

  // Créer les emplacements
  for (let i = 0; i < nbrSlot; i++) {
    const slotElement = document.createElement("div")
    slotElement.className = "slot"
    slotElement.dataset.slotIndex = i

    slotsContainer.appendChild(slotElement)

    // Ajouter un écouteur d'événements pour supprimer une lettre
    slotElement.addEventListener("click", function () {
      if (!this.innerHTML) return // Ne rien faire si l'emplacement est vide

      const letter = this.dataset.letter
      const buttons = document.querySelectorAll(".letter-btn")

      for (const btn of buttons) {
        if (btn.innerText === letter && btn.classList.contains("used")) {
          btn.classList.remove("used")
          break
        }
      }

      this.innerHTML = "" // Vider l'emplacement
      this.removeAttribute("data-letter")
    })
  }
}

// Fonction pour créer les boutons de lettres
function createLetterButtons(answer) {
  // Obtenir les lettres de la réponse
  const answerLetters = answer.split("")

  // Ajouter des lettres aléatoires
  const randomLetters = []
  const rest = 15 - answer.length
  for (let i = 0; i < rest; i++) {
    const l = getRandomLetter()
    randomLetters.push(l)
  }

  const allLetters = [...answerLetters, ...randomLetters]

  // Mélanger les lettres
  allLetters.sort(() => Math.random() - 0.5)

  const lettersContainer = document.querySelector("#letters-grid")

  // Vider le conteneur
  lettersContainer.innerHTML = ""

  // Créer les boutons de lettres
  for (const l of allLetters) {
    const letterBtn = document.createElement("button")
    letterBtn.className = "letter-btn"
    letterBtn.innerText = l

    // Ajouter un écouteur d'événements pour les clics sur les lettres
    letterBtn.addEventListener("click", function () {
      if (this.classList.contains("used")) return // Ne rien faire si le bouton est déjà utilisé

      // Trouver le premier emplacement vide
      const slots = document.querySelectorAll(".slot")
      let emptySlotIndex = -1

      for (let i = 0; i < slots.length; i++) {
        if (!slots[i].textContent) {
          emptySlotIndex = i
          break
        }
      }

      if (emptySlotIndex === -1) return // Tous les emplacements sont remplis

      // Remplir l'emplacement
      const slot = slots[emptySlotIndex]
      slot.innerHTML = l
      slot.dataset.letter = l

      // Marquer le bouton comme utilisé
      this.classList.add("used")

      // Vérifier si tous les emplacements sont remplis
      let currentAnswer = ""
      let allFilled = true

      slots.forEach((s) => {
        if (s.textContent) {
          currentAnswer += s.textContent
        } else {
          allFilled = false
        }
      })

      if (allFilled) {
        // Vérifier si la réponse est correcte
        if (currentAnswer === answer) {
          // Augmenter le score et passer au niveau suivant
          score++
          sessionStorage.setItem("score", score.toString())
          sessionStorage.setItem("currentLevel", (currentLevel + 1).toString())

          if (currentLevel + 1 >= levels.length) {
            // Dernier niveau complété
            alert(`🎉 Félicitations ! Vous avez complété tous les niveaux ! Score final: ${score}/${totalQuestions} 🎉`)
            resetGame()
            window.location.href = "index.html" // Rediriger vers le menu principal
          } else {
            // Passer au niveau suivant
            window.location.href = "winpage.html"
          }
        } else {
          // Réponse incorrecte
          sessionStorage.setItem("currentLevel", currentLevel.toString())
          window.location.href = "lostpage.html"
        }
      }
    })

    // Ajouter le bouton au conteneur
    lettersContainer.append(letterBtn)
  }
}

// Fonction pour obtenir une lettre aléatoire
function getRandomLetter() {
  const randomNumber = Math.floor(Math.random() * 26)
  return String.fromCharCode(randomNumber + 65)
}

// Fonction pour réinitialiser le jeu
function resetGame() {
  sessionStorage.removeItem("gameQuestions")
  sessionStorage.removeItem("currentLevel")
  sessionStorage.removeItem("score")
}

// Charger les questions au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si nous sommes sur la page du jeu
  if (window.location.pathname.includes("thegame.html")) {
    // Vérifier si les questions sont déjà chargées
    const storedQuestions = sessionStorage.getItem("gameQuestions")

    if (storedQuestions) {
      // Utiliser les questions existantes
      initGame()
    } else {
      // Charger de nouvelles questions
      loadQuestions()
    }
  }
})
