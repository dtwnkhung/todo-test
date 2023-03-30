import { Link } from "react-router-dom";
import { useStore } from "../store";

interface FilterButtonProps {
    filter: "all" | "active" | "completed";
    className?: string;
    link: string;
}

export const FilterButton = ({ filter, className, link }: FilterButtonProps) => {
    const setFilter = useStore((state) => state.setFilter);
    const activeFilter = useStore((state) => state.filter);

    const handleClick = () => {
        setFilter(filter);
    };

    return (
        <Link to={link}
            className={` bg-white border  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 active:outline-none focus:outline-none ${className} ${activeFilter === filter ? "text-blue-600 border-blue-600 " : "text-gray-900 border-gray-300"}`}
            onClick={handleClick}
        >
            {filter}
        </Link>
    );
};
