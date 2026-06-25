
document.addEventListener("DOMContentLoaded", () => {

    const taskInput =
        document.getElementById("taskInput");

    const addBtn =
        document.getElementById("addBtn");

    const taskList =
        document.getElementById("taskList");

    const filterBtns =
        document.querySelectorAll(".filter-btn");

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    let currentFilter = "all";

    // ======================
    // SAVE TASKS
    // ======================

    function saveTasks() {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }

    // ======================
    // RENDER TASKS
    // ======================

    function renderTasks() {

        taskList.innerHTML = "";

        let filteredTasks = tasks;

        if(currentFilter === "active") {

            filteredTasks =
                tasks.filter(
                    task => !task.completed
                );

        }

        else if(
            currentFilter === "completed"
        ) {

            filteredTasks =
                tasks.filter(
                    task => task.completed
                );

        }

        filteredTasks.forEach(task => {

            const li =
                document.createElement("li");

            li.dataset.id = task.id;

            li.innerHTML = `

                <span class="${
                    task.completed
                    ? "completed"
                    : ""
                }">

                    ${task.text}

                </span>

                <div class="actions">

                    <button
                        class="complete-btn">

                        ${
                            task.completed
                            ? "Undo"
                            : "Done"
                        }

                    </button>

                    <button
                        class="edit-btn">

                        Edit

                    </button>

                    <button
                        class="delete-btn">

                        Delete

                    </button>

                </div>

            `;

            taskList.appendChild(li);

        });

    }

    // ======================
    // CREATE TASK
    // ======================

    addBtn.addEventListener(
        "click",
        () => {

            const text =
                taskInput.value.trim();

            if(text === "") {

                alert(
                    "Please enter a task."
                );

                return;

            }

            tasks.push({

                id: Date.now(),

                text: text,

                completed: false

            });

            saveTasks();

            renderTasks();

            taskInput.value = "";

        }
    );

    // ENTER KEY

    taskInput.addEventListener(
        "keypress",
        e => {

            if(e.key === "Enter") {

                addBtn.click();

            }

        }
    );

    // ======================
    // EVENT DELEGATION
    // ======================

    taskList.addEventListener(
        "click",
        e => {

            const li =
                e.target.closest("li");

            if(!li) return;

            const id =
                Number(li.dataset.id);

            // COMPLETE

            if(
                e.target.classList.contains(
                    "complete-btn"
                )
            ) {

                const task =
                    tasks.find(
                        task =>
                        task.id === id
                    );

                if(task) {

                    task.completed =
                        !task.completed;

                    saveTasks();

                    renderTasks();

                }

            }

            // EDIT

            if(
                e.target.classList.contains(
                    "edit-btn"
                )
            ) {

                const task =
                    tasks.find(
                        task =>
                        task.id === id
                    );

                const updatedText =
                    prompt(
                        "Edit Task",
                        task.text
                    );

                if(
                    updatedText &&
                    updatedText.trim() !== ""
                ) {

                    task.text =
                        updatedText.trim();

                    saveTasks();

                    renderTasks();

                }

            }

            // DELETE

            if(
                e.target.classList.contains(
                    "delete-btn"
                )
            ) {

                tasks =
                    tasks.filter(
                        task =>
                        task.id !== id
                    );

                saveTasks();

                renderTasks();

            }

        }
    );

    // ======================
    // FILTERING
    // ======================

    filterBtns.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterBtns.forEach(
                    btn =>
                    btn.classList.remove(
                        "active"
                    )
                );

                button.classList.add(
                    "active"
                );

                currentFilter =
                    button.dataset.filter;

                renderTasks();

            }
        );

    });

    // INITIAL LOAD

    renderTasks();

});

