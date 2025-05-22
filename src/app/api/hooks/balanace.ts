import {getAccessApi} from "../api";

export interface BalanceApiResponse {
    id: number;
    itemId: number;
    balancequestion: number;
    writing_status: boolean;
    chosenanswer?: number;
    itemuserId: number;
    banswer: {
        BalanceId: number;
        itemuserId: number;
        chosenanswer: string;
        itemId: number;
        userId: number;
        userName: string;
    }[] | null;
}

export interface BalancePostApiReqeust {
    itemId: string;
    balancequestion: number;
}
export interface BalanceAnswerPostApiReqeust {
    balancegameId: number;
    itemuserId: number;
    chosenanswer: number;
}
export interface BalanceAnswerListApiResponse {
    BalanceId: number;
    itemuserId: number;
    chosenanswer: string;
    itemId: number;
    userId: number;
    userName: string;
}

export const getBalanceList = async (itemId : string): Promise<BalanceApiResponse[]> => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/balancegame/list", {params: {
                itemId
            }});
        console.log("balance info:", response.data);
        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data as BalanceApiResponse[];
    } catch (error) {
        console.error("Failed to fetch Balance list:", error);
        throw error;
    }
};

export const getBalanceAsnwerList = async (
    itemId : number,
    balancegameId : number,
    itemuserId : number
): Promise<BalanceAnswerListApiResponse[]> => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/bganswer/list", {
            params: {
                itemId,
                balancegameId,
                itemuserId
            }
        });
        console.log("qanswer info:", response.data);
        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data as BalanceAnswerListApiResponse[];
    } catch (error) {
        console.error("Failed to fetch Balance answer list:", error);
        throw error;
    }
};

export const postBalance = async (newBalanceInfo : BalancePostApiReqeust) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        await api_access.post("/balancegame", newBalanceInfo);
        // console.log("success", response.data);

    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};

export const postBalanceAsnwer = async (
    newBalanceAsnwer : BalanceAnswerPostApiReqeust
) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        await api_access.post("/bganswer", newBalanceAsnwer);
        //   console.log("success", response.data);

    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};
