// components/SituationQuestionPage.tsx

'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import {situationQuestionList} from "@/data/common/situationQuestionList";
import { situationQuestionGetData } from "@/data/day2/situationQuestionGetData";
import { situationAnswerGetData } from "@/data/day2/situationAnswerGetData";

import Image from "next/image";
import React, {useState} from "react";

type ExperienceQuestion = {
    "question_number": number,
    "writing_status": boolean
};


const SituationQuestionPage: React.FC = () => {

    const [balanceQuestions, setExperienceQuestions] = useState<ExperienceQuestion[]>(
        situationQuestionGetData
    );
    const [isWriting, setIsWriting] = useState<boolean[]>(
      situationQuestionGetData.map(() => false)
    );
    // 답변 데이터를 저장할 상태 추가
    const [writingData, setWritingData] = useState<string[]>(
      situationQuestionGetData.map(() => "")
    );
    const [isResults, setIsResults] = useState<boolean[]>(
        situationQuestionGetData.map(() => false)
    );

    const handleAddQuestion = () => {
        if (window.confirm("문제를 추가하시겠습니까?")) {
            if (balanceQuestions.length == 30) {
              alert("더 이상 추가할 수 없습니다!");
              return 0;
            }

            let newQuestion: ExperienceQuestion;

            do {
                const randomNum = Math.floor(Math.random() * 30) + 1;
                newQuestion = {
                    question_number: randomNum,
                    writing_status: false
                };
            } while (
                balanceQuestions.some((quiz) => quiz.question_number === newQuestion.question_number)
            );

            setExperienceQuestions((prev) => [
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
  
    const categoryColors: { [key: string]: { base: string; dark: string } } = {
      "미래와 선택": { base: "#ADD8E6", dark: "#4682B4" },       // 연한 파랑 / 짙은 파랑
      "초능력": { base: "#DA70D6", dark: "#8A2BE2" },             // 연보라 / 진보라
      "동물과의 소통": { base: "#98FB98", dark: "#2E8B57" },      // 연녹색 / 어두운 초록
      "음식": { base: "#FFDAB9", dark: "#FF8C00" },                // 복숭아색 / 주황
      "명성": { base: "#F4A460", dark: "#D2691E" },                // 사막색 / 갈색
      "기억": { base: "#E6E6FA", dark: "#9370DB" },                // 라벤더 / 중간보라
      "역사": { base: "#CD853F", dark: "#8B4513" },                // 탄색 / 초콜릿색
      "감정": { base: "#FFC0CB", dark: "#FF1493" },                // 핑크 / 진한 핑크
      "영화": { base: "#FFE4B5", dark: "#CD853F" },                // 밀가루색 / 탄색
      "시간여행": { base: "#AFEEEE", dark: "#5F9EA0" },            // 밝은 청록 / 회색청록
      "신체 변화": { base: "#FFB6C1", dark: "#FF1493" },           // 연한 핑크 / 핫핑크
      "사회 규칙": { base: "#20B2AA", dark: "#008080" },           // 연한 청록 / 진한 청록
      "현실 변환": { base: "#B0E0E6", dark: "#4682B4" },           // 밝은 청색 / 강한 파랑
      "패션": { base: "#FF69B4", dark: "#C71585" },                // 핑크 / 자홍색
      "언어": { base: "#00CED1", dark: "#008B8B" },                // 청록 / 진청록
      "꿈": { base: "#D8BFD8", dark: "#9370DB" },                  // 연보라 / 보라
      "영화 주인공": { base: "#FFE4E1", dark: "#FA8072" },         // 미스트 로즈 / 연어색
      "기억 조작": { base: "#FAFAD2", dark: "#DAA520" },           // 연한 황색 / 골드
      "인터넷": { base: "#87CEFA", dark: "#4682B4" },              // 연한 하늘색 / 스틸블루
      "우주": { base: "#191970", dark: "#000080" },                // 미드나잇 블루 / 네이비
      "default": { base: "#D3D3D3", dark: "#696969" }              // 연한 회색 / 다크 그레이
    };
  
    const getCategoryColors = (category: string) => {
      return categoryColors[category] || categoryColors["default"];
    };
    
    const toggleResult = (index : number) => {
        setIsResults((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        });
    };
    const toggleWrite = (index : number) => {
        setIsWriting((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        });
    };
  
    const handleChangeWritingData = (index: number, value: string) => {
      setWritingData((prev) => {
        const newData = [...prev];
        newData[index] = value;
        return newData;
      });
    };

    const handleSubmitAnswer = (index: number) => {
        if (writingData[index] === "") {
          alert("답변을 입력해주세요.");
          return;
        }
        if (window.confirm("제출하시겠습니까?")) {
            alert("제출되었습니다.");

            // writing_status를 true로 바꾸는 부분 추가
            setExperienceQuestions((prev) => {
                const copy = [...prev];
                copy[index] = {
                    ...copy[index],
                    writing_status: true,  // writing_status만 true로 변경
                };
                return copy;
            });

            toggleWrite(index); // 작성 중 상태를 토글
        }
    };
    
    const [situationAnswers, setExperienceAnswers] = useState(situationAnswerGetData);
    
    const handleGetResult = (index: number) => {
      toggleResult(index);
      // api 호출해서 각 답변 가져오기
    }



    return (
        <div className="w-full px-6 lg:px-0">
            <ActivityDesc day={1} activity={1} project_id = {1}/>
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
                    balanceQuestions.length > 0 ? (
                        balanceQuestions.map((quiz, index) => {
                            const question = situationQuestionList.find(
                                (question) => question.question_number === quiz.question_number
                            );
                            
                            const colors = getCategoryColors(question?.category || '');
                            return (

                                <div className="w-full md:w-1/2 lg:w-1/3 p-4 h-[400px]" key={quiz.question_number}>
                                  <div className={`w-full h-full bg-beige90 rounded-2xl flex flex-col p-6 justify-between box-border border transition-colors duration-300 ease-in-out ${ isWriting[index] ? "border-orange" : "border-transparent"}`}>
                                            <div>
                                              <div className="w-full flex justify-between ">
                                                <span className="px-4 text-xs py-1 rounded" style={{color: colors.dark, backgroundColor: colors.base + "30"}} >
                                                  {question?.category}
                                                </span>
                                                { isResults[index] &&
                                                  <Image
                                                    src="/Img/cancleBefore.png"
                                                    onMouseEnter={(e) =>
                                                      (e.currentTarget.src = "/Img/cancleAfter.png")
                                                    }
                                                    onMouseLeave={(e) =>
                                                      (e.currentTarget.src = "/Img/cancleBefore.png")
                                                    }
                                                    alt="cancel"
                                                    className="ml-1 h-6 w-6 cursor-pointer md:ml-3"
                                                    width={24}
                                                    height={24}
                                                    onClick={() =>
                                                      toggleResult(index)
                                                    }
                                                  />
                                                }
                                              </div>
                                              <p className="text-orange font-extrabold mt-6 mb-1">Q{index + 1}</p>
                                              <p className="text-orange text-xl font-extrabold">{question?.question}</p>
                                            </div>
                                            <div className="h-1/2 flex flex-col justify-end">
                                              {
                                                isResults[index] ? (
                                                  <div className="overflow-y-auto h-full ">
                                                    {
                                                      situationAnswers.map((answer, answerIndex) => (
                                                        <div key={answerIndex}>
                                                          <p className="font-extrabold text-lg">{answer.name}</p>
                                                          <input className="bg-lightGray w-full mb-2 mt-1 h-8 pl-1 text-sm rounded-md flex items-center" value={answer?.answer} readOnly/>
                                                        </div>
                                                      ))
                                                    }
                                                  </div>
                                                ) : (
                                                  quiz.writing_status ? (
                                                    <button className="w-full h-10 bg-orange hover:bg-orange50 text-white rounded font-semibold text-lg" onClick={() => handleGetResult(index)}>결과보기</button>
                                                  ) : (
                                                    isWriting[index] ? (
                                                      <div className="flex flex-col">
                                                        <p className="font-extrabold text-lg">답변</p>
                                                        <input type="text" className="bg-lightGray w-full mb-8 mt-1 h-8 pl-1 text-sm" value={writingData[index]} placeholder="(답변을 남겨주세요)" onChange={(e) => {handleChangeWritingData(index, e.target.value)}}/>
                                                        <button className={`w-full h-10 rounded font-semibold text-lg ${writingData[index]?.length > 0 ? 'bg-black text-white hover:bg-boldGray' : 'bg-gray'}`} onClick = {() => handleSubmitAnswer(index)}>제출하기</button>
                                                      </div>
                                                    ) : (
                                                        <button className="w-full h-10 bg-yellow hover:bg-yellow50 hover:text-gray rounded font-semibold text-lg" onClick={() => toggleWrite(index)}>답변하기</button>
                                                    )
                                                  ) 
                                                )
                                              }
                                            </div>
                                        </div>
                                    {/* {
                                      isResults[index] ? (
                                        <div className="w-full h-full bg-beige90 rounded-2xl flex flex-col p-6 ">
                                          <div className="flex justify-end w-full">
                                            
                                          </div>
                                          
                                        </div>
                                      ) : (
                                        
                                      )
                                    } */}
                                </div>
                            )
                        }
                      )
                    )  : (
                        <div className="flex-container min-h-80 justify-center md:min-h-[500px]">
                          <p className="mb-3 text-base font-bold text-lightGray md:text-xl">
                            아직 프로젝트가 없습니다.
                          </p>
                          <Image src="/Img/empty.png" className="md:w-24" alt = "empty Img"  width={80} height={80}/>
                        </div>
                    )
                  }
                </div>
            </div>
        </div>
    );
}

export default SituationQuestionPage;
