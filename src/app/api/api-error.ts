// libs/api-error.ts
export class ApiError extends Error {
  status?: number;
  code?: string;
  constructor(opts: { message: string; status?: number; code?: string }) {
    super(opts.message);
    this.status = opts.status;
    this.code = opts.code;
  }
}

export function extractMessageAndCode(data: unknown) {
  // 백엔드가 문자열 또는 {code, message} JSON을 내려줄 수 있으므로 양쪽 모두 처리
  if (typeof data === "string") return { message: data, code: undefined };
  if (data && typeof data === "object") {
    const anyData = data as any;
    return {
      message: anyData.message ?? "요청 처리 중 오류가 발생했다.",
      code: anyData.code,
    };
  }
  return { message: "요청 처리 중 오류가 발생했다.", code: undefined };
}
