import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        accessToken?: string; // ✅ accessToken 추가
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
    
    interface JWT {
        accessToken?: string; // ✅ JWT에도 추가 (옵션)
        id?: string;
        name?: string;
        email?: string;
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize() {
                return {id: "1", name: "사용자"}; // mock user
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID !,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET !
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token as string; // ✅ 추가: accessToken 저장
                // console.log("🟡 account 값 출력:", account); // ✅ 콘솔에 출력
            }
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                };
                session.accessToken = token.accessToken as string; // ✅ 추가: accessToken 세션에 포함
            }
            return session;
        }
        // ✅ redirect 콜백은 제거해도 됨 (커스텀 라우팅으로 처리할 거니까)
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 4
    },
    secret: process.env.NEXTAUTH_SECRET
});

export {
    handler as GET,
    handler as POST
};
