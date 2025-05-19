import { getAccessApi } from "../api";

export interface ProjectApiResponse {
  title: string;
  desc: string;
  code: string;
  daystatus: number;
  contentstatus: number;
  owner: number;
  users: { name : string, id : number }[] | null;
}

export const getProjectInfo = async (id: string): Promise<ProjectApiResponse> => {
  try {
    const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
    const response = await api_access.get("/item", { params: { id } });

    // ⬇️ response.data를 명시적으로 타입 단언
    return response.data as ProjectApiResponse;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
