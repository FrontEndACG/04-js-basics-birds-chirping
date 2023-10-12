class ProblemInterface {
  constructor(parentContainer, title) {
    this.parentContainer = parentContainer;
    this.title = title;
    this.problemsContainer;
    this.opacitySwitch;
    this.activeProblem = null;
    this.showAllProblemsHandler = this.showAllProblems.bind(this);
    this.changeFocusHandler = this.changeFocus.bind(this);
    this.createProblemsContainer();
  }

  createProblemsContainer() {
    this.parentContainer.appendChild(this.createHeader());

    this.problemsContainer = document.createElement("div");
    this.problemsContainer.classList.add("problems-container");
    this.problemsContainer.addEventListener("click", this.changeFocusHandler);
    this.parentContainer.appendChild(this.problemsContainer);

    return this.problemsContainer;
  }

  createHeader() {
    const header = document.createElement("div");
    header.classList.add("header");

    const titleContainer = document.createElement("div");
    titleContainer.textContent = this.title;
    titleContainer.classList.add("title");
    header.appendChild(titleContainer);

    this.opacitySwitch = document.createElement("div");
    this.opacitySwitch.classList.add("switch");
    this.opacitySwitch.addEventListener("click", this.showAllProblemsHandler);
    header.appendChild(this.opacitySwitch);

    return header;
  }

  addProblemElement(problemElement) {
    this.problemsContainer.appendChild(problemElement);
    if (this.activeProblem === null) {
      this.activeProblem = problemElement;
      this.focusProblem(this.activeProblem);
    }
  }

  showAllProblems() {
    const problems = [...this.problemsContainer.children];
    const state = this.problemsContainer.getAttribute("data-showall");

    if (!state || state === "false") {
      problems.forEach((p) => {
        p.classList.add("selected-problem");
      });
      this.opacitySwitch.classList.add("selected");
      this.problemsContainer.setAttribute("data-showall", "true");
    } else {
      problems.forEach((p) => {
        p.classList.remove("selected-problem");
      });
      this.focusProblem(this.activeProblem);
      this.opacitySwitch.classList.remove("selected");
      this.problemsContainer.setAttribute("data-showall", "false");
    }
  }

  changeFocus(e) {
    let targetNode = e.target;
    while (!!targetNode.parentNode && !targetNode.classList.contains("problem-wrapper")) {
      targetNode = targetNode.parentNode;
    }
    this.focusProblem(targetNode);
  }

  focusProblem(problem) {
    if (!problem.classList) return;
    if (problem.classList == "problem-wrapper") {
      if (this.activeProblem != null) {
        this.activeProblem.classList.remove("selected-problem");
      }
      problem.classList.add("selected-problem");
    }
    this.activeProblem = problem;
  }
}

class Problem {
  constructor(problem, callback) {
    this.problem = problem;
    this.callback = callback;
    this.problemElement = this.createProblemElement();
  }

  createProblemElement() {
    this.problemInputs = [];
    this.problemElement = document.createElement("div");
    this.problemElement.classList.add("problem-wrapper");

    const problemTextContainer = document.createElement("div");
    problemTextContainer.textContent = this.problem.problemText;
    problemTextContainer.classList.add("problem-text");
    this.problemElement.appendChild(problemTextContainer);

    this.problem.inputs.forEach((input, index) => {
      const inputElement = document.createElement("input");
      inputElement.setAttribute("id", `${this.problem.id}_${index}`);
      inputElement.setAttribute("placeholder", `${input}`);
      this.problemInputs.push(inputElement);
      this.problemElement.appendChild(inputElement);
    });

    const resultBtn = document.createElement("button");
    resultBtn.textContent = "Result";
    resultBtn.classList.add("result-btn");
    this.problemElement.appendChild(resultBtn);

    const output = document.createElement("div");
    output.classList.add("output");
    this.problemElement.appendChild(output);

    resultBtn.addEventListener("click", () => {
      output.textContent = this.callback(...this.problemInputs.map((input) => input.value));
    });

    return this.problemElement;
  }

  setBackgroundColor(color) {
    this.problemElement.style.backgroundColor = color;
  }
}

export { Problem, ProblemInterface };
