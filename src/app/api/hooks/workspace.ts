import {getAccessApi} from "../api";

interface ProjectInfo {
    id: number;
    title: string;
    desc: string;
    day_status: string;
}

export const getProjectList = async (setProjectList:any) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/item/list",);
        // console.log("item info:", response.data);
        if (Array.isArray(response.data)) {
            const mappedList: ProjectInfo[] = response
                .data
                .map((item) => ({
                    id: item.id,
                    title: item.title,
                    desc: item.content,
                    day_status: String(item.daystatus)
                }));

            setProjectList(mappedList);
        }

    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};


export const joinProject = async (code:string) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.post("/item/join", { inputCode: code } );
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};