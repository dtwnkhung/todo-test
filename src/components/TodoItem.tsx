import { useStore } from "../store";

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
    labelFor?: string;
}

export const TodoItem = ({ id, title, completed, labelFor }: TodoItemProps) => {
    const { toggleCompleted, removeTodo } = useStore();

    const handleCheckboxClick = () => {
        toggleCompleted(id);
    };

    const handleRemoveClick = () => {
        removeTodo(id);
    };

    return (
        <div className="text-left flex flex-wrap py-3 border-b relative group">
            <div className="relative">
                {completed ? <i className="fas fa-check-square text-lg text-blue-600 cursor-pointer"></i> : <i className="far fa-square text-lg text-blue-600 cursor-pointer"></i>}
                <input type="checkbox" checked={completed} onChange={handleCheckboxClick} className="absolute left-0 z-10 opacity-0 right-0 h-full cursor-pointer" id={`${labelFor}`} />
            </div>
            <label htmlFor={`${labelFor}`} className="cursor-pointer ml-2">{title}</label>
            <button onClick={handleRemoveClick} className="ml-auto hidden group-hover:block">Remove</button>
        </div>
    );
};
