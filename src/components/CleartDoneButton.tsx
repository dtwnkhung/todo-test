import { useStore } from "../store";

export const ClearCompletedButton = () => {
    const { todos, removeTodo } = useStore();

    const handleClearCompletedClick = () => {
        const doneTodos = todos.filter((todo) => todo.completed);
        doneTodos.forEach((todo) => removeTodo(todo.id));
    };

    const doneTodosCount = todos.filter((todo) => todo.completed).length;

    return (
        <button onClick={handleClearCompletedClick} className={`${doneTodosCount === 0 ? "opacity-50" : "opacity-100"}`} disabled={doneTodosCount === 0}>
            Clear completed ({doneTodosCount})
        </button>
    );
};
