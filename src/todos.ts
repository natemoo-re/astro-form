export const todos: { title: string, id: string }[] = [];
let ids = 0;

export async function getTodos() {
    return todos;
}

export function addTodo(title: string) {
    todos.push({ title, id: `todos-${ids++}` });
}

export function deleteTodo(id: string) {
    const i = todos.findIndex(v => v.id === id)
    todos.splice(i, 1);
}
