'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import { dayDescription } from "@/data/dayDescription";
import { surveryGetData } from "@/data/day5/surveryGetData";
// components/SurveyPage.tsx
import React, { useEffect, useState } from "react";
import { getSurveyInfo, putSurveryInfo } from "@/app/api/hooks/survey";
import { getProjectInfo } from "@/app/api/hooks/project";

function SurveyPage() {
    const [userList, setUserList] = useState<any[]>([]);
    const improve = ['변화 없음', '약간 향상', '향상', '매우 향상'];
    const satisfaction = ['불만족', '약간 불만족', '만족', '매우 만족']; 
    const [isWrite, setIsWrite] = useState(false);
  interface InputData {
      id: number;
      project_id: number;
      user_id: number;
      q1: number;
      q2: number;
      q3: number;
      q4: number;
      q5: number;
      q6: string;
    }

    const [inputData, setInputData] = useState<InputData>(
      !isWrite
      ? {
        id : 1,
        project_id: 1,
        user_id: 1,
        q1: -1,
        q2: -1,
        q3: -1,
        q4: -1,
        q5: -1,
        q6: "",
        }
        : {
        id : 1,
        project_id: 1,
        user_id: 1,
        q1: Number(surveryGetData?.answer_list[0] ?? -1),
        q2: Number(surveryGetData?.answer_list[1] ?? -1),
        q3: Number(surveryGetData?.answer_list[2] ?? -1),
        q4: Number(surveryGetData?.answer_list[3] ?? -1),
        q5: Number(surveryGetData?.answer_list[4] ?? -1),
        q6: String(surveryGetData?.answer_list[5] ?? ""),
        }
    );
    
    const indexColor = (index: number) => {
      switch (index) {
        case 0:
          return "bg-orange";
        case 1:
          return "bg-yellow";
        case 2:
          return "bg-beige";
      }
    }
    
    const handleSelectValue = (question_index: number, index: number) => {
      if (question_index < 1 || question_index > 5) return; // q1~q5만 처리

      const key = `q${question_index}` as keyof InputData;

      setInputData(prev => ({
        ...prev,
        [key]: index,
      }));
    };
    const isValid = inputData.q1 >= 0 &&
                inputData.q2 >= 0 &&
                inputData.q3 >= 0 &&
                inputData.q4 >= 0 &&
                inputData.q5 >= 0 &&
                inputData.q6.trim().length > 0;


    
    const handleSubmbit = () => {
      // console.log("inputData", inputData);  
      if (!isValid) {
        alert("모든 필드를 입력해주세요!");
        return;
      }
      if (window.confirm("제출하시겠습니까?")) {
        putSurveryInfo({
          id: String(inputData.id),
          q1: inputData.q1 ,
          q2: inputData.q2 ,
          q3: inputData.q3 ,
          q4: inputData.q4 ,
          q5: inputData.q5 ,
          q6: inputData.q6,
          itemId: String(inputData.project_id),
          userId: String(inputData.user_id),
          writing_status : true,
        });
        alert("제출되었습니다.");
        setIsWrite(true);
      }
    }
    const fetchSurveyData = async () => {
      try {
        const projectId = sessionStorage.getItem("projectId");
        if (projectId !== null) {

          // APi 호출
          const response = await getSurveyInfo(projectId);
          // console.log("Survey data:", response);

          setInputData({
            id:Number(response.id),
            project_id: Number(response.itemId ?? 1),
            user_id: Number(response.userId ?? 1),
            q1: Number(response.q1 ?? -1),
            q2: Number(response.q2 ?? -1),
            q3: Number(response.q3 ?? -1),
            q4: Number(response.q4 ?? -1),
            q5: Number(response.q5 ?? -1),
            q6: String(response.q6 ?? ""),
            });

          // isWrite 상태 변경
          if (response.writing_status){
            setIsWrite(true);
          }

          const response2 = await getProjectInfo(projectId);
          if (response2.users && Array.isArray(response2.users)) {
            // console.log("User data:", response2.users);
            setUserList(response2.users);
          }

        }
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    }

    useEffect(() => {
        fetchSurveyData();
    }, []);
    useEffect(() => {
      if (isWrite) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤
      }
    }, [isWrite]);

    return (
        <div className="w-full px-6 lg:px-0">
            <ActivityDesc day={4} activity={1} project_id={1}/>
            <div className="bg-beige90 px-5 py-3 rounded-3xl mb-10">
              <div className="mb-5">
                <p className="text-base sm:text-lg mb-2">1. 가장 기억에 남는 일차를 골라주세요!</p>
                {
                    dayDescription?.map(
                      (data, index) => (
                        <div key={index} className={`border ${!isWrite &&'lg:hover:border-orange lg:hover:bg-orange50'} ${(index) === inputData.q1 && 'bg-orange50 border-orange'} object-lg:hover rounded-2xl p-2 ${index < 4 && 'mb-3'}`} onClick={ () => !isWrite && handleSelectValue(1, index)}>
                          <p className="text-lg font-bold mb-2">{index + 1}일차</p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            {
                              data?.activity?.map((activity, index2) => (
                                <div key={index2} className={`${indexColor(index2)} flex items-center justify-center flex-col sm:w-48 h-16 sm:h-24 rounded-lg`}>
                                  <p className="text-sm text-boldGray">{activity?.aka}</p>
                                  <p>{activity?.title}</p>
                                </div>
                              ))
                            }
                          </div>
                        </div>)
                    )
                }
              </div>
              <div className="mb-5">
                <p className="text-base sm:text-lg mb-2">2. 프로그램을 통해 가장 친해진 팀원은 누구인가요?</p>
                <div className="flex flex-wrap sm:flex-nowrap">
                  {
                    userList?.map((user, index) => (
                      <div className={`w-1/2 sm:w-auto flex justify-center items-center sm:justify-normal sm:items-start ${index < 2 && 'mb-4'}`} key={index}>
                        <button key = {index} className={`border rounded-md px-2 mr-2 min-w-24 h-8 text-sm sm:text-base lg:hover:bg-lightGray ${index === inputData.q2 ? 'border-boldGray bg-orange' : 'bg-white'}` } onClick={ () => !isWrite && handleSelectValue(2, index)}>
                            {user?.userName}
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="mb-5">
                <p className="text-base sm:text-lg mb-2">3. 팀원들과의 신뢰감은 얼마나 향상되었다고 느끼나요?</p>
                <div className="flex flex-wrap sm:flex-nowrap">
                  {
                    improve?.map((answer, index) => (
                      <div className={`w-1/2 sm:w-auto flex justify-center items-center sm:justify-normal sm:items-start ${index < 2 && 'mb-4'}`} key={index}>
                        <button key = {index} className={`border rounded-md px-2 mr-2 w-24 h-8 text-sm sm:text-base lg:hover:bg-lightGray ${index === inputData.q3 ? 'border-boldGray bg-orange' : 'bg-white'}` } onClick={ () => !isWrite && handleSelectValue(3, index)}>
                            {answer}
                        </button>
                      </div>
                    ))
                  }
                </div>
                </div>
              <div className="mb-5">
                <p className="text-base sm:text-lg mb-2">4. 전반적인 활동들에 대해서 어느정도 만족하시나요?</p>
                <div className="flex flex-wrap sm:flex-nowrap">
                  {
                    satisfaction?.map((answer, index) => (
                      <div className={`w-1/2 sm:w-auto flex justify-center items-center sm:justify-normal sm:items-start ${index < 2 && 'mb-4'}`} key={index}>
                        <button key = {index} className={`border rounded-md px-2 mr-2 w-24 h-8 text-sm sm:text-base lg:hover:bg-lightGray ${index === inputData.q4 ? 'border-boldGray bg-orange' : 'bg-white'}` } onClick={ () => !isWrite && handleSelectValue(4, index)}>
                            {answer}
                        </button>
                      </div>
                    ))
                  }
                </div>
                </div>
              <div className="mb-5">
                <p className="text-base sm:text-lg mb-2">5. 시작과 마무리를 비교했을 때, 라포 형성과 관계 발전이 얼마나 있었나요?</p>
                <div className="flex flex-wrap sm:flex-nowrap">
                  {
                    improve?.map((answer, index) => (
                      <div className={`w-1/2 sm:w-auto flex justify-center items-center sm:justify-normal sm:items-start ${index < 2 && 'mb-4'}`} key={index}>
                        <button key = {index} className={`border rounded-md px-2 mr-2 w-24 h-8 text-sm sm:text-base lg:hover:bg-lightGray ${index === inputData.q5 ? 'border-boldGray bg-orange' : 'bg-white'}` } onClick={ () => !isWrite && handleSelectValue(5, index)}>
                            {answer}
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="mb-5">
                <p className="text-base sm:text-lg mb-2">6. 추가로 남기고 싶은 내용이 있으신가요?</p>
            <textarea className="resize-none border w-full h-32 rounded-md p-1" placeholder="예시) 만족스러운 Rapo였습니다!" readOnly={isWrite} onChange={(e) => setInputData(prev => ({ ...prev, q6: e.target.value }))} value = {inputData.q6}></textarea>
              </div>
              
              { !isWrite && 
                <div className="w-full flex justify-end">
                    <button
                      className={`py-1 rounded-lg w-32 text-white ${isValid ? 'bg-orange lg:hover:bg-orange50' : 'bg-boldGray'}`}
                      onClick={handleSubmbit}
                    >
                      제출하기
                    </button>
                </div>
              }

            </div>
        </div>
    );
};

export default SurveyPage;
