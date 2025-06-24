const questions = [
  {
    text: "I feel energized after social gatherings.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I like planning things in advance.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I enjoy trying new and different activities.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I often reflect on my feelings.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I keep my space tidy and organized.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I enjoy working on teams.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I get anxious when facing uncertainty.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
    ]
  },
  {
    text: "I prefer tasks that require creativity.",
    options: [
      { text: "Disagree", value: 1 },
      { text: "Neutral", value: 2 },
      { text: "Agree", value: 3 }
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
    <div class="progress">Question ${currentQuestion + 1} of ${questions.length}</div>
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
  if (score <= 13) {
    resultText = 'You lean towards introversion.';
  } else if (score <= 18) {
    resultText = 'You have a balanced personality.';
  } else {
    resultText = 'You lean towards extroversion.';
  }
  container.innerHTML = `<div class="result">${resultText}</div>`;
}
