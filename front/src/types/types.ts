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

export interface IBasket {
    id: number;
    title: string;
    resultPercent: number | string,
    userId: number;
    typeId: number;
}

export interface IHistory {
    id: number;
    question: string;
    status: boolean,
    userId: number;
    typeId: number;
    basketId: number;
}