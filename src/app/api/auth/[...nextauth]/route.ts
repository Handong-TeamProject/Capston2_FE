// NextAuth 및 필요한 인증 제공자를 가져옴
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// NextAuth 핸들러 생성
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize() {
        return { id: "1", name: "사용자" };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === "/" || url.includes("/api/auth/signout")) {
        return baseUrl;
      }
      return `${baseUrl}/signup`;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 4,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// HTTP 메서드에 핸들러 연결
export { handler as GET, handler as POST };
