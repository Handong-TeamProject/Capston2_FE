import { getAccessApi } from "../api";

export interface QuestionApiResponse {
    id: number;
    itemId: number;
    topic: number;
    questionnum: number;
    writing_status: boolean
    itemuserId: number;
    qanswers: { 
        questionId: number;
        itemuserId: number;
        answer: string;
        itemId: number;
        userId: number;
        userName: string;
    }[] | null;
}

export interface QuestionPostApiReqeust {
    itemId: string;
    topic: number;
    questionnum: number;
}
export interface QuestionAnswerPostApiReqeust {
    questionId: number;
    itemuserId: number;
    answer: string;
}
export interface QuestionAnswerListApiResponse {
    questionId: number;
    itemuserId: number;
    answer: string;
    itemId: number;
    userId: number;
    userName: string;
}
    
export const getQuestionList = async (itemId: string, topic: string): Promise<QuestionApiResponse> => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/question/list", { params: { itemId, topic } });

        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data as QuestionApiResponse;
    } catch (error) {
        console.error("Failed to fetch question list:", error);
        throw error;
    }
};

export const getQuestionAsnwerList = async (itemId: number, questionId: number, itemuserId : number): Promise<QuestionAnswerListApiResponse[]> => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/qanswer/list", { params: { itemId, questionId, itemuserId } });
        // console.log("qanswer info:", response.data);
        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data as QuestionAnswerListApiResponse[];
    } catch (error) {
        console.error("Failed to fetch question answer list:", error);
        throw error;
    }
};




export const postQuestion = async (newQuestionInfo: QuestionPostApiReqeust) => {
  try {
    const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
    const response = await api_access.post("/question", newQuestionInfo);
    console.log("success", response.data);

  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};

export const postQuestionAsnwer = async (newQuestionAsnwer: QuestionAnswerPostApiReqeust) => {
    try {
      const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
      const response = await api_access.post("/qanswer", newQuestionAsnwer);
      console.log("success", response.data);
  
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    }
  };
