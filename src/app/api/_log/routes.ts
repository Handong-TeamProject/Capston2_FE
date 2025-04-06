export async function POST(req : Request) {
    const body = await req.json();
    console.log("로그:", body);
    return new Response("ok");
}