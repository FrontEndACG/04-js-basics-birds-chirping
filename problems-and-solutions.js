import { Problem, ProblemInterface } from "./problems-interface.js";

// Add problems containers:
const body = document.body;
const homework = new ProblemInterface(body, "Homework");
const extra = new ProblemInterface(body, "Extra");

// helper functions:
function addProblem(container, data, solution) {
  const problem = new Problem(data, solution);
  container.addProblemElement(problem.problemElement);
  return problem;
}

let id = 0;
function setID() {
  return id++;
}

// -----------------------------------------------------------------------------
// Homework --------------------------------------------------------------------
// -----------------------------------------------------------------------------

const sumOfElements = {
  data: {
    id: setID(),
    problemText: "Sum of Elements: Write a program that calculates  the sum of all elements in an array of numbers.",
    inputs: ["Enter numbers separated by ','"],
  },

  solve: function (str) {
    if (!str) return "Please enter a list of numbers.";
    let result = 0;
    let arr = str.split(/[\s]*[,][\s]*/); // Allow spaces around comma
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Number(arr[i]);
      if (isNaN(arr[i])) {
        return "List of numbers is not valid";
      }
      result += arr[i];
    }
    return `Sum: ${result}`;
  },
};

const sumOfElementsProblemObject = addProblem(homework, sumOfElements.data, sumOfElements.solve);
sumOfElementsProblemObject.setBackgroundColor("pink");

// -----------------------------------------------------------------------------

const averageOfElements = {
  data: {
    id: setID(),
    problemText: "Average of Elements: Calculate the average of elements in an array of numbers.",
    inputs: ["Enter numbers separated by ','"],
  },

  solve: function (str) {
    if (!str) return "Please enter a list of numbers.";

    let arr = str.trim().split(/[\s]*[,][\s]*/);

    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Number(arr[i]);
      if (isNaN(arr[i]) || arr[i] == "") {
        return "List of numbers is not valid";
      }
      result += arr[i];
    }
    return `Average: ${result / arr.length}`;
  },
};

addProblem(homework, averageOfElements.data, averageOfElements.solve);

// -----------------------------------------------------------------------------
const minMax = {
  data: {
    id: setID(),
    problemText: "Finding the Smallest/Largest Element: Find the smallest and largest element in an array of numbers.",
    inputs: ["Enter numbers separated by ','"],
  },

  solve: function (str) {
    if (!str) return "Please enter a list of numbers.";

    let arr = str.trim().split(/[\s]*[,][\s]*/);
    if (isNaN(arr[0] || arr[0] == "")) return "List is not valid.";

    let min = Number([arr[0]]);
    let max = Number([arr[0]]);
    for (let i = 1; i < arr.length; i++) {
      if (isNaN(arr[i]) || arr[i] == "") {
        return "List is not valid.";
      }
      if (Number([arr[i]]) < min) min = Number([arr[i]]);
      if (Number([arr[i]]) > max) max = Number([arr[i]]);
    }
    return `Smallest: ${min}\r\nLargest: ${max}`;
  },
};
addProblem(homework, minMax.data, minMax.solve);

// -----------------------------------------------------------------------------

const reverseArray = {
  data: {
    id: setID(),
    problemText: "Reverse an Array: Create a function that reverses an array of elements.",
    inputs: ["Enter elements separated by ','"],
  },

  solve: function (str) {
    if (!str) return "Please enter a list of elements.";

    let arr = str.trim().split(/[\s]*[,][\s]*/);
    for (let i = 0; i < arr.length / 2; i++) {
      [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    }

    return `Reversed Array: ${arr}`;
  },
};

addProblem(homework, reverseArray.data, reverseArray.solve);

// -----------------------------------------------------------------------------

const searchElement = {
  data: {
    id: setID(),
    problemText:
      "Search for an Element: Write a program that searches for a specific element in an array and returns its position \
     or an error message if the element is not found.",
    inputs: ["Enter elements separated by ','", "Element to find"],
  },

  solve: function (str, element) {
    if (!str) return "Please enter a list of elements.";
    if (!element) return "Please enter an element to find.";

    let arr = str.trim().split(/[\s]*[,][\s]*/);
    element = element.trim();
    let result = "Element not found.";
    let position = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i] === element) {
        position.push(i);
      }
    }
    if (position.length === 1) {
      result = `Element found at position ${position[0]}.`;
    } else if (position.length > 1) {
      result = `Element found at positions ${position.slice(0, position.length - 1).join(", ")} and ${
        position[position.length - 1]
      }.`;
    }
    return result;
  },
};

addProblem(homework, searchElement.data, searchElement.solve);

// -----------------------------------------------------------------------------

const searchType = {
  data: {
    id: setID(),
    problemText:
      'Counting Characters: Write a program that counts how many characters of a specific type are in a given string\
    ("L" - lowercase, "U" - uppercase, "N" - number, "S" - symbol, "SP" - spaces).',
    inputs: ["String", "Type of characters to find"],
  },

  solve: function (str, type) {
    let errorMessage = [];
    if (!str) errorMessage.push("Please enter a string.");
    if (!type) errorMessage.push("Please enter type of characters to count.");
    if (errorMessage.length > 0) return errorMessage.join("\r\n");

    searchTypeProblemObject.collapseWhitespace();
    let result;
    let charType;
    switch (type.toLowerCase()) {
      case "l":
        charType = "lowercase characters";
        result = (str.match(/[a-z]/g) || []).length;
        break;
      case "u":
        charType = "uppercase characters";
        result = (str.match(/[A-Z]/g) || []).length;
        break;
      case "n":
        charType = "numerals";
        result = (str.match(/[\d]/g) || []).length;
        break;
      case "s":
        charType = "symbol characters";
        result = (str.match(/[^a-zA-Z0-9\s]/g) || []).length;
        break;
      case "sp":
        charType = "spaces";
        result = (str.match(/[\s]/g) || []).length;
        break;
      default:
        searchTypeProblemObject.preserveWhitespace();
        return 'Invalid type. \r\nPlease choose from:\r\n\t"L" - lowercase\r\n\t"U" - uppercase\r\n\t"N" - number\r\n\t"S" - symbol\r\n\t"SP" - spaces';
    }
    return `Number of ${charType}: ${result}`;
  },
};

const searchTypeProblemObject = addProblem(homework, searchType.data, searchType.solve);

// -----------------------------------------------------------------------------

const isPalindrome = {
  data: {
    id: setID(),
    problemText: "Palindrome Check: Check if a given string is a palindrome.",
    inputs: ["String"],
  },

  solve: function (str) {
    if (!str) {
      return "Please enter a string.";
    }

    str = str.trim(" ");
    let result = `The string "${str}" is a palindrome.`;
    let i = 0;
    while (i < str.length - 1 / 2) {
      if (str[i] != str[str.length - 1 - i]) {
        result = `The string "${str}" is not a palindrome.`;
        break;
      }
      i++;
    }
    return result;
  },
};

const palindromeProblemObject = addProblem(homework, isPalindrome.data, isPalindrome.solve);
palindromeProblemObject.setBackgroundColor("mediumorchid");

// -----------------------------------------------------------------------------

const reverseString = {
  data: {
    id: setID(),
    problemText: "Reverse a String: Create a function that reverses a given string.",
    inputs: ["String"],
  },

  solve: function (str) {
    if (!str) {
      return "Please enter a string.";
    }

    let arr = str.trim(" ").split("");
    for (let i = 0; i < arr.length / 2; i++) {
      [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    }

    return `Reversed String: ${arr.join("")}`;
  },
};

addProblem(homework, reverseString.data, reverseString.solve);

// -----------------------------------------------------------------------------

const removeWhitespace = {
  data: {
    id: setID(),
    problemText: "Removing Whitespace: Remove all whitespace from a given string.",
    inputs: ["String"],
  },

  solve: function (str) {
    if (!str) {
      return "Please enter a string.";
    }
    let arr = [];
    for (let i = 0; i <= str.length; i++) {
      if (str[i] != " ") arr.push(str[i]);
    }
    return `Modified String: ${arr.join("")}`;
  },
};

addProblem(homework, removeWhitespace.data, removeWhitespace.solve);

// -----------------------------------------------------------------------------

const findSubstring = {
  data: {
    id: setID(),
    problemText:
      "Checking for Substrings: Write a program that checks if a given string contains a specific substring.",
    inputs: ["String", "Substring to check for"],
  },

  solve: function (str, substr) {
    let errorMessage = [];
    if (!str) errorMessage.push("Please enter a string.");
    if (!substr) errorMessage.push("Please enter a substring to check for.");
    if (errorMessage.length > 0) return errorMessage.join("\r\n");

    for (let i = 0; i <= str.length - 1; i++) {
      let count = 0;
      for (let j = 0; j <= substr.length - 1; j++) {
        if (str[i] != substr[j]) {
          break;
        }
        count++;
        i++;
      }
      if (count == substr.length) {
        return `The string contains the substring "${substr}".`;
      }
    }
    return `The string does not contain the substring "${substr}".`;
  },
};
addProblem(homework, findSubstring.data, findSubstring.solve);

// -----------------------------------------------------------------------------

const multiplicationTable = {
  data: {
    id: setID(),
    problemText: "Multiplication Table: Display the multiplication table for a given number using a for loop.",
    inputs: ["Number"],
  },

  solve: function (num) {
    num = num.trim();
    if (!num || isNaN(num)) return "Please enter a number.";
    let result = "";
    for (let i = 1; i <= 10; i++) {
      result += `\r\n${num} x ${i} = ${num * i}`;
    }
    return `Multiplication table for number ${num} is: ${result}`;
  },
};
const multiplicationTableProblemObject = addProblem(homework, multiplicationTable.data, multiplicationTable.solve);
multiplicationTableProblemObject.preserveWhitespace();

// -----------------------------------------------------------------------------

const primeNumbers = {
  data: {
    id: setID(),
    problemText: "Prime Numbers: Find all prime numbers up to a given number using a for loop.",
    inputs: ["Limit"],
  },

  isPrime: function (num) {
    let steps = 0;
    let i = 2;
    let lim = num;
    while (i < lim) {
      if (num % i == 0) return false;
      lim = num / i;
      i++;
      steps++;
    }
    console.log(steps);
    return true;
  },

  solve: function (num) {
    num = num.trim();
    if (!num || isNaN(num)) return "Please enter a number.";
    if (num <= 2) return `Prime numbers up to ${num}: none.`;
    let result = [2];
    for (let i = 3; i < num; i += 2) {
      if (primeNumbers.isPrime(i)) result.push(i);
    }
    console.log(result.length);
    return `Prime numbers up to ${num}: ${result.join(", ")}`;
  },
};
addProblem(homework, primeNumbers.data, primeNumbers.solve);

// -----------------------------------------------------------------------------

const firstNFibonacci = {
  data: {
    id: setID(),
    problemText: "Fibonacci Series: Display the first n numbers in the Fibonacci series using a for loop.",
    inputs: ["Count"],
  },

  solve: function (num) {
    if (!num || isNaN(num)) return "Please enter a number.";
    if (num < 1) return `Please enter a number greater than 1.`;

    let result = [];
    for (let i = 0; i <= num - 1; i++) {
      if (result.length < 2) {
        result[i] = i;
      } else {
        result[i] = result[i - 1] + result[i - 2];
      }
    }
    return `Fibonacci Series (first ${num == 1 ? "" : num} number${num == 1 ? "" : "s"}): ${result.join(", ")}`;
  },
};
addProblem(homework, firstNFibonacci.data, firstNFibonacci.solve);

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

const pascalsTriangle = addProblem(extra, dataEx6, solveEx6);
pascalsTriangle.preserveWhitespace();

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

const numberTriangular = addProblem(extra, dataEx5, solveEx5);
numberTriangular.preserveWhitespace();

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

const reverseNumber = addProblem(extra, dataEx4, solveEx4);
reverseNumber.preserveWhitespace();

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

const rightPascal = addProblem(extra, dataEx3, solveEx3);
rightPascal.preserveWhitespace();

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

const butterfly = addProblem(extra, dataEx2, solveEx2);
butterfly.preserveWhitespace();
