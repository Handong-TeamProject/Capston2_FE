import {getAccessApi} from "../api";

export interface SurveryPutApiRequest {
    id: string;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
    q6: string | null;
    itemId: string | null;
    userId: string | null;
    // joinedAt: string | null; // ISO string format for LocalDateTime
    mbti?: string | null; // Optional fields
    area?: string | null;
    major?: string | null;
    age?: string | null;
    tmi?: string | null;
    userName?: string | null;
    itemTitle?: string | null;
    itemContent?: string | null;
    itemDaystatus?: string | null;
    step1answer1?: number | null;
    step1answer2?: number | null;
    step1answer3?: number | null;
    step2answer1?: number | null;
    step2answer2?: number | null;
    writing_status : boolean;
}

export const getSurveyInfo = async (id : string): Promise<SurveryPutApiRequest> => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/itemuser", {params: {
                id : id
            }});

        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data as SurveryPutApiRequest;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};

export const putSurveryInfo = async (surveryPutData : SurveryPutApiRequest) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.put("/itemuser", surveryPutData);
        // console.log("success", response.data);

    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};