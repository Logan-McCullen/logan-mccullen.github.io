const questions = [
  {
    text: "Do you prefer to spend time alone or with others?",
    options: [
      { text: "Alone", value: 1 },
      { text: "A mix", value: 2 },
      { text: "With others", value: 3 }
    ]
  },
  {
    text: "How do you handle stress?",
    options: [
      { text: "Get anxious", value: 1 },
      { text: "Seek support", value: 2 },
      { text: "Stay calm", value: 3 }
    ]
  },
  {
    text: "When making decisions, you rely mostly on...",
    options: [
      { text: "Feelings", value: 1 },
      { text: "Advice from others", value: 2 },
      { text: "Logic", value: 3 }
    ]
  },
  {
    text: "Which environment makes you most comfortable?",
    options: [
      { text: "Quiet spaces", value: 1 },
      { text: "Small groups", value: 2 },
      { text: "Lively gatherings", value: 3 }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

const container = document.getElementById('quiz-container');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  container.innerHTML = `
    <div class="question">${q.text}</div>
    <ul class="options">
      ${q.options
        .map(o => `<li><label><input type="radio" name="option" value="${o.value}"> ${o.text}</label></li>`)
        .join('')}
    </ul>
    <button id="nextButton" class="button">${currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}</button>
  `;

  document.getElementById('nextButton').addEventListener('click', nextQuestion);
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('Please select an option.');
    return;
  }
  score += parseInt(selected.value, 10);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let resultText;
  if (score <= 6) {
    resultText = 'You lean towards introversion.';
  } else if (score <= 10) {
    resultText = 'You have a balanced personality.';
  } else {
    resultText = 'You lean towards extroversion.';
  }
  container.innerHTML = `<div class="result">${resultText}</div>`;
}
