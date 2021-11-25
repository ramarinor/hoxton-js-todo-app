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

function render(state) {
	renderCompleteTodos(state);
	renderIncomplteteTodos(state);
}

function renderCompleteTodos(state) {
	const todoListUl = document.querySelector(".todo-list");
	todoListUl.innerHTML = "";
	const incompleteTodos = state.todos.filter(function (todo) {
		return !todo.completed;
	});
	for (const todo of incompleteTodos) {
		const liEl = createTodoLiElement(todo);
		todoListUl.append(liEl);
	}
}

function renderIncomplteteTodos(state) {
	const completedSection = document.querySelector(".completed-section");
	if (state.showTodos) {
		completedSection.style.display = "block";
		const completedListUl = document.querySelector(".completed-list");
		completedListUl.innerHTML = "";
		const completeTodos = state.todos.filter(function (todo) {
			return todo.completed;
		});
		for (const todo of completeTodos) {
			const liEl = createTodoLiElement(todo);
			completedListUl.append(liEl);
		}
	} else {
		completedSection.style.display = "none";
	}
}

function createTodoLiElement(todo) {
	const liEl = document.createElement("li");
	liEl.classList.add("todo");
	if (todo.completed) {
		liEl.classList.add("completed");
	}

	const checkboxSection = document.createElement("div");
	checkboxSection.className = "checkbox-section";
	const checkboxEl = document.createElement("input");
	checkboxEl.className = "completed-checkbox";
	checkboxEl.setAttribute("type", "checkbox");
	checkboxSection.append(checkboxEl);

	const textSection = document.createElement("div");
	textSection.className = "text-section";
	const pEl = document.createElement("p");
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
	return liEl;
}

render(state);

const showCompletedCheckbox = document.querySelector(".show-completed-checkbox");
showCompletedCheckbox.addEventListener("click", function () {
	state.showTodos = !state.showTodos;
	render(state);
});
