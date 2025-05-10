// components/ProfileListPage.tsx
'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import React, { useState } from "react";
import { firstImpressionGetData } from '@/data/day1/firstImpressionGetData';
import { impressionQuestionList } from '@/data/common/impressionQuestionList';
import Image from "next/image";
import { body } from "framer-motion/client";

interface PostImpressionData {
  project_id: number;
  user_id: number;
  is_first: boolean;
  answer1: number;
  answer2: number;
  answer3: number;
  answer4: number;
  answer5: number;
  answer6: number;
}

function FirstImpressionPage() {

  const [isWrite, setIsWrite] = useState(firstImpressionGetData?.is_done);
  const [isAllView, setIsAllView] = useState(true);
  const questionListIndex = firstImpressionGetData?.question_list || [];
  const assignedQuestionList = impressionQuestionList.filter(item => 
    questionListIndex.some(index => index.question_id === item.question_id)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const userList = firstImpressionGetData.user_list;

  const handleChangeQuestion = (value : number) => {
    let currentQuestionIndexBefore = currentQuestionIndex;
    setCurrentQuestionIndex(currentQuestionIndexBefore + value);
    // console.log(currentQuestionIndex);
  }

  const [postImpressionData, setPostImpressionData] = useState<PostImpressionData>({
    project_id: 0,
    user_id: 0,
    is_first: false,
    answer1: 0,
    answer2: 0,
    answer3: 0,
    answer4: 0,
    answer5: 0,
    answer6: 0,
  });

  const handleSelectMember = (select_user_id: number) => {
    const afterImpressionData = {
      ...postImpressionData,
      [`answer${currentQuestionIndex + 1}`]: select_user_id, // Update the value as needed, here it's set to 1
    }
    setPostImpressionData(afterImpressionData);
    // console.log(afterImpressionData);
  }

  const handleSubmit = () => {
    const isValid = [postImpressionData.answer1, postImpressionData.answer2, postImpressionData.answer3, postImpressionData.answer4, postImpressionData.answer5, postImpressionData.answer6].every(answer => answer > 0);
    if (!isValid) {
        alert("모든 질문에 답변을 선택해주세요.");
        return;
    }
    
    if (window.confirm("제출하시겠습니까?")) {
      // validation
      alert("제출되었습니다.")
      setIsWrite(true);
      setCurrentQuestionIndex(0);
    }
  }

  const [impressionData, setImpressionData] = useState(firstImpressionGetData.question_list);

  const calculateVotes = (
    answerList: { user_id: number; answer: number }[],
    userList: number[]
  ) => {
    const voteCounts: { user_id: number; votes: number }[] = [];

    userList.forEach(user_id => {
      voteCounts.push({ user_id, votes: 0 });
    });

    answerList.forEach(({ answer }) => {
      const userVote = voteCounts.find(vote => vote.user_id === answer);
      if (userVote) {
        userVote.votes += 1;
      }
    });

    return voteCounts;
  };
  
  const questionPerData = calculateVotes(impressionData[currentQuestionIndex].answer_list, userList.map(user => user.user_id));

  const indexColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-black";
      case 1:
        return "bg-orange";
      case 2:
        return "bg-yellow";
      case 3:
        return "bg-beige";
    }
  }



  return (
    <div className="w-full px-6 lg:px-0">
      <ActivityDesc day={0} activity={2} project_id={1} />
        {
        isWrite ? (
          <div className="w-full">
            <div className="w-full flex justify-end mb-3">
                <div className={`${isAllView ? "border-orange text-orange" : "border-gray text-gray"} border-2   hover:border-orange hover:text-orange object-hover w-20 flex justify-center items-center h-8 rounded-lg mr-2`} onClick={() => setIsAllView(true)}>전체 보기</div>
                <div className={`${isAllView ? "border-gray text-gray" : "border-orange text-orange"}  border-2  hover:border-orange hover:text-orange object-hover w-20 flex justify-center items-center h-8 rounded-lg`} onClick={() => setIsAllView(false)}>개별 보기</div>
            </div>
            {
            isAllView ? (
              <div className="w-full flex items-center mb-10 flex-col">
                {
                    assignedQuestionList.map((data, index) => (
                      <div className="w-full bg-beige90 rounded-2xl flex flex-col items-center py-5 max-w-[600px] mb-5" key={index}>
                        {
                          <p className="text-xs lg:text-sm text-white bg-orange px-3 py-1 rounded-md mb-4">Q{index + 1}</p>
                        }
                        {
                          <p className="text-lg lg:text-xl mb-10 ">{assignedQuestionList[index].first_question}</p>
                        }
                        <div className="flex min-h-[200px] items-end">
                          {
                            userList.map((data, index2) => (
                              <div key={index2} className="flex flex-col mx-2 h-full justify-end">
                                <div
                                  className={`${indexColor(index2)} flex items-end justify-center text-white rounded-t-lg`}
                                  style={{ height: `${calculateVotes(impressionData[index].answer_list, userList.map(user => user.user_id))[index2].votes * 30 + 30}px` }}
                                >{calculateVotes(impressionData[index].answer_list, userList.map(user => user.user_id))[index2].votes}</div>
                                <p>{data.name}</p>
                              </div>
                            ))
                          }
                        </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              // 작성한 경우의 UI
              <div className="w-full flex justify-center mb-10">
                <div className="w-full bg-beige90 rounded-2xl flex flex-col items-center py-5 max-w-[600px]">
                  {
                    <p className="text-xs lg:text-sm text-white bg-orange px-3 py-1 rounded-md mb-4">Q{currentQuestionIndex + 1}</p>
                  }
                  {
                    <p className="text-lg lg:text-xl mb-10 ">{assignedQuestionList[currentQuestionIndex].first_question}</p>
                  }
                  <div className="flex min-h-[200px]">
                    {
                      userList.map((data, index) => (
                        <div key={index} className="flex flex-col mx-2 h-full justify-end">
                          <div
                            className={`${indexColor(index)} flex items-end justify-center text-white rounded-t-lg`}
                            style={{ height: `${questionPerData[index].votes * 30 + 30}px` }}
                          >{questionPerData[index].votes}</div>
                          <p>{data.name}</p>
                        </div>
                      ))
                    }
                  </div>
                  <div className="w-full flex justify-between  mt-5 px-2">
                    <Image src = "/Img/leftArrow.png" alt = "left" width={48} height={48} className={`hover:opacity-50 w-7 h-7 lg:w-8 lg:h-8  ${currentQuestionIndex > 0 ? '': "invisible"}`} onClick={() => currentQuestionIndex > 0 && handleChangeQuestion(-1)}/>
                    <Image src="/Img/rightArrow.png" alt="right" width={48} height={48} className={`hover:opacity-50 w-7 h-7 lg:w-8 lg:h-8 ${currentQuestionIndex < 5 ? '' : 'invisible'}`} onClick={() => currentQuestionIndex < 5 && handleChangeQuestion(1)} />
                  </div>
                </div>
              </div>
              )
            }
          </div>
          ) : (
            // 작성하지 않은 경우의 UI
            <div className="w-full flex justify-center mb-10">
              <div className="w-full bg-beige90 rounded-2xl flex flex-col items-center py-5 max-w-[600px]">
                {
                  <p className="text-xs lg:text-sm text-white bg-orange px-3 py-1 rounded-md mb-4">Q{currentQuestionIndex + 1}</p>
                }
                {
                  <p className="text-lg lg:text-xl mb-10 ">{assignedQuestionList[currentQuestionIndex].first_question}</p>
                }
                <div className="flex flex-wrap w-full ">
                  {
                    userList.map((data, index) => (
                      <div className="w-1/2 flex items-center justify-center my-2" key={index}>
                        <button
                        className={
                          `${postImpressionData[`answer${currentQuestionIndex + 1}` as keyof PostImpressionData] === data.user_id ? 'border border-orange' : 'border border-black'}
                          hover:border-orange px-3 py-1 mr-2 rounded`
                        }
                        onClick={() => handleSelectMember(data?.user_id)}>{data.name}</button>
                      </div>
                    ))
                  }
                </div>
                <div className="w-full flex justify-between  mt-5 px-2">
                  <Image src = "/Img/leftArrow.png" alt = "left" width={48} height={48} className={`hover:opacity-50 w-7 h-7 lg:w-8 lg:h-8  ${currentQuestionIndex > 0 ? '': "invisible"}`} onClick={() => currentQuestionIndex > 0 && handleChangeQuestion(-1)}/>
                  <Image src="/Img/rightArrow.png" alt="right" width={48} height={48} className={`hover:opacity-50 w-7 h-7 lg:w-8 lg:h-8 ${currentQuestionIndex < 5 ? '' : 'invisible'}`} onClick={() => currentQuestionIndex < 5 && handleChangeQuestion(1)} />
                  {
                    currentQuestionIndex === 5 && <button className="bg-orange text-white hover:bg-orange50 rounded-md px-2 py-1 text-sm lg:text-base" onClick = {handleSubmit}>제출하기</button>
                  }
                </div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default FirstImpressionPage;
