export const todos: { title: string, color: string, id: string }[] = [];
let ids = 0;

export async function getTodos() {
    return todos;
}

export function addTodo(title: string) {
    todos.push({ title, color: 'red', id: `todos-${ids++}` });
}

export function updateTodo(id: string, data: Partial<typeof todos[number]>) {
    const i = todos.findIndex(v => v.id === id)
    todos.splice(i, 1, { ...todos[i], ...data });
}

export function deleteTodo(id: string) {
    const i = todos.findIndex(v => v.id === id)
    todos.splice(i, 1);
}
