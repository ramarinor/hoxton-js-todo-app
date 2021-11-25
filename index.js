const state = {
	showTodos: true,
	todos: [
		{
			title: "Buy Milk",
			completed: true,
			tag: "Test",
			user: "Rinor",
		},
		{
			title: "Do something",
			completed: false,
			tag: "Test",
			user: "Rinor",
		},
		{
			title: "Sleep",
			completed: true,
			tag: "Test",
			user: "Rinor",
		},
	],
};

function render() {
	renderCompleteTodos();
	renderIncomplteteTodos();
}

function renderCompleteTodos() {
	const todoListUl = document.querySelector(".todo-list");
	todoListUl.innerHTML = "";
	const incompleteTodos = state.todos.filter(function (todo) {
		return !todo.completed;
	});
	for (const todo of incompleteTodos) {
		const liEl = createTodoLiEl(todo);
		todoListUl.append(liEl);
	}
}

function renderIncomplteteTodos() {
	const completedSection = document.querySelector(".completed-section");
	if (state.showTodos) {
		completedSection.style.display = "block";
		const completedListUl = document.querySelector(".completed-list");
		completedListUl.innerHTML = "";
		const completeTodos = state.todos.filter(function (todo) {
			return todo.completed;
		});
		for (const todo of completeTodos) {
			const liEl = createTodoLiEl(todo);
			completedListUl.append(liEl);
		}
	} else {
		completedSection.style.display = "none";
	}
}

function createTodoLiEl(todo) {
	const liEl = document.createElement("li");
	liEl.classList.add("todo");

	const checkboxSection = document.createElement("div");
	checkboxSection.className = "checkbox-section";
	const checkboxEl = document.createElement("input");
	checkboxEl.className = "completed-checkbox";
	checkboxEl.setAttribute("type", "checkbox");
	checkboxSection.append(checkboxEl);

	checkboxEl.addEventListener("click", function () {
		todo.completed = !todo.completed;
		render();
	});

	const textSection = document.createElement("div");
	textSection.className = "text-section";
	const pEl = document.createElement("p");
	pEl.className = "text";
	pEl.textContent = todo.title;
	textSection.append(pEl);

	const buttonSection = document.createElement("div");
	buttonSection.className = "button-section";
	const editButton = document.createElement("button");
	editButton.className = "edit";
	editButton.textContent = "Edit";
	const deleteButton = document.createElement("button");
	deleteButton.className = "delete";
	deleteButton.textContent = "delete";
	buttonSection.append(editButton, deleteButton);

	liEl.append(checkboxSection, textSection, buttonSection);

	if (todo.completed) {
		liEl.classList.add("completed");
		checkboxEl.checked = true;
	}
	return liEl;
}

function addNewTodo(title) {
	const newTodo = {
		title: title,
		completed: false,
		tag: "Test",
		user: "Rinor",
	};
	state.todos.unshift(newTodo);
}

render();

const showCompletedCheckbox = document.querySelector(".show-completed-checkbox");
showCompletedCheckbox.addEventListener("click", function () {
	state.showTodos = !state.showTodos;
	render();
});

const addForm = document.querySelector(".add-item");
addForm.addEventListener("submit", function (event) {
	event.preventDefault();
	addNewTodo(addForm.text.value);
	addForm.reset();
	render();
});
