// hooks/useDetailItem.ts

import {api} from "../api";

export interface ItemDetail {
    title?: string;
    content?: string;
    code?: string;
    contentstatus: number;
    daystatus: number;
    // 필요한 다른 필드를 여기에 추가하세요.
}

export const fetchItemDetail = async (itemId : string | number): Promise<ItemDetail> => {
    try {
        const response = await api.get<ItemDetail>('/api/item', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3NUb2tlbiIsImlkIj' +
                        'o0LCJleHAiOjE3NDY1NDM4NTd9.7sjz1R1ViM6BU92P1KIoydxFfgpo7JLYjM0wYQu78eeZwV0eHPY' +
                        'EcTD6Zs35BBZfJ5vRAymFLoc7Vwvwfy3HgA'
            },
            params: {
                id: itemId
            }
        });

        const obj_data: ItemDetail = response.data ?? {
            title: undefined,
            content: undefined,
            code: undefined,
            contentstatus: 0,
            daystatus: 0
        };

        // content 안 <br> -> 줄바꿈
        if (obj_data.content) {
            obj_data.content = obj_data
                .content
                .replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
        }

        console.log(obj_data);

        return obj_data;

    } catch (error : unknown) {
        // error 타입이 unknown이니까 타입 좁히기 해야 함
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const err = error as {
                response: {
                    status: number
                }
            };
            const status = err.response.status;

            switch (status) {
                case 401:
                    alert('AccessToken 만료. 다시 로그인하세요.');
                    location.replace('/user/login');
                    break;
                case 403:
                    alert('/api/item : 권한이 없습니다.');
                    break;
                case 406:
                    alert('RefreshToken 만료. 다시 로그인하세요.');
                    break;
                case 409:
                    alert('중복된 정보입니다. 다시 시도해주세요.');
                    break;
                case 423:
                    alert('회원 등급 문제. 회원 등급 처리 페이지로 이동합니다.');
                    location.replace('/user/process');
                    break;
                default:
                    alert('정상적으로 이루어지지 않았습니다. 다시 시도해주세요.');
                    break;
            }
        } else {
            console.error(error);
            alert('예상치 못한 오류가 발생했습니다.');
        }

        // 실패 시에도 ItemDetail 타입 리턴
        return {title: undefined, content: undefined, code: undefined, contentstatus: 0, daystatus: 0};
    }
};
