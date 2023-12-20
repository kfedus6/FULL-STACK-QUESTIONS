export interface IUser {
    id: number;
    email: string;
    nickname: string;
}

export interface IType {
    id: number;
    title: string;
    userId: number;
}

export interface IQuestion {
    id: number;
    typeId: number;
    question: string;
    answer: string;
}