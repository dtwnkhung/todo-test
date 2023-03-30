import { useEffect } from "react";
import { useFilteredTodos, useStore } from "../store";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const todos = useFilteredTodos();
    const query = new URLSearchParams(window.location.search);
    const param = query.get('filter') ?? "all";
    const { fetchTodos, setFilter } = useStore();

    useEffect(() => {
        fetchTodos();
        switch (param) {
            case "active":
                setFilter("active");
                break;
            case "completed":
                setFilter("completed");
                break;
            default:
                setFilter("all");
        }
    }, [param]);
    console.log(todos)
    return (
        <>
            <div className="mt-3 ">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        labelFor={todo.id}
                    />
                ))}
            </div>
        </>
    );
};