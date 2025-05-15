import { api } from "@/app/api/api";

export async function accessTokenUser() {
    try {
        const response = await api.post("/auth", null, {
            headers: {
                "RefreshToken": sessionStorage.getItem("refreshToken") || ""
            }
        });
        
        const accessToken = response.headers.get("authorization");

        if (!accessToken) {
            alert("로그인 실패!");
        } else {
            sessionStorage.setItem("accessToken", accessToken);
            return true;
        }

    } catch (error : any) {
        alert("error!!");
        alert(JSON.stringify(
            error.response
                ?.data || error
        ));
    }
}