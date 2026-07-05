const input = document.getElementById("input");
const add = document.getElementById("add");
const list = document.getElementById("list");

function showTask(item) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = item.task;

    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.className = "edit";

    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Delete";
    deletebtn.className = "delete";

    li.appendChild(span);
    li.appendChild(editbtn);
    li.appendChild(deletebtn);

    list.appendChild(li);

    deletebtn.addEventListener("click", async function () {

        await fetch(`http://localhost:3000/tasks/${item.id}`, {
            method: "DELETE"
        });

        li.remove();

    });

    editbtn.addEventListener("click", async function () {

        const newTask = prompt("Edit Task", span.innerText);

        if (newTask === null || newTask.trim() === "") {
            return;
        }

        const res = await fetch(`http://localhost:3000/tasks/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: newTask.trim()
            })
        });

        const updated = await res.json();

        span.innerText = updated.task;

    });
}

async function loadTasks() {

    list.innerHTML = "";

    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();

    data.forEach(function (item) {
        showTask(item);
    });

}

add.addEventListener("click", async function () {

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: task
        })
    });

    const newTask = await res.json();

    showTask(newTask);

    input.value = "";
    input.focus();

});

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        add.click();
    }

});

loadTasks();