import { Problem, ProblemInterface } from "./problems-interface.js";

// Add problems containers:
const body = document.body;
const homework = new ProblemInterface(body, "Homework");
const extra = new ProblemInterface(body, "Extra");

// helper function:
function addProblem(container, data, solution) {
  const problem = new Problem(data, solution);
  container.addProblemElement(problem.problemElement);
  return problem;
}

// -----------------------------------------------------------------------------
// Homework --------------------------------------------------------------------
// -----------------------------------------------------------------------------

const dataHw1 = {
  id: "hw1",
  problemText: "Sum of Elements: Write a program that calculates  the sum of all elements in an array of numbers.",
  inputs: ["List of numbers separated by ','"],
};

function solveHw1(arr) {}

const hwProblemObject1 = addProblem(homework, dataHw1, solveHw1);
hwProblemObject1.setBackgroundColor("pink");

// -----------------------------------------------------------------------------
// Extra (GeeksforGeeks patterns) ----------------------------------------------
// -----------------------------------------------------------------------------

const dataEx6 = {
  id: "ex6",
  problemText: "Pascal's Triangle",
  inputs: ["Enter a positive integer"],
};

function solveEx6(n) {
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

addProblem(extra, dataEx6, solveEx6);

//-----------------------------------------------------------------------------

const dataEx5 = {
  id: "ex5",
  problemText: "Number Triangular",
  inputs: ["Enter a positive integer"],
};

function solveEx5(n) {
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

addProblem(extra, dataEx5, solveEx5);

//-----------------------------------------------------------------------------

const dataEx4 = {
  id: "ex4",
  problemText: "Reverse Number Triangle Pattern",
  inputs: ["Enter a positive integer"],
};

function solveEx4(n) {
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

addProblem(extra, dataEx4, solveEx4);

//-----------------------------------------------------------------------------

const dataEx3 = {
  id: "ex3",
  problemText: "Right Pascal's Triangle",
  inputs: ["Enter a positive integer"],
};

function solveEx3(n) {
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

addProblem(extra, dataEx3, solveEx3);

//-----------------------------------------------------------------------------

const dataEx2 = {
  id: "ex2",
  problemText: "Butterfly star pattern",
  inputs: ["Enter a positive number"],
};

function solveEx2(n) {
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

addProblem(extra, dataEx2, solveEx2);

// --------------------------------------------------
const dataEx1 = {
  id: "ex1",
  problemText: "Check if a string is a palindrome",
  inputs: ["String"],
};

function solveEx1(str) {
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
const extraProblemObject1 = addProblem(extra, dataEx1, solveEx1);
extraProblemObject1.setBackgroundColor("pink");
