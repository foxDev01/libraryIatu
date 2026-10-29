import { Question } from "../types";

interface SupportsListProps {
    questions: Question[];
    onChanged: () => void;
}

export default SupportsListProps;
