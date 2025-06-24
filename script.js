document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const symbol = document.getElementById("darkSymbol");
  const quizContainer = document.getElementById("quiz-container");
  const progressBar = document.querySelector(".progress-bar");
  const progressFill = document.getElementById("progressFill");
  const startScreen = document.getElementById("start-screen");
  const resultSection = document.getElementById("result-section");
  const navButtons = document.getElementById("quiz-nav-buttons");
  const nextButton = document.getElementById("nextButton");
  const backButton = document.getElementById("backButton");

  let current = 0;
  let answers = [];

  const questions = [
    "You enjoy being in large groups.",
    "You like planning your schedule in advance.",
    "You’re comfortable with sudden changes.",
    "You prefer logic over emotions.",
    "You thrive on routine and structure.",
    "You make decisions quickly.",
    "You feel energized after socializing.",
    "You often question rules and norms.",
    "You enjoy solving complex problems.",
    "You get overwhelmed when plans change.",
    "You work better with structure.",
    "You seek new challenges often."
  ];

  const resultGroups = [
    ["The Analyzer", "Detail-oriented and introspective thinker."],
    ["The Planner", "Organized and thoughtful decision-maker."],
    ["The Adaptive", "Balances control with openness to change."],
    ["The Connector", "Empathetic and expressive team builder."],
    ["The Explorer", "Adventurous, curious, thrives on change."],
    ["The Visionary", "Future-focused and creatively driven."],
    ["The Architect", "Strategic thinker who builds ideas logically."],
    ["The Guardian", "Steady, dependable, and careful with decisions."],
    ["The Idealist", "Driven by values and a sense of purpose."],
    ["The Realist", "Grounded and practical in everyday life."],
    ["The Maverick", "Rebellious, independent, and challenge-loving."],
    ["The Mediator", "Peace-seeking and diplomatic problem solver."]
  ];

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    symbol.textContent = document.body.classList.contains("dark-mode") ? "☾" : "☀";
  });

  document.getElementById("startButton").onclick = () => {
    current = 0;
    answers = [];
    startScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    progressBar.classList.remove("hidden");
    navButtons.classList.remove("hidden");
    navButtons.style.visibility = "visible";
    nextButton.classList.remove("hidden");
    backButton.classList.add("hidden");
    showQuestion();
  };

  document.getElementById("retakeButton").onclick = () => {
    resultSection.classList.add("hidden");
    startScreen.classList.remove("hidden");
    document.getElementById("groups-grid").classList.add("hidden");
  };

  document.getElementById("historyButton").onclick = () => {
    const table = document.getElementById("history-table");
    table.classList.toggle("hidden");
    buildHistoryTable();
  };

  document.getElementById("showGroupsButton").onclick = () => {
    document.getElementById("groups-grid").classList.toggle("hidden");
  };

  backButton.onclick = () => {
    if (current > 0) {
      current--;
      showQuestion();
    } else {
      quizContainer.classList.add("hidden");
      progressBar.classList.add("hidden");
      navButtons.classList.add("hidden");
      startScreen.classList.remove("hidden");
    }
  };

  nextButton.onclick = () => {
    if (answers[current] == null) {
      const warn = document.getElementById("warning");
      if (warn) warn.classList.remove("hidden");
      return;
    }
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  function showQuestion() {
  quizContainer.innerHTML = `
    <div class="question">${questions[current]}</div>
    <div class="options">
      ${[1, 2, 3, 4, 5].map((val, i) => `
        <button class="option-btn" data-value="${val}">
          ${["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"][i]}
        </button>
      `).join("")}
    </div>
    <p id="warning" class="warning hidden">Please select an option to continue.</p>
  `;

  updateProgress();

  // Logic for button visibility
  nextButton.classList.remove("hidden");
  backButton.classList.toggle("hidden", current === 0);

  // Keep selection if revisiting question
  if (answers[current] != null) {
    document.querySelectorAll(".option-btn").forEach(btn => {
      if (Number(btn.dataset.value) === answers[current]) {
        btn.classList.add("selected");
      }
    });
  }

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.onclick = () => {
      answers[current] = Number(btn.dataset.value);
      document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      document.getElementById("warning").classList.add("hidden");
    };
  });
}


  function updateProgress() {
    const percent = ((current) / questions.length) * 100;
    progressFill.style.width = percent + "%";
  }

  function showResult() {
    navButtons.classList.add("hidden");
    backButton.classList.add("hidden");
    nextButton.classList.add("hidden");
    const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
    const index = Math.min(resultGroups.length - 1, Math.floor(avg / 5 * resultGroups.length));
    const [title, desc] = resultGroups[index];

    document.getElementById("result-title").textContent = title;
    document.getElementById("result-text").textContent = desc;

    const groupHTML = resultGroups.map(
      ([name, text]) => `<div class="group"><h3>${name}</h3><p>${text}</p></div>`
    ).join("");
    document.getElementById("groups-grid").innerHTML = groupHTML;

    saveHistory(title);
    document.getElementById("attempts-count").textContent = JSON.parse(localStorage.getItem("quizHistory") || "[]").length;

    quizContainer.classList.add("hidden");
    resultSection.classList.remove("hidden");
    progressBar.classList.add("hidden");
    navButtons.classList.add("hidden");
  }

  function saveHistory(result) {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    history.push({ result });
    localStorage.setItem("quizHistory", JSON.stringify(history));
  }

  function buildHistoryTable() {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const table = document.getElementById("history-table");

    table.innerHTML = `
      <thead><tr><th>#</th><th>Result</th><th>Delete</th></tr></thead>
      <tbody>
        ${history.map((entry, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${entry.result}</td>
            <td><button class="delete-btn" data-index="${index}">✕</button></td>
          </tr>
        `).join("")}
      </tbody>
    `;

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.onclick = () => {
        history.splice(Number(btn.dataset.index), 1);
        localStorage.setItem("quizHistory", JSON.stringify(history));
        buildHistoryTable();
        document.getElementById("attempts-count").textContent = history.length;
      };
    });
  }
});
