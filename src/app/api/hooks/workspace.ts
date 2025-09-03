import { SetStateAction } from "react";
import {getAccessApi} from "../api";

interface ProjectInfo {
    id: number;
    title: string;
    desc: string;
    day_status: string;
}

export const getProjectList = async (setProjectList:React.Dispatch<SetStateAction<ProjectInfo[]>>) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const userId = -100;
        const response = await api_access.get("/itemuser/list", { params: { userId } });
        console.log("item info:", response.data);
        if (Array.isArray(response.data)) {
            const mappedList: ProjectInfo[] = response
                .data
                .map((item) => ({
                    id: item.itemId,
                    title: item.itemTitle,
                    desc: item.itemContent,
                    day_status: String(item.itemDaystatus)
                }));

            setProjectList(mappedList);
        }

    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};


export const joinProject2 = async (code:string) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        await api_access.post("/item/join", { inputCode: code } );
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};


export const joinProject = async (code: string) => {
    const api_access = getAccessApi();
    try {
        const res = await api_access.post("/item/join", { inputCode: code });
        return { ok: true as const, data: res.data };
    } catch (err: any) {
        const status = err.response?.status;
        const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "프로젝트 참여에 실패했습니다.";

        return { ok: false as const, status, message: msg };
    }
};