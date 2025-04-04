// NextAuth 및 필요한 인증 제공자를 가져옴
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// NextAuth 설정 객체 정의
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                return { id: "1", name: "사용자" };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url === "/" || url.includes("/api/auth/signout")) {
                return baseUrl; // 로그아웃 시 루트(/)로 이동
            }
            return `${baseUrl}/signup`; // 로그인 성공 시 /workspace로 이동
        }
    },
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 60 * 60 * 4
    },
    secret: process.env.NEXTAUTH_SECRET
};

// NextAuth 핸들러 생성
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };