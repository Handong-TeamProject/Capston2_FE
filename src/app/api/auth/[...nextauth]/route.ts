import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
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
        async jwt({token, user}) {
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
                    email: token.email as string
                };
            }
            return session;
        }
        // ✅ redirect 콜백은 제거해도 됨 (커스텀 라우팅으로 처리할 거니까)
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7 // 예시: 7일
    },
    secret: process.env.NEXTAUTH_SECRET
});

export {
    handler as GET,
    handler as POST
};
