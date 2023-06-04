let totalQuestions = 0; // Initialize the total number of questions to 0
let score = 0; // Initialize the score to 0

let patternTotalQuestions = 0;
let patternScore = 0;



// Generate a random positive whole number between min and max
function generateRandomPositiveWhole(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate a random operator (+, -, *, /)
function generateRandomOperator() {
  const operators = ['+', '-', '*', '/'];
  const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
}

// Generate a random math question
function generateQuestion() {
  let num1 = generateRandomPositiveWhole(1, 100); // Change the range as per your requirement
  let num2 = generateRandomPositiveWhole(1, 10); // Limit the second number to be less than 10
  const operator = generateRandomOperator();

  
  // Ensure the question does not result in a negative answer
  if (operator === '-' && num1 < num2) {
    [num1, num2] = [num2, num1]; // Swap num1 and num2
  }

  // Ensure the question does not result in a division with remainder
  if (operator === '/') {
    num1 = num2 * generateRandomPositiveWhole(1, 10); // Multiply num2 to get a divisible num1
  }

  return `${num1} ${operator} ${num2}`;
}

// Calculate the correct answer for a given math question
function calculateAnswer(question) {
  return eval(question);
}

// Generate a numeric pattern question
function generateNumericPatternQuestion() {
  const startNumber = Math.floor(Math.random() * 10); // Random start number between 0 and 9
  const difference = Math.floor(Math.random() * 5) + 1; // Random difference between 1 and 5
  const sequenceLength = Math.floor(Math.random() * 5) + 5; // Random sequence length between 5 and 9

  let pattern = [];
  for (let i = 0; i < sequenceLength; i++) {
    const number = startNumber + (i * difference);
    pattern.push(number);
  }

  const blankIndex = Math.floor(Math.random() * sequenceLength); // Randomly select the index of the blank
  pattern[blankIndex] = '___'; // Replace the number at the blank index with a blank

  return {
    question: pattern.join(', '),
    answer: startNumber + (blankIndex * difference)
  };
}

// Generate a geometric pattern question
function generateGeometricPatternQuestion() {
  const startNumber = Math.floor(Math.random() * 5) + 1; // Random start number between 1 and 5
  const ratio = Math.floor(Math.random() * 3) + 2; // Random ratio between 2 and 4
  const sequenceLength = Math.floor(Math.random() * 5) + 5; // Random sequence length between 5 and 9

  let pattern = [];
  let number = startNumber;
  for (let i = 0; i < sequenceLength; i++) {
    pattern.push(number);
    number *= ratio;
  }

  const blankIndex = Math.floor(Math.random() * sequenceLength); // Randomly select the index of the blank
  pattern[blankIndex] = '___'; // Replace the number at the blank index with a blank

  return {
    question: pattern.join(', '),
    answer: startNumber * Math.pow(ratio, blankIndex)
  };
}

// Display a new pattern question
function displayPatternQuestion() {
  const questionElement = document.getElementById('question');

  const patternType = Math.random() < 0.5 ? 'numeric' : 'geometric';
  let questionData;
  if (patternType === 'numeric') {
    questionData = generateNumericPatternQuestion();
  } else {
    questionData = generateGeometricPatternQuestion();
  }

  questionElement.textContent = questionData.question;
  return questionData.answer;
}

// Check the user's answer and display the result
function submitAnswer() {
  const userAnswer = document.getElementById('answer').value;
  const correctAnswer = displayPatternQuestion();
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');

  totalQuestions++; // Increment the total number of questions

  if (userAnswer === correctAnswer.toString()) {
    resultElement.textContent = 'Correct!';
    score++;
  } else {
    resultElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }

  scoreElement.textContent = `Total Questions: ${totalQuestions}, Score: ${score}`;
}

// Check if the user's answer is correct
function checkAnswer(userAnswer, correctAnswer) {
  return parseInt(userAnswer) === correctAnswer;
}

// Display a new math question
function displayQuestion() {
  const questionElement = document.getElementById('question');
  const question = generateQuestion();
  questionElement.textContent = question;
}

// Check the user's answer and display the result
function submitAnswer() {
  const userAnswer = document.getElementById('answer').value;
  const question = document.getElementById('question').textContent;
  const correctAnswer = calculateAnswer(question);
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');

  totalQuestions++; // Increment the total number of questions

  if (checkAnswer(userAnswer, correctAnswer)) {
    resultElement.textContent = 'Correct!';
    score++;
  } else {
    resultElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }

  scoreElement.textContent = `Total Questions: ${totalQuestions}, Score: ${score}`;

  // Clear the input field and display a new question
  document.getElementById('answer').value = '';
  displayQuestion();
}

// Check the user's answer and display the result for the pattern game
function submitPatternAnswer() {
  const userAnswer = document.getElementById('answer').value;
  const questionData = displayPatternQuestion(); // Retrieve the question data
  const correctAnswer = questionData.answer; // Get the correct answer from the question data
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');

  patternTotalQuestions++; // Increment the total number of pattern questions

  if (userAnswer === correctAnswer.toString()) {
    resultElement.textContent = 'Correct!';
    patternScore++;
  } else {
    resultElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }

  scoreElement.textContent = `Total Pattern Questions: ${patternTotalQuestions}, Pattern Score: ${patternScore}`;

  // Clear the input field and display a new pattern question
  document.getElementById('answer').value = '';
  displayPatternQuestion();
}



// Reset the game
function resetGame() {
  score = 0;
  patternScore = 0; // Reset the pattern score
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');

  // Reset the result and score display
  resultElement.textContent = '';
  scoreElement.textContent = `Score: ${score}, Total Pattern Questions: ${patternTotalQuestions}, Pattern Score: ${patternScore}`;

  displayQuestion();
}


// Initialize the game
function initGame() {
  score = 0; // Initialize the score
  displayQuestion();
  document.getElementById('submit').addEventListener('click', submitAnswer);
  document.getElementById('reset').addEventListener('click', resetGame);
  const answerInput = document.getElementById('answer');
  answerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      submitAnswer();
    }
  });
}

function initializePatternGame() {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', submitPatternAnswer); // Change the event listener function to submitPatternAnswer
  patternScore = 0; // Initialize the pattern score
  patternTotalQuestions = 0; // Initialize the total number of pattern questions
  displayPatternQuestion();
}


// Start the game when the page finishes loading
window.addEventListener('load', function() {
  initGame();
  // ...
});

// Event listener for the "Numbers and Operators" section
const numbersOperatorsButton = document.getElementById('numbersOperators');
numbersOperatorsButton.addEventListener('click', initGame);

// Event listener for the "Patterns" section
const patternsButton = document.getElementById('patterns');
patternsButton.addEventListener('click', initializePatternGame);

// Event listener for the "Shapes" section
const shapesButton = document.getElementById('shapes');
shapesButton.addEventListener('click', initializeShapesGame); // Provide implementation or remove if not used

// Event listener for the "Measurements" section
const measurementsButton = document.getElementById('measurements');
measurementsButton.addEventListener('click', initializeMeasurementsGame); // Provide implementation or remove if not used

// Event listener for the "Data Handling" section
const dataHandlingButton = document.getElementById('dataHandling');
dataHandlingButton.addEventListener('click', initializeDataHandlingGame); // Provide implementation or remove if not used