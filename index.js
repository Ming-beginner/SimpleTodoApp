const root = document.getElementById("root");
const App = document.createElement("div");
const Input = document.createElement("input");
const List = document.createElement("ul");
const Submit = document.createElement("button");
const DelAll = document.createElement("button");
const Title = document.createElement("h1");
const InputBlock = document.createElement("div");

Title.innerHTML = "Simple Todo App";

Submit.innerText = "Add";

DelAll.innerText = "Finish All";
DelAll.classList.add("del-all");

Input.type = "text";
Input.placeholder = "Add some works...";

InputBlock.classList.add("input-block");
InputBlock.appendChild(Input);
InputBlock.appendChild(Submit);

App.appendChild(Title);
App.appendChild(InputBlock);
App.appendChild(List);
App.appendChild(DelAll);

App.classList.add("app");

root.appendChild(App);

function toDoList() {
  let workList = JSON.parse(localStorage.getItem("workList")) ?? [];

  const functionStore = {
    addWork(work) {
      workList.push(work);
      this.save();
      this.renderWork();
    },
    delWork(index) {
      workList.splice(index, 1);
      this.save();
      this.renderWork();
    },
    renderWork(node = List) {
      let workRender = workList
        .map((work, index) => {
          return `
                <div >
                  <li key=${index}>${work}</li>
                  <button onclick="Main.delWork(${index})">Finish</button>
                </div>
                `;
        })
        .join("");
      node.innerHTML = workRender;
    },
    delAllWork() {
      workList.splice(0, workList.length);
      this.save();
      this.renderWork();
    },
    save() {
      localStorage.setItem("workList", JSON.stringify(workList));
    },
    startWorking(work) {
      this.addWork(work);
    },
  };
  return functionStore;
}

const Main = toDoList();
Main.renderWork(List);
Submit.onclick = () => {
  Main.startWorking(Input.value);
  Input.value = "";
  Input.focus();
};

DelAll.onclick = () => {
  Main.delAllWork();
};

document.body.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    Submit.click();
  }
});
