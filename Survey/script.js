const startButton = document.querySelector('.start-button');
const surveyContainer = document.getElementById('survey-container');
const firstQuestion = document.querySelector('.question:nth-of-type(1)');

startButton.addEventListener('click', () => {
  surveyContainer.style.display = 'none';
  firstQuestion.classList.add('active');
});

let currentQuestion = 1;
const totalQuestions = 10;
const progressBar = document.getElementById('progress-bar');
const questionNumber = document.getElementById('progress-bar');

function nextQuestion() {
  const currentQuestionElement = document.querySelector(
    `.question:nth-of-type(${currentQuestion})`
  );
  const selectedOption = currentQuestionElement.querySelector(
    'input[type=radio]:checked'
  );

  if (!selectedOption) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Please select an option.';
    errorMessage.style.color = 'red';
    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '50%';
    errorMessage.style.left = '50%';
    errorMessage.style.transform = 'translate(-50%, -50%)';
    errorMessage.style.padding = '20px';
    errorMessage.style.background = '#ffdddd';
    errorMessage.style.border = '1px solid #f44336';
    errorMessage.style.borderRadius = '10px';
    document.body.appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, 1000);
    return;
  }

  currentQuestionElement.classList.remove('active');
  currentQuestion++;
  const nextQuestionElement = document.querySelector(
    `.question:nth-of-type(${currentQuestion})`
  );
  nextQuestionElement.classList.add('active');
  progressBar.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
  questionNumber.textContent = currentQuestion;

  if (currentQuestion === totalQuestions) {
    submitButton.style.display = 'block';
    document.getElementById(`lastBtn`).style.display = 'none';
  }
}

function addComment() {
  const commentField = document.getElementById(`comment${currentQuestion}`);
  commentField.style.display = 'block';
}

function results() {
  const resultsContainer = document.getElementById('results-container');
  const surveyForm = document.getElementById('survey-form');
  surveyForm.style.display = 'none';
  resultsContainer.style.display = 'block';
}

function calculateResults() {
  let totalScore = 0;
  for (let i = 1; i <= totalQuestions; i++) {
    const question = document.querySelector(`input[name=question${i}]:checked`);
    if (question) {
      totalScore += parseInt(question.value);
    }
  }
  const percentage = (totalScore / (totalQuestions * 5)) * 100;
  let userLevel;
  if (percentage >= 0 && percentage <= 30) {
    userLevel = 'Basic Level';
  } else if (percentage >= 31 && percentage <= 70) {
    userLevel = 'Intermediate Level';
  } else if (percentage >= 71 && percentage <= 100) {
    userLevel = 'Advanced Level';
  }
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
    <h1>Thank you!</h1>
    <h3>Your score is ${percentage.toFixed(2)}%</h3>
    <h3>You are a ${userLevel} User</h3>
  `;

  if (results) {
    submitButton.style.display = 'none';
  }
}

const submitButton = document.getElementById('submit-results-button');
submitButton.addEventListener('click', () => {
  calculateResults();
  results();
});

function toggleComment(event) {
  var commentContainer = event.target.nextElementSibling;
  var commentBox = commentContainer.querySelector('.comment');
  var saveButton = commentContainer.querySelector('button');

  if (commentBox.style.display === 'none') {
    commentBox.style.display = 'block';
    saveButton.style.display = 'block';
  } else {
    commentBox.style.display = 'none';
    saveButton.style.display = 'none';
  }
}

function skipQuestion() {
  const currentQuestionElement = document.querySelector(
    `.question:nth-of-type(${currentQuestion})`
  );
  currentQuestionElement.classList.remove('active');
  currentQuestion++;
  const nextQuestionElement = document.querySelector(
    `.question:nth-of-type(${currentQuestion})`
  );
  nextQuestionElement.classList.add('active');
  progressBar.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
  questionNumber.textContent = currentQuestion;

  if (currentQuestion === totalQuestions) {
    submitButton.style.display = 'block';
    document.getElementById(`lastBtn`).style.display = 'none';
  }
}

function saveComment() {
  const successMessage = document.createElement('div');
  successMessage.textContent = 'Comment saved successfully';
  successMessage.style.color = 'white';
  successMessage.style.position = 'fixed';
  successMessage.style.top = '50%';
  successMessage.style.left = '50%';
  successMessage.style.transform = 'translate(-50%, -50%)';
  successMessage.style.padding = '20px';
  successMessage.style.background = 'green';
  successMessage.style.border = '1px solid #008000';
  successMessage.style.borderRadius = '10px';
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 1000);

  const commentInputId = currentQuestion;
  const saveButtonInputId = currentQuestion;

  document.getElementById(`comment-${commentInputId}`).style.display = 'none';
  document.getElementById(`saveButton-${saveButtonInputId}`).style.display =
    'none';
}
