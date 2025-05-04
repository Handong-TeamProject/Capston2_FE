'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import {balanceQuestionList} from "@/data/common/balanceQuestionList";
import {balanceQuiz} from "@/data/day1/balanceQuizList";
import {balanaceQuizAnswerList} from "@/data/day1/balanceQuizAnswerList";
import Image from "next/image";
import React, {useState} from "react";

type BalanceQuestion = {
    balance_id: number;
    balance_question: number;
    select: string;
};

function BalanceGamePage() {
    const [balanceQuestions, setBalanceQuestions] = useState<BalanceQuestion[]>(
        balanceQuiz
    );
    const [isResults, setIsResults] = useState<boolean[]>(balanceQuiz.map(
        () => false
    ));

    const handleAddQuestion = () => {
        if (window.confirm("문제를 추가하시겠습니까?")) {
            let newQuestion: BalanceQuestion;

            do {
                const randomNum = Math.floor(Math.random() * 30) + 1;
                newQuestion = {
                    balance_id: balanceQuestions.length + 1,
                    balance_question: randomNum,
                    select: ""
                };
            } while (
                balanceQuestions.some((quiz) => quiz.balance_question === newQuestion.balance_question)
            );

            setBalanceQuestions((prev) => [
                ...prev,
                newQuestion
            ]);
            setIsResults((prev) => [
                ...prev,
                false
            ]); // 결과 보기 상태도 함께 추가
            alert("문제를 추가합니다.");
        }
    };

    const handleSelect = (id : number, selection : string) => {
        if (window.confirm("선택하시겠습니까?")) {
            setBalanceQuestions((prev) => prev.map(
                (quiz) => quiz.balance_id === id
                    ? {
                        ...quiz,
                        select: selection
                    }
                    : quiz
            ));
        }
    };

    const toggleResult = (index : number) => {
        setIsResults((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        });
    };

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
                                (q) => q.balance_question === quiz.balance_question
                            );

                            return (
                                <div className="w-full md:w-1/2 lg:w-1/3 p-4 h-[400px]" key={quiz.balance_id}>
                                    {
                                        isResults[index]
                                            ? (
                                                <div
                                                    className="w-full h-full bg-beige rounded-2xl flex flex-col justify-center">
                                                    <div className="flex flex-col items-center justify-center text-center">
                                                        <div className="pb-16">
                                                            <p className="text-orange mb-2 text-xl font-bold">
                                                                {
                                                                    matchedQuestion
                                                                        ?.question1
                                                                }
                                                            </p>
                                                            <div className="flex justify-between w-full">
                                                                {
                                                                    balanaceQuizAnswerList
                                                                        .filter((q) => q.select === "case1")
                                                                        .map((q, idx) => (<p key={idx}>{q.name}</p>))
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-black mb-2 text-xl font-bold">
                                                                {
                                                                    matchedQuestion
                                                                        ?.question2
                                                                }
                                                            </p>
                                                            <div className="flex justify-center">
                                                                {
                                                                    balanaceQuizAnswerList
                                                                        .filter((q) => q.select === "case2")
                                                                        .map((q, idx) => (<p key={idx}>{q.name}</p>))
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
                                                    className="w-full h-full bg-beige rounded-2xl flex flex-col justify-center">
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
                                                        quiz.select === ""
                                                            ? (
                                                                <div className="w-full flex justify-center mt-10">
                                                                    <button
                                                                        className="hover:bg-orange50 bg-orange text-white px-4 py-2 rounded-md mr-4"
                                                                        onClick={() => handleSelect(quiz.balance_id, "case1")}>
                                                                        선택하기
                                                                    </button>
                                                                    <button
                                                                        className="hover:bg-boldGray bg-black text-white px-4 py-2 rounded-md"
                                                                        onClick={() => handleSelect(quiz.balance_id, "case2")}>
                                                                        선택하기
                                                                    </button>
                                                                </div>
                                                            )
                                                            : (
                                                                <div className="w-full flex justify-center mt-10">
                                                                    <button
                                                                        className={`hover:bg-orange50 ${quiz.select === "case1" ? 'bg-orange' : "bg-black"} text-white px-4 py-2 rounded-md`}
                                                                        onClick={() => toggleResult(index)}>
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
