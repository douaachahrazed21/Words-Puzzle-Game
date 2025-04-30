// play button
document.getElementById("button").addEventListener("click", () => {
  // Réinitialiser les données de session au début d'une nouvelle partie
  sessionStorage.removeItem("gameQuestions")
  sessionStorage.removeItem("currentLevel")
  sessionStorage.removeItem("score")

  window.location.href = "thegame.html"
})
