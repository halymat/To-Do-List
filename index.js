const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
    list.forEach((task) => {
        toDoList(task);
    });
}

formEl.addEventListener("click", (event) => {
    event.preventDefault();
    const task = inputEl.value;
    if (!task) {
        return;
    }

    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value;
    if (task) {
        newTask = task.name;
    }

    const liEl = document.createElement("li");
    if (task && task.checked) {
        liEl.classList.add("checked");
    }
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);
    ulEl.insertBefore(liEl, ulEl.children[0]);
    inputEl.value = "";
    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `;
    liEl.appendChild(checkBtnEl);
    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });
    updateLocalStorage();
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach((liEl) => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked"),
        });
    });
    localStorage.setItem("list", JSON.stringify(list));
}