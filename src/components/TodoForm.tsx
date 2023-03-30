import { useState } from "react";
import { useStore } from "../store";

export const TodoForm = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const addTodo = useStore((state) => state.addTodo);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (todoTitle.trim()) {
            addTodo(todoTitle);
            setTodoTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className="border border-black/10 shadow bg-white py-2 px-3 rounded-md w-full" type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} placeholder="Add your todo" />
        </form>
    );
};