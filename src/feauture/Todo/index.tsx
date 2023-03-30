import { TodoForm } from "../../components/TodoForm";
import { ClearCompletedButton } from "../../components/CleartDoneButton";
import { FilterButton } from "../../components/FilterButton";
import { TodoList } from "../../components/TodoList";

export const Todo = () => {
    return (
        <>
            <div className="container mx-auto">
                <div className="w-1/3 text-center mt-6 mx-auto">
                    <h1 className="font-bold italic text-4xl mb-6">Todo App</h1>
                    <div className="p-5 rounded-lg shadow-lg bg-white mx-auto">
                        <TodoForm />
                        <TodoList />
                        <div className="flex items-center justify-between mt-3">
                            <ClearCompletedButton />
                            <div className="flex items-center justify-center">
                                <FilterButton link="/?filter=all" filter="all" className="capitalize" />
                                <FilterButton link="/?filter=active" filter="active" className="capitalize mx-2" />
                                <FilterButton link="/?filter=completed" filter="completed" className="capitalize" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}