state = {
	showTodos: true,
	todos: [
		{
			title: "Buy Milk",
			completed: false,
			tag: "Test",
			user: "Rinor",
		},
		{
			title: "Do something",
			completed: true,
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
{
	/* <div class="completed-section">
		<input class="completed-checkbox" type="checkbox" />
	</div>
	<div class="text-section">
		<p class="text">Go shopping</p>
	</div>
	<div class="button-section">
		<button class="edit">Edit</button>
		<button class="delete">Delete</button>
	</div> */
}
function createTodoLiElement(todo) {
	const liEl = document.createElement("li");
	liEl.classList.add(todo);
	if (todo.completed) {
		liEl.classList.add("completed");
	}
}

function render() {
	const todoListUl = document.querySelector(".todo-list");
	const completedListUl = document.querySelector(".completed-list");
	incompleteTodos = state.todos.filter(function (todo) {
		return !todo.completed;
	});
	completeTodos = state.todos.filter(function (todo) {
		return todo.completed;
	});
	for (const todo of incompleteTodos) {
	}
	for (const todo of completeTodos) {
		console.log(todo);
	}
}

render();
