'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import {userGuideGetData} from "@/data/day3/userGuideGetData";
import Image from "next/image";
import React, {useState} from "react";

const initWriting = [
    {
        id: 1,
        question: '내가 좋아하는 커뮤니케이션 방식은?',
        answer: [""]
    }, {
        id: 2,
        question: '내가 관계에서 중요하게 생각하는 것은?',
        answer: [""]
    }, {
        id: 3,
        question: '타인으로부터 신뢰를 얻거나, 잃어버리게 하는 행동이나 상황은?',
        answer: [""]
    }, {
        id: 4,
        question: '내가 상대방을 불편하게 만들 수도 있는 점은?',
        answer: [""]
    }, {
        id: 5,
        question: '내가 주로 동기 부여 받는 상황은?',
        answer: [""]
    }, {
        id: 6,
        question: '내가 가진 나만의 강점은?',
        answer: [""]
    }
];

type AnswerList = {
    answer1: string[];
    answer2: string[];
    answer3: string[];
    answer4: string[];
    answer5: string[];
    answer6: string[];
};

type TeamMember = {
    name: string;
    answer_list: AnswerList;
};

const UserGuidePage: React.FC = () => {
    const [writingData, setWritingData] = useState(initWriting);
    const [isWrite, setIsWrite] = useState(userGuideGetData.quide_writing_status);

    // const [teamData, setTeamData] =
    // useState<TeamMember[]>(userGuideGetData.data);
    const [teamData] = useState<TeamMember[]>(userGuideGetData.data);

    const [isView, setIsView] = useState(false);
    const [viewMember, setViewMember] = useState(0);
    
  
    const [toggles, setToggles] = useState<boolean[]>(Array(6).fill(false));

    const handleSubmitInfo = () => {
        // 모든 답변이 비어있지 않은지 확인
        const hasEmptyAnswer = writingData.some(
            item => item.answer.some(answer => answer.trim() === "")
        );

        if (hasEmptyAnswer) {
            alert("모든 답변을 작성해 주세요!");
            return;
        }

        if (window.confirm("제출하시겠습니까?")) {
            alert("제출되었습니다.");
            setIsWrite(true);
        }
    };

    // 🔥 답변 추가 기능
    const handleAddAnswer = (questionIndex : number) => {
        const selectedItem = writingData[questionIndex];

        if (selectedItem.answer.length >= 3) {
            alert("답변은 최대 3개까지 추가할 수 있습니다.");
            return;
        }

        setWritingData(prev => {
            return prev.map((item, idx) => {
                if (idx !== questionIndex) 
                    return item;
                return {
                    ...item,
                    answer: [
                        ...item.answer,
                        ""
                    ]
                };
            });
        });
    };

    // ✍️ 답변 수정 핸들러 추가
    const handleChangeAnswer = (
        questionIndex : number,
        answerIndex : number,
        value : string
    ) => {
        setWritingData(prev => {
            return prev.map((item, idx) => {
                if (idx !== questionIndex) 
                    return item;
                const updatedAnswers = [...item.answer];
                updatedAnswers[answerIndex] = value;
                return {
                    ...item,
                    answer: updatedAnswers
                };
            });
        });
    };
    
    const handleClickToggle = (index : number) => (
        setToggles((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        })
    );

    return (
        <div className="w-full px-6 lg:px-0">
            <ActivityDesc day={2} activity={1} project_id={1}/>
            <div className="flex flex-col w-full">
                <div className="flex w-full mb-4">
                    <button
                        className={`w-28 rounded px-1 py-1 ${isWrite
                            ? 'bg-black'
                            : 'bg-yellow'} flex justify-center text-white mr-3`}>
                        <Image
                            src="/Img/user-guide/write.png"
                            alt="write image"
                            width={20}
                            height={20}
                            className="mr-2"/>
                        작성하기
                    </button>
                    <button
                        onClick={() => isWrite && setIsView(false)}
                        className={`w-28 rounded px-1 py-1 ${isWrite
                            ? (
                                isView
                                    ? 'bg-black'
                                    : 'bg-yellow'
                            )
                            : "bg-black"} flex justify-center text-white mr-3`}>
                        <Image
                            src="/Img/user-guide/all.png"
                            alt="all view"
                            width={20}
                            height={20}
                            className="mr-2"/>
                        전체보기
                    </button>
                    <button
                        onClick={() => isWrite && setIsView(true)}
                        className={`w-28 rounded px-1 py-1 ${isWrite
                            ? (
                                isView
                                    ? 'bg-yellow'
                                    : 'bg-black'
                            )
                            : "bg-black"} flex justify-center text-white`}>
                        <Image
                            src="/Img/user-guide/one.png"
                            alt="one view"
                            width={20}
                            height={20}
                            className="mr-2"/>
                        개별보기
                    </button>
                </div>
                <div className="mb-2">
                    {
                        isView && teamData.map((data, index) => (
                            <button
                                key={index}
                                onClick={() => setViewMember(index)}
                                className={`${viewMember === index
                                    ? 'text-yellow'
                                    : ''} mr-2 font-extrabold `}>{data.name}</button>
                        ))
                    }
                </div>

                {/* 답변 작성하기 */}
                {
                    writingData.map((data, index) => (
                        <div key={index} className="mb-6">
                            <div className="w-full flex justify-between mb-2">
                                <div className="flex items-center w-[75%]">
                                    <Image
                                        src={`/Img/user-guide/q${index + 1}.png`}
                                        alt="question image"
                                        width={24}
                                        height={24}
                                        className="mr-2"/>
                                    <p className=" font-extrabold text-sm lg:text-lg">{data.question}</p>
                                </div>
                                {
                                    (isWrite === false) && (
                                        <div
                                            className=" flex items-center hover:opacity-50 cursor-pointer"
                                            onClick={() => handleAddAnswer(index)}>
                                            <Image src="/Img/plus_black.png" alt="plus image" width={28} height={14}/>
                                            <button className=" ml-1 text-sm lg:text-lg">추가하기</button>
                                        </div>
                                    )
                                }
                                {
                                    (isWrite === true && isView === false) && (
                                        <div>
                                            <Image src = {`${toggles[index] ? '/Img/dropUp.png' : '/Img/dropDown.png'}`} alt = "dropDown" width={20} height={20} className="hover:opacity-50" onClick={() => handleClickToggle(index)}/>
                                        </div>
                                    )
                                }
                            </div>

                            {/* 작성하기 - input */}
                            {
                                (isWrite === false) && data
                                    .answer
                                    .map((answer, index2) => (
                                        <div key={index2} className="w-full mb-1">
                                            <input
                                                type="text"
                                                className="bg-lightGray w-full pl-2 py-2 text-sm rounded"
                                                placeholder="(답변을 작성해주세요!)"
                                                value={answer}
                                                onChange={(e) => handleChangeAnswer(index, index2, e.target.value)}/>
                                        </div>
                                    ))
                            }
                            {/* 개별보기 - input */}
                            {
                                isWrite && isView  && teamData[viewMember]?.answer_list?.[`answer${index + 1}` as keyof AnswerList]?.map((data, index2) => (
                                <div key={index2} className="w-full mb-1">
                                    <input
                                        type="text"
                                        className="bg-lightGray w-full pl-2 py-2 text-sm rounded"
                                        value={data}
                                        onChange={() => undefined}/>
                                </div>
                                ))
                            }
                            {
                                toggles[index] && (isView === false) && (
                                    <div className="w-full flex flex-wrap">
                                        {
                                            teamData.map((data3, index3) => (
                                                <div key={index3} className={`mb-2 w-full lg:w-1/2 ${index3 % 2 == 0 ? "lg:pr-1":"lg:pl-1"}`}>
                                                    <p className="mb-1">{data3.name}</p>
                                                    {
                                                        data3.answer_list?.[`answer${index + 1}` as keyof AnswerList]?.map((data4, index4) => (
                                                            <input
                                                                type="text"
                                                                className="bg-lightGray w-full pl-2 py-2 text-sm rounded mb-1"
                                                                value={data4}
                                                                key={index4}
                                                                onChange={() => undefined} />
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }

                        </div>
                    ))
                }

                {/* 제출하기 버튼 */}
                {
                    !isWrite && (
                        <button
                            className="bg-yellow w-40 py-2 mb-10 rounded text-white font-bold mt-4 self-center"
                            onClick={handleSubmitInfo}>
                            제출하기
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default UserGuidePage;
