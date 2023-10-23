class ProblemInterface {
  constructor(parentContainer, title) {
    this.parentContainer = parentContainer;
    this.title = title;
    this.problemsContainer;
    this.opacitySwitch;
    this.activeProblem = null;
    this.toggleOpacityHandler = this.toggleOpacity.bind(this);
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
    this.opacitySwitch.addEventListener("click", this.toggleOpacityHandler);
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

  getAllProblems() {
    return [...this.problemsContainer.children];
  }

  toggleOpacity() {
    const showAllAttr = this.problemsContainer.getAttribute("data-showall");
    if (!showAllAttr || showAllAttr === "false") {
      this.showAllProblems();
    } else {
      this.hideProblems();
    }
  }

  hideProblems() {
    if (this.activeProblem == null) return;

    const problems = this.getAllProblems();
    problems.forEach((p) => {
      p.classList.remove("selected-problem");
    });
    this.focusProblem(this.activeProblem);
    this.activeProblem.classList.remove("focus");
    this.opacitySwitch.classList.remove("on");
    this.problemsContainer.setAttribute("data-showall", "false");
  }

  showAllProblems() {
    if (this.activeProblem == null) return;

    const problems = this.getAllProblems();
    problems.forEach((p) => {
      p.classList.add("selected-problem");
    });
    this.activeProblem.classList.add("focus");
    this.opacitySwitch.classList.add("on");
    this.problemsContainer.setAttribute("data-showall", "true");
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
    if (!problem.classList.contains("selected-problem")) {
      this.activeProblem.classList.remove("selected-problem");
      problem.classList.add("selected-problem");
    }
    if (this.problemsContainer.getAttribute("data-showall") === "true") {
      this.activeProblem.classList.remove("focus");
      problem.classList.add("focus");
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

    const outputContent = document.createElement("div");
    outputContent.classList.add("output-content");
    output.appendChild(outputContent);

    resultBtn.addEventListener("click", () => {
      outputContent.textContent = this.callback(...this.problemInputs.map((input) => input.value));
    });

    return this.problemElement;
  }

  preserveWhitespace() {
    this.problemElement.querySelector(".output-content").classList.add("pre");
  }

  collapseWhitespace() {
    this.problemElement.querySelector(".output-content").classList.remove("pre");
  }
  setBackgroundColor(color) {
    this.problemElement.style.backgroundColor = color;
  }
}

export { Problem, ProblemInterface };
