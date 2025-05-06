// src/app/pages/balance-game.tsx
'use client'

import { useState } from "react";
import { fetchItemDetail, ItemDetail } from "../api/hooks/useDetailItem";


const TestPage: React.FC = () => {
    const [itemData, setItemData] = useState<ItemDetail | undefined>(undefined);
    const [itemNumber, setItemNumber] = useState<number | undefined>(undefined);

    const handleGetItemData = async (itemID: number) => {
        const data: ItemDetail = await fetchItemDetail(itemID);
        setItemData(data); // ItemDetail 타입이므로 오류가 발생하지 않습니다.
    }

    return (
        <div>
            <h1>아이템 상세보기</h1>
            <input type="number" value={itemNumber || ''} onChange={(e) => setItemNumber(e.target.value ? parseInt(e.target.value, 10) : undefined)}/>
            <button onClick={() => itemNumber !== undefined && handleGetItemData(itemNumber)}>getData</button>
            <p>프로젝트 이름 : {itemData?.title}</p>
            <p>프로젝트 설명 : {itemData?.content}</p>
            <p>프로젝트 코드 : {itemData?.code}</p>
            <p>프로젝트 콘텐츠 데이 : {itemData?.daystatus}</p>
            <p>프로젝트 콘텐츠 순번 : {itemData?.contentstatus}</p>
        </div>
    );
};

export default TestPage;
