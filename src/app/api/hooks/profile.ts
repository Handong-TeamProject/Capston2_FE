import {getAccessApi} from "../api";

export interface responseMyProfile {

    // users: { userName: string, userId: number, userrole: string }[] | null;
    id: number;
    writing_status: Boolean;
    itemId: number;
    userId: number;
    quizquestion: string; //질문 항목 (MBTI, 지역, 전공, 나이)
    mbti: string; // MBTI
    area: string; // 거주 지역
    major: string; // 전공/직업
    age: string; // 나이
    tmi: string; // 간단한 자기소개 (TMI)
    userName: string; //사용자의 이름만 더 추가!!
    apply_status: boolean;

    users: MyProfile[];
}

export interface MyProfile {

    // users: { userName: string, userId: number, userrole: string }[] | null;
    id: number;
    writing_status: Boolean;
    itemId: number;
    userId: number;
    quizquestion: string; //질문 항목 (MBTI, 지역, 전공, 나이)
    mbti: string; // MBTI
    area: string; // 거주 지역
    major: string; // 전공/직업
    age: string; // 나이
    tmi: string; // 간단한 자기소개 (TMI)
    userName: string; //사용자의 이름만 더 추가!!
    apply_status: boolean;
}

// export interface  MemberProfile{
//     id: number;
//     writing_status: Boolean;
//     itemId: number;
//     userId: number;
//     quizquestion: string; //질문 항목 (MBTI, 지역, 전공, 나이)
//     mbti: string; // MBTI
//     area: string; // 거주 지역
//     major: string; // 전공/직업
//     age: string; // 나이
//     tmi: string; // 간단한 자기소개 (TMI)
//     userName: string; //사용자의 이름만 더 추가!!
//     apply_status: boolean;

// }

export interface PutMyProfile {
    id: number;
    quizquestion: string; //질문 항목 (MBTI, 지역, 전공, 나이)
    mbti: string; // MBTI
    area: string; // 거주 지역
    major: string; // 전공/직업
    age: string; // 나이
    tmi: string; // 간단한 자기소개 (TMI)
}

export const getMyProfileInfo = async (id : string): Promise<responseMyProfile> => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.get("/profile", {params: {
                itemId : id,
            }});

        // ⬇️ response.data를 명시적으로 타입 단언
        return response.data as responseMyProfile;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};

export const putMyProfileInfo = async (myProfile : PutMyProfile) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        // console.log("api put profile : ", myProfile);
        const response = await api_access.put("/profile", myProfile);
        console.log("success", response.data);

    } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
};