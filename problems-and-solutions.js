import { Problem, ProblemInterface } from "./problems-interface.js";

// Add problems containers:
const appContainer = document.querySelector(".app");
const homework = new ProblemInterface(appContainer, "Homework");
const extra = new ProblemInterface(appContainer, "Extra");

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

addProblem(homework, sumOfElements.data, sumOfElements.solve);

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
addProblem(homework, minMax.data, minMax.solve).setBackgroundColor("mediumorchid");

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

addProblem(homework, isPalindrome.data, isPalindrome.solve).setBackgroundColor("mediumorchid");

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
addProblem(homework, multiplicationTable.data, multiplicationTable.solve).preserveWhitespace();

const primeNumbers = {
  data: {
    id: setID(),
    problemText: "Prime Numbers: Find all prime numbers up to a given number using a for loop.",
    inputs: ["Limit"],
  },

  isPrime: function (num) {
    let i = 2;
    while (i <= Math.sqrt(num)) {
      if (num % i == 0) return false;
      i++;
    }
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
    // console.log(result.length);
    return `Prime numbers up to ${num}: ${result.join(", ")}`;
  },
};
addProblem(homework, primeNumbers.data, primeNumbers.solve);

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

const pascalsTriangle = {
  data: {
    id: setID(),
    problemText: "Pascal's Triangle",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
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
  },
};
addProblem(extra, pascalsTriangle.data, pascalsTriangle.solve).preserveWhitespace();

const palindromeTriangular = {
  data: {
    id: setID(),
    problemText: "Palindrome Triangular",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

    let result = [];
    let val = 1;

    for (let i = 0; i <= n - 1; i++) {
      let row = [];
      for (let j = 0; j <= 2 * i; j++) {
        row.push(val);
        if (j < i) {
          val--;
        } else {
          val++;
        }
      }
      result.push(row.join(" ").padStart(2 * (n + i) - 1));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, palindromeTriangular.data, palindromeTriangular.solve).preserveWhitespace();

const mirrorImageTriangle = {
  data: {
    id: setID(),
    problemText: "Mirror Image  Triangle",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

    let result = [];
    let spacesCount = 0;
    for (let i = 0; i <= 2 * (n - 1); i++) {
      let row = "";
      for (let j = 0; j <= n; j++) {
        if (j > spacesCount) {
          row += `${j}   `;
        } else {
          row += `  `;
        }
      }
      result.push(row);
      if (i < n - 1) spacesCount++;
      if (i >= n - 1) spacesCount--;
    }
    return result.join("\r\n");
  },
};
addProblem(extra, mirrorImageTriangle.data, mirrorImageTriangle.solve).preserveWhitespace();

const hollowHourglass = {
  data: {
    id: setID(),
    problemText: "Hollow Hourglass Pattern",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

    let result = [];
    let spacesCount = 0;
    for (let i = 0; i <= 2 * (n - 1); i++) {
      let row = "";
      for (let j = 0; j <= n; j++) {
        if (j > spacesCount) {
          if (j == spacesCount + 1 || j == n || i == 0 || i == 2 * (n - 1)) {
            row += `*   `;
          } else row += "    ";
        } else {
          row += `  `;
        }
      }
      result.push(row);
      if (i < n - 1) spacesCount++;
      if (i >= n - 1) spacesCount--;
    }
    return result.join("\r\n");
  },
};
addProblem(extra, hollowHourglass.data, hollowHourglass.solve).preserveWhitespace();

const diamondPattern = {
  data: {
    id: setID(),
    problemText: "Diamond Pattern",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

    let result = [];
    let rowStarCount = 1;
    for (let i = 0; i <= 2 * (n - 1); i++) {
      // Variant 1 --------------
      // let row = "";
      // for (let j = n - 1; j >= 0; j--) {
      //   if (j >= rowStarCount) {
      //     row += "  ";
      //   } else {
      //     row += "*   ";
      //   }
      // }
      // result.push(row);

      // Variant 2 ---------------
      let row = [];
      for (let j = 0; j < rowStarCount; j++) {
        row.push(`*`);
      }
      result.push(row.join("   ").padStart(2 * (n + rowStarCount) - 3));
      // -------------------------

      if (i < n - 1) rowStarCount++;
      if (i >= n - 1) rowStarCount--;
    }
    return result.join("\r\n");
  },
};
addProblem(extra, diamondPattern.data, diamondPattern.solve).preserveWhitespace();

const hollowDiamond = {
  data: {
    id: setID(),
    problemText: "Hollow Diamond Pyramid",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

    let result = [];
    let rowStarCount = 1;
    for (let i = 0; i <= 2 * (n - 1); i++) {
      let row = [];
      for (let j = 0; j < rowStarCount; j++) {
        if (j == 0 || j == rowStarCount - 1) {
          row.push(`*`);
        } else {
          row.push(" ");
        }
      }
      result.push(row.join("   ").padStart(2 * (n + rowStarCount) - 3));
      if (i < n - 1) rowStarCount++;
      if (i >= n - 1) rowStarCount--;
    }
    return result.join("\r\n");
  },
};
addProblem(extra, hollowDiamond.data, hollowDiamond.solve).preserveWhitespace();

const kPattern = {
  data: {
    id: setID(),
    problemText: "K Pattern",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0 || n >= 10) return "Please enter a positive integer smaller than 10.";

    let result = [];
    let lim = n;
    for (let i = 0; i <= 2 * (n - 1); i++) {
      let row = [];
      for (let j = 0; j < lim; j++) {
        row.push(`*`);
      }
      if (i < n - 1) lim--;
      if (i >= n - 1) lim++;
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, kPattern.data, kPattern.solve).preserveWhitespace();

const numberTriangular = {
  data: {
    id: setID(),
    problemText: "Number Triangular",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
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
  },
};
addProblem(extra, numberTriangular.data, numberTriangular.solve).preserveWhitespace();

const reverseNumberTriangle = {
  data: {
    id: setID(),
    problemText: "Reverse Number Triangle Pattern",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
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
  },
};
addProblem(extra, reverseNumberTriangle.data, reverseNumberTriangle.solve).preserveWhitespace();

const rightPascal = {
  data: {
    id: setID(),
    problemText: "Right Pascal's Triangle",
    inputs: ["Enter a positive integer"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter a positive integer.";

    let result = "";
    for (let i = 0; i < n * 2 - 1; i++) {
      for (let j = 0; j < n; j++) {
        if (i % 2 == j % 2 && i >= j && i + j < n * 2) {
          result += " * ";
        } else {
          result += "   ";
        }
      }
      result += "\r\n";
    }
    return result;
  },
};
addProblem(extra, rightPascal.data, rightPascal.solve).preserveWhitespace();

const butterfly = {
  data: {
    id: setID(),
    problemText: "Butterfly star pattern",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
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
  },
};
addProblem(extra, butterfly.data, butterfly.solve).preserveWhitespace();

const rhombusPattern = {
  data: {
    id: setID(),
    problemText: "Rhombus Pattern",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    let firstRow = "";
    for (let i = 0; i <= n - 1; i++) {
      firstRow += `* `;
    }
    result.push(firstRow);

    for (let i = 0; i <= n - 1; i++) {
      firstRow = " " + firstRow;
      result.push(firstRow);
    }
    return result.join("\r\n");
  },
};
addProblem(extra, rhombusPattern.data, rhombusPattern.solve).preserveWhitespace();

const numberIncreasingPyramid = {
  data: {
    id: setID(),
    problemText: "Number Increasing Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= i; j++) {
        row.push(j);
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, numberIncreasingPyramid.data, numberIncreasingPyramid.solve).preserveWhitespace();

const numberIncreasingReversePyramid = {
  data: {
    id: setID(),
    problemText: "Number Increasing Reverse Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= n - i + 1; j++) {
        row.push(j);
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, numberIncreasingReversePyramid.data, numberIncreasingReversePyramid.solve).preserveWhitespace();

const numberChangingPyramid = {
  data: {
    id: setID(),
    problemText: "Number Changing Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    let val = 0;
    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= i; j++) {
        row.push(`${++val}`.padEnd(3));
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, numberChangingPyramid.data, numberChangingPyramid.solve).preserveWhitespace();

const zeroOneTriangle = {
  data: {
    id: setID(),
    problemText: "Zero One Triangle",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    let val = 0;
    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= i; j++) {
        row.push(Number(j % 2 == i % 2));
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, zeroOneTriangle.data, zeroOneTriangle.solve).preserveWhitespace();

const rightHalfPyramid = {
  data: {
    id: setID(),
    problemText: "Right Half Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= i; j++) {
        row.push("*");
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, rightHalfPyramid.data, rightHalfPyramid.solve).preserveWhitespace();

const reverseRightHalfPyramid = {
  data: {
    id: setID(),
    problemText: "Reverse Right Half Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= n - i + 1; j++) {
        row.push("*");
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, reverseRightHalfPyramid.data, reverseRightHalfPyramid.solve).preserveWhitespace();

const leftHalfPyramid = {
  data: {
    id: setID(),
    problemText: "Left Half Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= n; j++) {
        j > n - i ? row.push("*") : row.push(" ");
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, leftHalfPyramid.data, leftHalfPyramid.solve).preserveWhitespace();

const reverseLeftHalfPyramid = {
  data: {
    id: setID(),
    problemText: "Reverse Left Half Pyramid",
    inputs: ["Enter a positive number"],
  },

  solve: function (n) {
    n = Number(n);
    if (!Number.isInteger(n) || n <= 0) return "Please enter \r\na positive integer.";
    let result = [];

    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= n; j++) {
        j >= i ? row.push("*") : row.push(" ");
      }
      result.push(row.join(" "));
    }
    return result.join("\r\n");
  },
};
addProblem(extra, reverseLeftHalfPyramid.data, reverseLeftHalfPyramid.solve).preserveWhitespace();

homework.showAllProblems();
