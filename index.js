const state = {
	showCompltedTodos: true,
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

//derived States
function getincompleteTodos() {
	return state.todos.filter(function (todo) {
		return !todo.completed;
	});
}

function getCompletedTodos() {
	return state.todos.filter(function (todo) {
		return todo.completed;
	});
}

//rendering functions
function render() {
	renderIncompleteTodos();
	renderCompltetedTodos();
}
function renderIncompleteTodos() {
	todoListUl.innerHTML = "";
	const incompleteTodos = getincompleteTodos();
	for (const todo of incompleteTodos) {
		const liEl = createTodoLiEl(todo);
		todoListUl.append(liEl);
	}
}

function renderCompltetedTodos() {
	if (state.showCompltedTodos) {
		completedSection.style.display = "block";
		completedListUl.innerHTML = "";
		const completedTodos = getCompletedTodos();
		for (const todo of completedTodos) {
			const liEl = createTodoLiEl(todo);
			completedListUl.append(liEl);
		}
	} else {
		completedSection.style.display = "none";
	}
}
// create todo list element function
function createTodoLiEl(todo) {
	const liEl = document.createElement("li");
	liEl.className = "todo";
	if (todo.completed) {
		liEl.classList.add("completed");
	}

	const checkboxSection = document.createElement("div");
	checkboxSection.className = "checkbox-section";
	const checkboxEl = document.createElement("input");
	checkboxEl.className = "completed-checkbox";
	checkboxEl.setAttribute("type", "checkbox");
	checkboxEl.checked = todo.completed;
	checkboxSection.append(checkboxEl);

	checkboxEl.addEventListener("click", function () {
		toggleTodo(todo);
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
	deleteButton.addEventListener("click", function () {
		deleteTodo(todo);
		render();
	});

	liEl.append(checkboxSection, textSection, buttonSection);

	return liEl;
}

//action functions
function addTodo(todo) {
	state.todos.unshift(todo);
}
function toggleTodo(todo) {
	todo.completed = !todo.completed;
}
function deleteTodo(todo) {
	const indexToDeltete = state.todos.indexOf(todo);
	state.todos.splice(indexToDeltete, 1);
}
function toggleShowCompletedTodos() {
	state.showCompltedTodos = !state.showCompltedTodos;
}

const todoListUl = document.querySelector(".todo-list");
const completedSection = document.querySelector(".completed-section");
const completedListUl = document.querySelector(".completed-list");

render();

const showCompletedCheckbox = document.querySelector(".show-completed-checkbox");
showCompletedCheckbox.addEventListener("click", function () {
	toggleShowCompletedTodos();
	render();
});

const addForm = document.querySelector(".add-item");
addForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const newTodo = {
		title: addForm.text.value,
		completed: false,
		tag: "Test",
		user: "Rinor",
	};
	addTodo(newTodo);
	addForm.reset();
	renderIncompleteTodos();
});
