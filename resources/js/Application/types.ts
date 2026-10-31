export interface Book {
    id: number;
    bookname: string;
    link: string;
    type_id?: number;
}

export interface Question {
    id: number;
    title: string;
    content: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface GroupNameOption {
    id: number;
    groupname: string;
}
