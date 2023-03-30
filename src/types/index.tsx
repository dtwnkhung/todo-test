export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
    fetchTodos: () => Promise<void>;
    addTodo: (title: string) => void;
    toggleCompleted: (id: string) => void;
    removeTodo: (id: string) => void;
    filter: "all" | "active" | "completed";
    setFilter: (filter: "all" | "active" | "completed") => void;
}