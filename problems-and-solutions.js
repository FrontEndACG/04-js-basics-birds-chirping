import ProblemInterface from "./problems-interface.js";

// Add problems containers:
const body = document.body;
const homework = new ProblemInterface(body, "Homework");
const extra = new ProblemInterface(body, "Extra");

// Solve and add problem(s) to container(s).

// -----------------------------------------------------------------------------
// Homework --------------------------------------------------------------------
// -----------------------------------------------------------------------------
const hw1 = {
  id: "hw1",
  problemText: "Sum of Elements: Write a program that calculates  the sum of all elements in an array of numbers.",
  inputs: ["List of numbers separated by ','"],
};

function solveHw1(arr) {}

homework.addProblem(hw1, solveHw1);

//-----------------------------------------------------------------------------

const problem6 = {
  id: "6",
  problemText: "Pascal's Triangle",
  inputs: ["Enter a positive integer"],
};

function solveProblem6(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

  let result = [];
  let previousLine = null;

  for (let i = 0; i < n; i++) {
    let line = [];
    if (!previousLine) {
      line.push(1);
      previousLine = line;
    } else {
      line.push(1);
      for (let j = 0; j < i - 1; j++) {
        line.push(previousLine[j] + previousLine[j + 1]);
      }
      line.push(1);
      previousLine = line;
    }
    line = "  ".repeat(n - i - 1) + line.map((n) => String(n).padEnd(3, " ")).join(" ");
    result.push(line);
  }
  result = result.join("\r\n");

  return result;
}

extra.addProblem(problem6, solveProblem6);

// -----------------------------------------------------------------------------
// Extra (GeeksforGeeks patterns) ----------------------------------------------
// -----------------------------------------------------------------------------
const problem5 = {
  id: "5",
  problemText: "Number Triangular",
  inputs: ["Enter a positive integer"],
};

function solveProblem5(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

  let result = "";
  for (let i = 1; i <= n; i++) {
    result += " ".repeat(n - i);
    for (let j = 1; j <= i; j++) {
      result += i + " ";
    }
    result += "\r\n";
  }
  return result;
}

extra.addProblem(problem5, solveProblem5);

//-----------------------------------------------------------------------------

const problem4 = {
  id: "4",
  problemText: "Reverse Number Triangle Pattern",
  inputs: ["Enter a positive integer"],
};

function solveProblem4(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

  let result = "";
  for (let i = 1; i <= n; i++) {
    result += " ".repeat(i - 1);
    for (let j = i; j <= n; j++) {
      result += j + " ";
    }
    result += "\r\n";
  }

  return result;
}

extra.addProblem(problem4, solveProblem4);

//-----------------------------------------------------------------------------

const problem3 = {
  id: "3",
  problemText: "Right Pascal's Triangle",
  inputs: ["Enter a positive integer"],
};

function solveProblem3(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n <= 0) return "Please enter a positive integer.";

  let result = "";
  for (let i = 0; i < n * 2 - 1; i++) {
    for (let j = 0; j < n; j++) {
      if (i % 2 == j % 2 && i >= j && i + j < n * 2) {
        result += "⚫";
      } else {
        result += "⚪";
      }
    }
    result += "\r\n";
  }

  return result;
}

extra.addProblem(problem3, solveProblem3);

//-----------------------------------------------------------------------------

const problem2 = {
  id: "2",
  problemText: "Butterfly star pattern",
  inputs: ["Enter a positive number"],
};

function solveProblem2(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
  let result = "";

  for (let i = 0; i < n * 2 - 1; i++) {
    for (let j = 0; j < n * 2 - 1; j++) {
      if (i % 2 == j % 2 && ((i >= j && i + j < n * 2) || (i <= j && i + j >= n * 2 - 2))) {
        result += " * ";
        // result += `${i}${j}`;
      } else {
        result += "   ";
      }
    }
    result += "\r\n";
  }
  return result;
}

extra.addProblem(problem2, solveProblem2);

// --------------------------------------------------
const problem1 = {
  id: "1",
  problemText: "Check if a string is a palindrome",
  inputs: ["String"],
};

function solveProblem1(str) {
  if (!str) {
    return "Please enter a string.";
  }
  let result = "The string is a palindrome.";
  let i = 0;
  while (i < str.length - 1 / 2) {
    if (str[i] != str[str.length - 1 - i]) {
      result = "The string is NOT a palindrome.";
      break;
    }
    i++;
  }
  return result;
}
extra.addProblem(problem1, solveProblem1);
