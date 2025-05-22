import { getAccessApi } from "../api";

export const getUserGuide = async (id: string) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/itemuser", {params: {
                id : id
            }});

        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};