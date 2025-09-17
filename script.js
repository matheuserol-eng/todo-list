const form = document.querySelector("#todo-form")
const input = document.querySelector("#title")
const list = document.querySelector('#todo-list')

const load = () => {
    try {
        return JSON.parse(localStorage.getItem("tasks") ?? [])
    } catch {
        return []
    }
    }

    const save = (t) => localStorage.setItem("tasks", JSON.stringify(t))

    let tasks = load()
    render(tasks)

form.addEventListener("submit",e => {
    e.preventDefault()

    const title = input.value.trim()

    if (!title) {
        alert("O título é obrigatório.")
        return
    }
    tasks = [...tasks, { id: String(Date.now()), title, done: false }]

    save(tasks)
    render(tasks)

    form.reset()
    input.focus()
})

list.addEventListener("click",(e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.matches(".toggle")) {
        tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    }

    if (e.target.matches(".remove-btn")) {
        tasks = tasks.filter(t => t.id !== id);
    }
    save(tasks); render(tasks);
    });
function render(items) {
    list.innerHTML = "";
    for (const t of items) {
        const li = document.createElement("li");

        li.dataset.id = t.id;
        li.className = "todo-item" + (t.done ? " done" : "");
        li.innerHTML = `<input type="checkbox" class="toggle" ${t.done ? "checked" : ""}>
        <span class="title"></span>
        <button type="button" class="remove-btn" aria-label="Remove task">x</button>`
        ;
        li.querySelector(".title").textContent = t.title; 
        list.appendChild(li);
    }
}

//const li = document.createElement("li")

//li.textContent = "Estudar com os materiais do classRoom"
//list.append(li)

//list.addEventListener("click", event => {
//const li = event.target.closest("li")
    
//if(!li) return

//li.classList.toggle("done")
//})