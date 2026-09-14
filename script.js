// Array to hold user expenses
let expenses = [];

// DOM Elements Selection
const dailyMoneyInput = document.getElementById('dailyMoney');
const itemNameInput = document.getElementById('itemNameInput');
const itemCostInput = document.getElementById('itemCostInput');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');
const calculateBtn = document.getElementById('calculateBtn');

const resultBox = document.getElementById('resultBox');
const totalExpenseText = document.getElementById('totalExpenseText');
const dailySavingsText = document.getElementById('dailySavingsText');
const weeklySavingsText = document.getElementById('weeklySavingsText');
const adviceText = document.getElementById('adviceText');

// --- EVENT LISTENER: ADD CUSTOM EXPENSE ---
addExpenseBtn.addEventListener('click', function() {
  const itemName = itemNameInput.value.trim();
  const itemCost = Number(itemCostInput.value);

  // Conditionals: Validation for empty item name or invalid cost
  if (itemName === "") {
    alert("Please enter the name of the item or snack!");
    return;
  }

  if (itemCost <= 0 || isNaN(itemCost)) {
    alert("Please enter a valid cost for the item!");
    return;
  }

  // Add cost to array
  expenses.push(itemCost);

  // DOM Manipulation: Dynamically append custom item and cost to list
  const listItem = document.createElement('li');
  listItem.innerHTML = `<span>${itemName}</span> <strong>₦${itemCost}</strong>`;
  expenseList.appendChild(listItem);

  // Clear input fields for the next entry
  itemNameInput.value = "";
  itemCostInput.value = "";
  itemNameInput.focus();
});

// --- EVENT LISTENER: CALCULATE BUDGET ---
calculateBtn.addEventListener('click', calculateBudget);

// --- FUNCTION: BUDGET CALCULATIONS & LOGIC ---
function calculateBudget() {
  const pocketMoney = Number(dailyMoneyInput.value);

  // Input Validation (Conditionals)
  if (pocketMoney <= 0 || isNaN(pocketMoney)) {
    alert("Please enter a valid amount for daily pocket money!");
    return;
  }

  // Loop through array to calculate total expense
  let totalExpense = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalExpense += expenses[i];
  }

  // Arithmetic Operators
  let dailySavings = pocketMoney - totalExpense;
  let weeklySavings = dailySavings * 5;

  // DOM Manipulation: Display results
  totalExpenseText.textContent = totalExpense;
  dailySavingsText.textContent = dailySavings;
  weeklySavingsText.textContent = weeklySavings;
  resultBox.style.display = 'block';

  // Conditionals for dynamic advice styling
  if (dailySavings < 0) {
    adviceText.className = "advice bad";
    adviceText.textContent = "Warning: You are spending more than your allowance!";
  } else if (dailySavings === 0) {
    adviceText.className = "advice bad";
    adviceText.textContent = "You spent all your allowance! Try saving at least ₦50 daily.";
  } else {
    adviceText.className = "advice good";
    adviceText.textContent = "Great job! You are saving money for future school needs!";
  }
}