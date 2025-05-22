'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import {balanceQuestionList} from "@/data/common/balanceQuestionList";
import {balanceQuiz} from "@/data/day1/balanceQuizList";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import { BalanceAnswerPostApiReqeust, BalanceApiResponse, BalancePostApiReqeust, getBalanceAsnwerList, getBalanceList, postBalance, postBalanceAsnwer } from "@/app/api/hooks/balanace";


function BalanceGamePage() {
    const [balanceQuestions, setBalanceQuestions] = useState<BalanceApiResponse[]>([]);
    const [isResults, setIsResults] = useState<boolean[]>(balanceQuiz.map(
        () => false
    ));
    
    const fetchBalanceQuestions = async () => {
        const projectId = sessionStorage.getItem("projectId");
        if (projectId !== null) {
            const response = await getBalanceList(projectId);
            if (Array.isArray(response)) {
                setBalanceQuestions(response.reverse().map((item: BalanceApiResponse) => ({
                id: item.id,
                itemId: item.itemId,
                balancequestion: item.balancequestion,
                itemuserId: item.itemuserId,
                writing_status: item.writing_status,
                chosenanswer: item.chosenanswer,
                banswer: item.banswer,
                })));
            } else {
                console.error("Response is not an array:", response);
            }
        }
    };

    const handleAddQuestion = async () => {
        if (window.confirm("문제를 추가하시겠습니까?")) {
            let newQuestion: BalancePostApiReqeust;
            const projectId = sessionStorage.getItem("projectId");

            do {
                const randomNum = Math.floor(Math.random() * 30) + 1;
                newQuestion = {
                    balancequestion: randomNum,
                    itemId: projectId ? projectId : ""
                };
            } while (
                balanceQuestions.some((quiz) => quiz.balancequestion === newQuestion.balancequestion)
            );

            await postBalance(newQuestion);
            fetchBalanceQuestions();
        
            setIsResults((prev) => [
                ...prev,
                false
            ]); // 결과 보기 상태도 함께 추가
            alert("문제를 추가합니다.");
        }
    };

    const handleSelect = async (index: number, selection: string) => {
        if (window.confirm("선택하시겠습니까?")) {
            const newBalanceAnswer: BalanceAnswerPostApiReqeust= {
                balancegameId: balanceQuestions[index].id,
                itemuserId: balanceQuestions[index].itemuserId,
                chosenanswer: selection === "case1" ? 1 : 2
            };
            console.log("newBalanceAnswer", newBalanceAnswer);

            const response = await postBalanceAsnwer(newBalanceAnswer);
            console.log("response", response);

            fetchBalanceQuestions();
        }
    };

    const toggleResult = (index : number) => {
        setIsResults((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        });
    };
    

    useEffect(() => {   
        fetchBalanceQuestions();
    }, []);

    const handleGetResult = async (index: number) => {
        toggleResult(index);
        // api 호출해서 각 답변 가져오기
        const response = await getBalanceAsnwerList(balanceQuestions[index].itemId, balanceQuestions[index].id, balanceQuestions[index].itemuserId);
        // console.log(response);
        setBalanceQuestions((prev) => {
        const copy = [...prev];
        copy[index] = {
            ...copy[index],
            banswer: response,
        };
        return copy;
        }
        );
        setIsResults((prev) => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
        }
        );
    }

    return (
        <div className="w-full px-6 lg:px-0">
            <ActivityDesc day={0} activity={1} project_id={1}/>
            <div className="flex flex-wrap -mx-2">
                <div className="flex justify-end w-full">
                    <button
                        className="hover:bg-lightGray object-hover bg-black text-white h-10 rounded-md flex items-center justify-center px-2"
                        onClick={handleAddQuestion}>
                        <Image
                            src="/Img/plus.png"
                            alt="plus image"
                            width={100}
                            height={100}
                            className="w-4 h-4 mr-2"/>
                        생성하기
                    </button>
                </div>

                <div className="flex flex-wrap w-full mt-4">
                    {
                        balanceQuestions.map((quiz, index) => {
                            const matchedQuestion = balanceQuestionList.find(
                                (q) => q.balance_question === quiz.balancequestion
                            );

                            return (
                                <div className="w-full md:w-1/2 lg:w-1/3 p-4 h-[400px]" key={quiz.id}>
                                    {
                                        isResults[index]
                                            ? (
                                                <div
                                                    className="w-full h-full bg-beige90 rounded-2xl flex flex-col justify-center">
                                                    <div className="flex flex-col items-center justify-center text-center px-4">
                                                        <div className="pb-16">
                                                            <p className="text-orange mb-2 text-xl font-bold">
                                                                {
                                                                    matchedQuestion
                                                                        ?.question1
                                                                }
                                                            </p>
                                                            <div className="flex justify-center w-full">
                                                                {
                                                                    balanceQuestions[index].banswer && balanceQuestions[index].banswer
                                                                        .filter((q) => q.chosenanswer === "1")
                                                                        .map((q, idx) => (<p className="rounded px-1 border border-orange text-orange bg-white  mx-2" key={idx}>{q.userName}</p>))
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-black mb-2 text-xl font-bold">
                                                                {
                                                                    matchedQuestion?.question2
                                                                }
                                                            </p>
                                                            <div className="flex justify-center">
                                                            {
                                                                    balanceQuestions[index].banswer && balanceQuestions[index].banswer
                                                                        .filter((q) => q.chosenanswer === "2")
                                                                        .map((q, idx) => (<p className="rounded px-1 border bg-white  mx-2" key={idx}>{q.userName}</p>))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex justify-center mt-10">
                                                        <button
                                                            className="hover:bg-orange50 bg-black text-white px-4 py-2 rounded-md"
                                                            onClick={() => toggleResult(index)}>
                                                            닫기
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div
                                                    className="w-full h-full bg-beige90 rounded-2xl flex flex-col justify-center">
                                                    <div className="flex flex-col items-center justify-center text-center">
                                                        <p className="text-orange text-xl font-bold w-4/5">
                                                            {
                                                                matchedQuestion
                                                                    ?.question1
                                                            }
                                                        </p>
                                                        <p className="my-4">VS</p>
                                                        <p className="text-black text-xl font-bold w-4/5">
                                                            {
                                                                matchedQuestion
                                                                    ?.question2
                                                            }
                                                        </p>
                                                    </div>
                                                    {
                                                        quiz.writing_status === false
                                                            ? (
                                                                <div className="w-full flex justify-center mt-10">
                                                                    <button
                                                                        className="hover:bg-orange50 bg-orange text-white px-4 py-2 rounded-md mr-4"
                                                                        onClick={() => handleSelect(index, "case1")}>
                                                                        선택하기
                                                                    </button>
                                                                    <button
                                                                        className="hover:bg-boldGray bg-black text-white px-4 py-2 rounded-md"
                                                                        onClick={() => handleSelect(index, "case2")}>
                                                                        선택하기
                                                                    </button>
                                                                </div>
                                                            )
                                                            : (
                                                                <div className="w-full flex justify-center mt-10">
                                                                    <button
                                                                        className={`hover:bg-orange50 ${quiz.chosenanswer === 1 ? 'bg-orange' : "bg-black"} text-white px-4 py-2 rounded-md`}
                                                                        onClick={() => handleGetResult(index)}>
                                                                        결과보기
                                                                    </button>
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default BalanceGamePage;
