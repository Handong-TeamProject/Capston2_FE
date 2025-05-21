// components/PreferenceQuestionPage.tsx

'use client';

import { getQuestionAsnwerList, getQuestionList, postQuestion, postQuestionAsnwer, QuestionAnswerPostApiReqeust, QuestionApiResponse, QuestionPostApiReqeust } from "@/app/api/hooks/question";
import ActivityDesc from "@/components/common/ActivityDesc";
import {preferenceQuestionList} from "@/data/common/preferenceQuestionList";

import Image from "next/image";
import React, {useEffect, useState} from "react";



function PreferenceQuestionPage() {

    const [balanceQuestions, setPreferenceQuestions] = useState<QuestionApiResponse[]>([]);
    const [isWriting, setIsWriting] = useState<boolean[]>(
      balanceQuestions.map(() => false)
    );
    // 답변 데이터를 저장할 상태 추가
    const [writingData, setWritingData] = useState<string[]>(
      balanceQuestions.map(() => "")
    );
    const [isResults, setIsResults] = useState<boolean[]>(
      balanceQuestions.map(() => false)
    );
    const fetchData = async () => {
      try {
        const projectId = sessionStorage.getItem("projectId");
        if (!projectId) {
          console.error("Project ID not found in session storage.");
          return;
        }
        const response = await getQuestionList(projectId, "3");
        // console.log(response);
        if (Array.isArray(response)) {
            setPreferenceQuestions(response.reverse().map((item: QuestionApiResponse) => ({
            id: item.id,
            itemId: item.itemId,
            topic: item.topic,
            itemuserId: item.itemuserId,
            questionnum: item.questionnum,
            qanswers: item.qanswers,
            writing_status: item.writing_status,
            })));
        } else {
          console.error("Response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      
      fetchData();
    }, []);
  
    useEffect(() => {
      if (balanceQuestions.length > 0) {
        setIsWriting(balanceQuestions.map(() => false));
        setWritingData(balanceQuestions.map(() => ""));
        // setIsResults(balanceQuestions.map(() => false));
      }
    }, [balanceQuestions]);

    const handleAddQuestion = async () => {
      
        if (window.confirm("문제를 추가하시겠습니까?")) {
            if (balanceQuestions.length == 30) {
              alert("더 이상 추가할 수 없습니다!");
              return 0;
            }

            let newQuestion: QuestionPostApiReqeust;
            const projectId = sessionStorage.getItem("projectId");
            if (!projectId) {
                console.error("Project ID not found in session storage.");
                return;
            }
            do {
                const randomNum = Math.floor(Math.random() * 30) + 1;
                newQuestion = {
                  questionnum: randomNum,
                  itemId: projectId,
                  topic : 3,
                  
                };
            } while (
                balanceQuestions.some((quiz) => quiz.questionnum === newQuestion.questionnum)
            );

            setIsResults((prev) => [
                ...prev,
                false
            ]); // 결과 보기 상태도 함께 추가
            await postQuestion(newQuestion);
            const response = await getQuestionList(projectId, "2");
            fetchData();
          
            alert("문제를 추가합니다.");
        }
    };
  
    const categoryColors: { [key: string]: { base: string; dark: string } } = {
      "감동": { base: "#FFC0CB", dark: "#FF69B4" },
      "웃음": { base: "#FFD700", dark: "#FFA500" },
      "도전": { base: "#FF7F50", dark: "#FF4500" },
      "실수": { base: "#87CEFA", dark: "#4682B4" },
      "여행": { base: "#90EE90", dark: "#228B22" },
      "관계": { base: "#BA55D3", dark: "#800080" },
      "무서운 경험": { base: "#708090", dark: "#2F4F4F" },
      "자랑스러운 순간": { base: "#FFA500", dark: "#FF8C00" },
      "뜻밖의 경험": { base: "#40E0D0", dark: "#008B8B" },
      "친절": { base: "#FF69B4", dark: "#C71585" },
      "선물": { base: "#00CED1", dark: "#008B8B" },
      "학교": { base: "#6A5ACD", dark: "#483D8B" },
      "특별한 하루": { base: "#20B2AA", dark: "#008080" },
      "음악": { base: "#9370DB", dark: "#663399" },
      "책": { base: "#CD5C5C", dark: "#8B0000" },
      "default": { base: "#D3D3D3", dark: "#696969" }
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
            let newQuestionAsnwer : QuestionAnswerPostApiReqeust

            newQuestionAsnwer = {
                questionId: balanceQuestions[index].id,
                itemuserId: balanceQuestions[index].itemuserId,
                answer: writingData[index],
            };  
            postQuestionAsnwer(newQuestionAsnwer);
            alert("제출되었습니다.");

            // writing_status를 true로 바꾸는 부분 추가
            setPreferenceQuestions((prev) => {
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
    

    
    const handleGetResult = async (index: number) => {
      toggleResult(index);
      // api 호출해서 각 답변 가져오기
      const response = await getQuestionAsnwerList(balanceQuestions[index].itemId, balanceQuestions[index].id, balanceQuestions[index].itemuserId);
      // console.log(response);
      setPreferenceQuestions((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          qanswers: response,
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
            <ActivityDesc day={2} activity={0} project_id={1}/>
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
                            const question = preferenceQuestionList.find(
                                (question) => question.question_number === quiz.questionnum
                            );
                            
                            const colors = getCategoryColors(question?.category || '');
                            return (

                                <div className="w-full md:w-1/2 lg:w-1/3 p-4 h-[400px]" key={quiz.id}>
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
                                                      (balanceQuestions[index].qanswers != null) && balanceQuestions[index].qanswers.map((answer, answerIndex) => (
                                                        <div key={answerIndex}>
                                                          <p className="font-extrabold text-lg">{answer.userName}</p>
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

export default PreferenceQuestionPage;
