const state = {
	showCompltedTodos: true,
	todos: [
		{
			title: "task1",
			completed: true,
			tags: [],
			user: "Rinor",
		},
		{
			title: "task2",
			completed: false,
			tags: ["Important", "X-mas", "Optional"],
			user: "Ed",
		},
		{
			title: "task3",
			completed: true,
			tags: ["Food", "X-mas"],
			user: "Nico",
		},
		{
			title: "task4",
			completed: true,
			tags: ["Curriculum", "Hoxton", "Optional"],
			user: "Rinor",
		},
		{
			title: "task5",
			completed: false,
			tags: ["Hoxton", "X-mas"],
			user: "Ed",
		},
		{
			title: "task 6",
			completed: true,
			tags: ["Food", "Javascript"],
			user: "Nico",
		},
	],
	searchText: "",
	selectedTags: [],
	selectedUser: "",
};

//derived States
function getincompleteTodos() {
	return getSelectedTodos().filter(function (todo) {
		return !todo.completed;
	});
}

function getCompletedTodos() {
	return getSelectedTodos().filter(function (todo) {
		return todo.completed;
	});
}

function getSelectedTodos() {
	let selectedTodos = state.todos.filter(function (todo) {
		return todo.title.toLowerCase().includes(state.searchText.toLowerCase());
	});

	if (state.selectedTags.length > 0) {
		selectedTodos = selectedTodos.filter(function (todo) {
			return todo.tags.some(function (tag) {
				return state.selectedTags.includes(tag);
			});
		});
	}
	if (state.selectedUser.length > 0) {
		selectedTodos = selectedTodos.filter(function (todo) {
			return todo.user === state.selectedUser;
		});
	}
	return selectedTodos;
}
function getAllTags() {
	const allTags = [];

	for (const todo of state.todos) {
		for (const tag of todo.tags) {
			if (!allTags.includes(tag)) allTags.push(tag);
		}
	}

	return allTags;
}

function getAllUsers() {
	const allUsers = [];

	for (const todo of state.todos) {
		if (!allUsers.includes(todo.user)) {
			allUsers.push(todo.user);
		}
	}

	return allUsers;
}

//rendering functions
function render() {
	renderIncompleteTodos();
	renderCompltetedTodos();
	renderTags();
	renderUsernames();
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
function renderTags() {
	const allTags = getAllTags();
	tagsDiv.innerHTML = "";
	for (const tag of allTags) {
		const tagLabel = document.createElement("label");
		tagLabel.innerText = tag;
		tagLabel.className = "tag-label";
		const tagCheckbox = document.createElement("input");
		tagCheckbox.setAttribute("type", "checkbox");
		if (state.selectedTags.includes(tag)) {
			tagCheckbox.checked = true;
		}
		tagCheckbox.addEventListener("click", function () {
			if (tagCheckbox.checked) {
				state.selectedTags.push(tag);
			} else {
				state.selectedTags = state.selectedTags.filter(function (targetTag) {
					return targetTag !== tag;
				});
			}
			render();
		});
		tagLabel.prepend(tagCheckbox);
		tagsDiv.append(tagLabel);
	}
}
function renderUsernames() {
	usersDiv.innerHTML = "Choose a user ";
	const allUsers = getAllUsers();
	const selectEl = document.createElement("select");
	selectEl.setAttribute("name", "selectedUser");
	const optionEl = document.createElement("option");
	optionEl.textContent = "All users";
	optionEl.value = "";
	selectEl.append(optionEl);
	for (const user of allUsers) {
		const optionEl = document.createElement("option");
		optionEl.textContent = user;
		optionEl.value = user;
		optionEl.selected = optionEl.value === state.selectedUser;
		selectEl.append(optionEl);
	}
	selectEl.addEventListener("change", function () {
		state.selectedUser = selectEl.value;
		render();
	});

	usersDiv.append(selectEl);
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

	for (const tag of todo.tags) {
		const emEl = document.createElement("em");
		emEl.textContent = ` (${tag}) `;
		textSection.append(emEl);
	}

	const userSpan = document.createElement("span");
	userSpan.textContent = ` - ${todo.user}`;
	textSection.append(userSpan);

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

function changeSearchText(text) {
	state.searchText = text;
}

//
const todoListUl = document.querySelector(".todo-list");
const completedSection = document.querySelector(".completed-section");
const completedListUl = document.querySelector(".completed-list");
const tagsDiv = document.querySelector(".tags");
const usersDiv = document.querySelector(".users");

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
		user: addForm.username.value,
	};
	if (addForm.tags.value !== "") {
		newTodo.tags = addForm.tags.value.split(", ");
	} else {
		newTodo.tags = [];
	}
	addTodo(newTodo);
	addForm.reset();
	render();
});

const searchForm = document.querySelector(".search-todos");
searchForm.addEventListener("submit", function (event) {
	event.preventDefault();
	changeSearchText(searchForm.search.value);
	render();
});

searchForm.search.addEventListener("keyup", function () {
	changeSearchText(searchForm.search.value);
	render();
});
