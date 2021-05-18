import { Dispatch } from "react";

interface SupportProps {
    id: number,
    title: string,
    content: string,
    focused: boolean,
    setCurrentId: (current_id:number) => void,
}

export default SupportProps;

