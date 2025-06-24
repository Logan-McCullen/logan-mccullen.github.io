const questions = [
  {
    text: 'I feel energized after social gatherings.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I like planning things in advance.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I enjoy trying new and different activities.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I often reflect on my feelings.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I keep my space tidy and organized.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I enjoy working on teams.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I get anxious when facing uncertainty.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  },
  {
    text: 'I prefer tasks that require creativity.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 }
    ]
  }
];

const groups = [
  { label: 'The Analyst', summary: 'Logical and introspective with a focus on details.' },
  { label: 'The Builder', summary: 'Practical and organized, prefers clear plans.' },
  { label: 'The Dreamer', summary: 'Creative and imaginative, enjoys new ideas.' },
  { label: 'The Socializer', summary: 'Outgoing and team-oriented, energized by others.' }
];

let currentQuestion = 0;
let score = 0;

const container = document.getElementById('quiz-container');
const startButton = document.getElementById('startButton');
const resultSection = document.getElementById('result-section');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const grid = document.getElementById('groups-grid');

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  resultSection.classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  container.innerHTML = `
    <div class="progress">Question ${currentQuestion + 1} of ${questions.length}</div>
    <div class="question">${q.text}</div>
    <ul class="options">
      ${q.options
        .map((o, i) => `<li><label><input type="radio" name="option" value="${o.value}"> ${o.text}</label></li>`)
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
  const average = score / questions.length;
  let groupIndex;
  if (average <= 2) {
    groupIndex = 0;
  } else if (average <= 3) {
    groupIndex = 1;
  } else if (average <= 4) {
    groupIndex = 2;
  } else {
    groupIndex = 3;
  }

  resultTitle.textContent = groups[groupIndex].label;
  resultText.textContent = groups[groupIndex].summary;

  grid.innerHTML = groups
    .map(g => `<div class="group"><h3>${g.label}</h3><p>${g.summary}</p><a href="#">Learn more</a></div>`)
    .join('');

  resultSection.classList.remove('hidden');
  container.innerHTML = '';
}