// next level button
document.getElementById("nextlevelbtn").addEventListener("click", () => {
  window.location.href = "thegame.html"
})

// return btn
document.getElementById("returnbtn").addEventListener("click", () => {
  // Réinitialiser les données de session lors du retour au menu principal
  sessionStorage.removeItem("gameQuestions")
  sessionStorage.removeItem("currentLevel")
  sessionStorage.removeItem("score")

  window.location.href = "index.html"
})
