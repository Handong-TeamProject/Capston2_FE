import {getAccessApi} from "../api";

interface MyInfo {
    name: string;
    gender: string;
    email: string;
    password?: string;
}

export const fetchUserInfo = async (setMyInfo : any, setEditInfo : any) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스

        interface UserResponse {
            name: string;
            username: string;
            gender: string;
        }

        const response = await api_access.get<UserResponse>("/user", {
            params: {
                id: 12
            }
        });
        // console.log("User info:", response.data);

        setMyInfo(
            {name: response.data.name, email: response.data.username, gender: response.data.gender}
        )
        setEditInfo(
            {name: response.data.name, email: response.data.username, gender: response.data.gender}
        )

    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};

export const putUserInfo = async (editInfo : MyInfo) => {
    try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.put("/user", {
            name: editInfo.name,
            gender: editInfo.gender,
            email:editInfo.email,
        });
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
};