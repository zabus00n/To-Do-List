const generateRandomId = () => {
    return Math.floor(Math.random() * 99) + 1;
};

const toDoItemsJson = [
    { id: generateRandomId(), description: "Barrer la casa", state: 1, completed: true },
    { id: generateRandomId(), description: "Pasar la aspiradora", state: 0, completed: false },
    { id: generateRandomId(), description: "Estudiar mucho javascript", state: 0, completed: false }
];

const toDoList = document.querySelector(".to-do-list-container");
const newToDoItem = document.querySelector("#new-to-do-item");
const addBtn = document.querySelector(".cta-btn");
const total = document.querySelector(".total-count");
const done = document.querySelector(".done-count");

const updateToDoList = () => {
    let countDone = 0;
    let html = "";
    if (toDoItemsJson.length > 0) {
        html = "<table>";
        for (toDoItem of toDoItemsJson) {
            html += `<tr>
                        <td>${toDoItem.id}</td>
                        <td class="${toDoItem.completed ? 'completed' : ''}">${toDoItem.description}</td>
                        <td><input type="checkbox" class="checkbox" onclick="markedAsDone(${toDoItem.id})" ${toDoItem.completed ? 'checked' : ''}></td>
                        <td><img onclick="deleteToDoItem(${toDoItem.id})" class="trash-icon" src="./assets/img/trash-can-solid.svg" alt="Eliminar"></td>
                    </tr>`;
            if (toDoItem.completed) {
                countDone++;
            }
        }
        html += "</table>";
    }
    const tasksTable = document.getElementById("to-do-list-table");
    tasksTable.innerHTML = html;
    total.textContent = toDoItemsJson.length;
    done.textContent = countDone;
    newToDoItem.focus();
};

const addToDoItem = (task) => {
    let randomId = generateRandomId();
    const ids = toDoItemsJson.map((toDoItem) => toDoItem.id);
    while (ids.includes(randomId)) {
        randomId = generateRandomId();
    }
    toDoItemsJson.push({ id: randomId, description: task, state: 0, completed: false });
};

const deleteToDoItem = (id) => {
    const indexToDoItem = toDoItemsJson.findIndex((searchIndex) => searchIndex.id === id);
    toDoItemsJson.splice(indexToDoItem, 1);
    updateToDoList();
};

const markedAsDone = (id) => {
    const indexToDoItem = toDoItemsJson.findIndex((searchIndex) => searchIndex.id === id);
    toDoItemsJson[indexToDoItem].completed = !toDoItemsJson[indexToDoItem].completed;
    updateToDoList();
};

addBtn.addEventListener("click", () => {
    if (newToDoItem.value) {
        addToDoItem(newToDoItem.value);
        newToDoItem.value = "";
        updateToDoList();
    } else {
        alert("Por favor, ingresa una nueva tarea");
        newToDoItem.focus();
    }
});

updateToDoList();
