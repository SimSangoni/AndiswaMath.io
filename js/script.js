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

  if (checkAnswer(userAnswer, correctAnswer)) {
    resultElement.textContent = 'Correct!';
    score++;
  } else {
    resultElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    score = Math.max(0, score - 1); // Decrease score but keep it non-negative
  }

  // Update the score
  scoreElement.textContent = `Score: ${score}`;

  // Clear the input field and display a new question
  document.getElementById('answer').value = '';
  displayQuestion();
}

// Reset the game
function resetGame() {
  score = 0;
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');

  // Reset the result and score display
  resultElement.textContent = '';
  scoreElement.textContent = 'Score: 0';

  displayQuestion();
}

// Initialize the game
function initGame() {
  score = 0; // Initialize the score
  displayQuestion();
  document.getElementById('submit').addEventListener('click', submitAnswer);
  document.getElementById('reset').addEventListener('click', resetGame);
}

// Start the game when the page finishes loading
window.addEventListener('load', initGame);
