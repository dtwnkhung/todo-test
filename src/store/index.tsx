import { create } from "zustand";
import { Todo, TodoState } from "../types";
import uuid from "react-uuid";
import { devtools, persist } from "zustand/middleware";

export const useStore = create<TodoState>()(
    devtools((set, get) => ({
        todos: [],
        fetchTodos: async () => {
            try {
                const response = await fetch(`http://localhost:3001/todos`);
                if (!response.ok) {
                    throw new Error("Có lỗi khi lấy dữ liệu");
                }
                const todos = await response.json();
                set({ todos });
            } catch (error) {
                console.error(error);
            }
        },
        addTodo: async (title: string) => {
            try {
                const response = await fetch("http://localhost:3001/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: uuid(), title, completed: false }),
                });
                if (!response.ok) {
                    throw new Error("Có lỗi khi thêm todo");
                }
                const todo = await response.json();
                set((state) => ({ todos: [...state.todos, todo] }));
            } catch (error) {
                console.error(error);
            }
        },
        toggleCompleted: async (id: string) => {
            const todo = get().todos.find((todo) => todo.id === id);
            if (!todo) {
                throw new Error(`Không tìm thấy todo với ${id} đã chọn`);
            }
            const response = await fetch(`http://localhost:3001/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !todo.completed }),
            });
            if (!response.ok) {
                throw new Error("Có lỗi khi thay đổi trạng thái");
            }
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                ),
            }));
        },
        removeTodo: async (id: string) => {
            try {
                const response = await fetch(`http://localhost:3001/todos/${id}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Có lỗi khi xóa todo");
                }
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                }));
            } catch (error) {
                console.error(error);
            }
        },
        filter: "all",
        setFilter: (filter: "all" | "active" | "completed") => {
            set((state) => ({
                filter
            }))
        },
    })

    )
)


export const useFilteredTodos = () => {
    const filter = useStore((state) => state.filter);
    const todos = useStore((state) => state.todos);
    switch (filter) {
        case "active":
            return todos.filter((todo) => !todo.completed);
        case "completed":
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}
