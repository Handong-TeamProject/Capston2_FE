'use client';
// components/PromiseCreationPage.tsx
import ActivityDesc from "@/components/common/ActivityDesc";
import { promiseActivityList } from "@/data/day4/promiseActivityList"
import { stepGetData } from "@/data/day4/stepGetData";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";

function PromiseCreationPage() {
  interface StepGetData {
    step: number;
    isWrite?: boolean;
    addedActivityList?: number[];
    activity_id?: number;
  }

  const typedStepGetData = stepGetData as StepGetData;
  const [step, setStep] = useState(typedStepGetData.step);
  const [isWrite, setIsWrite] = useState(typedStepGetData.isWrite ?? false);
  const addedActivityList = typedStepGetData.addedActivityList ?? [];
  const finalActivityId = typedStepGetData.activity_id ?? 0;

  const buttonDesc = ['추가하기', '투표하기', '결정하기', '계획하기', '보러가기'];
  const stepDesc = [
    '1. 카테고리 속 다양한 활동 중에서 하고 싶은 활동을 추가해주세요! (최대 3가지)',
    '2. 함께 추가한 활동들 중에서 최대 두 가지의 활동을 정해주세요!',
    '3. 최종 목록 중에서 하나의 활동을 정해주세요!',
    '4. 정해진 활동에 대해서 구체적으로 계획해주세요!',
    '5. 정해진 활동에 대해서 확인해요!'
  ]

  interface PromiseWriteData {
    schedule_id: number;
    project_id: number;
    activity: number;
    title: string;
    date: string;
    place: string;
    address: string;
    place_tel: string;
    other: string;
  }

  interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  x: string; // longitude
  y: string; // latitude
  [key: string]: unknown;
}

  const [promiseWriteData, setPromiseWriteData] = useState<PromiseWriteData>({
    schedule_id: 0,
    project_id: 0,
    activity: finalActivityId,
    title: "",
    date: "",
    place: "",
    address: "",
    place_tel: "",
    other: ""
  });

  const [selectCategory, setSelectCategory] = useState(0);
  const [selectActivities, setSelectActivities] = useState<number[]>([]);

  const [isPlaceModal, setIsPlaceModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [, setPlaceInfo] = useState<KakaoPlace | null>(null);

  // 검색 버튼 클릭 시 호출할 함수 정의
  const handleSearch = () => {
    setSearchKeyword(searchValue); // ✅ KakaoMap의 검색어로 반영됨
    // 모바일 키보드가 내려가도록 처리
    if (typeof window !== "undefined" && "activeElement" in document) {
      (document.activeElement as HTMLElement).blur();
    }
  };



  const StepDesc = (step : number) => {
    return (
      <p className="text-base sm:text-base mb-3">{stepDesc[step-1]}</p>
    )
  }
  const getActivityById = (activityId: number) => {
    for (const category of promiseActivityList) {
      const activity = category.activities.find(act => act.activity_id === activityId);
      if (activity) {
        return { ...activity, category: category.category };
      }
    }
    return null;
  };

  const handleRemoveActivity = (activity: number) => {
    if(window.confirm("삭제하시겠습니까?"))
      setSelectActivities(selectActivities.filter(act => act !== activity));
  }

  const handleAddActivity = (activity: number, limit:number) => {
    if (selectActivities.length >= limit) {
      alert("최대 " + limit + "개의 활동만 추가할 수 있습니다.");
      return;
    }
    if (!selectActivities.includes(activity)) {
      setSelectActivities([...selectActivities, activity]);
    } else {
      alert("이미 추가된 활동입니다.");
    }
  }

  const handleStep1and2Submit = (step: number) => {
    if (step === 1) {      
      if (window.confirm("제출하시겠습니까?")) {
        alert("제출되었습니다!");
        setStep(2);
        setIsWrite(true); // 로직상 추후 삭제해야 함. 어차피 서버로부터 받은 값이라서.
        setSelectActivities([]);
      }
    } else if (step == 2) {
      if (window.confirm("제출하시겠습니까?")) {
        alert("제출되었습니다!");
        setStep(3);
        setIsWrite(true); // 로직상 추후 삭제해야 함. 어차피 서버로부터 받은 값이라서.
        setSelectActivities([]);
      }
    } else if (step == 3) {
      if (window.confirm("제출하시겠습니까?")) {
        alert("제출되었습니다!");
        setStep(4);
        // setIsWrite(true); // 로직상 추후 삭제해야 함. 어차피 서버로부터 받은 값이라서.
        setSelectActivities([]);
      }
    } else if (step == 4) {
      if (window.confirm("제출하시겠습니까?")) {
        alert("제출되었습니다!");
        setStep(5);
        console.log(promiseWriteData);
        // setIsWrite(true); // 로직상 추후 삭제해야 함. 어차피 서버로부터 받은 값이라서.

        // 이후에 주석 풀기
        // setPromiseWriteData({
        //   schedule_id: 0,
        //   project_id: 0,
        //   activity: finalActivityId,
        //   title: "",
        //   date: "",
        //   place: "",
        //   address: "",
        //   place_tel: "",
        //   other: ""
        // });
      }
    } 
  }

  const handleSelectPlace = (place: KakaoPlace) => {
    if (window.confirm("선택하시겠습니까?")) {
      
      setPlaceInfo(place);
      setIsPlaceModal(false);
      setPromiseWriteData(prev => ({
        ...prev,
        place: place.place_name ||  "(미제공)",
        address: place.address_name ||  "(미제공)",
        place_tel: place.phone ||  "(미제공)"
      }));

      setPlaceInfo(null);
      setSearchValue("");
      setSearchKeyword("");
    }
  };

  const handleSelectPlaceModal = () => {
    setIsPlaceModal(false);
    setPlaceInfo(null);
    setSearchValue("");
    setSearchKeyword("");
  }

  const KakaoMap = dynamic(() => import('./KakaoMap'), { ssr: false });

  return (
    <div className="w-full px-6 lg:px-0">
      <ActivityDesc day={3} activity={0} project_id={1} />
      <div className="flex flex-col w-full">
        <div className="w-full flex text-sm lg:text-base mb-2">
          {
            buttonDesc?.map((desc, index) => (
              <p className={`border-orange border rounded p-1 lg:mr-4 ${step === (index + 1) && 'bg-orange text-white'} ${step !== 5 && 'mr-1'}`} key={index}>{desc}</p>
            ))
          }
        </div>
        <div className="w-full bg-beige90 rounded-2xl p-3 mb-10">
          {
            ((step === 1 && !isWrite)|| (step === 2 && !isWrite) || (step === 3 && !isWrite)) && (
              <div className="w-full">
                {StepDesc(step)}
                <div className={`w-full flex flex-wrap justify-between`}>
                  {(step === 1 && !isWrite) && promiseActivityList?.map((data, index) => (
                    <div className="w-1/2 sm:w-1/3 lg:w-auto flex justify-center items-center" key={index}>
                      <p className={`${selectCategory === index && 'bg-orange text-white'} text-sm sm:text-base border border-lightGray w-36 sm:w-40 py-1 rounded-md mb-2 lg:mb-0 flex justify-center items-center`} onClick={() => setSelectCategory(index)}>{data.category}</p>
                    </div>
                  ))}
                </div>

                
                <div className="w-full flex flex-col sm:flex-row">
                  <div className="w-full text-base sm:text-lg mb-4">
                    <p className="font-bold mb-2">활동 목록</p>
                    {/* <div className="h-[200px] overflow-scroll sm:h-auto sm:overflow-auto"> */}
                    <div className="h-[240px] overflow-scroll">
                      {
                        (step === 1 && !isWrite) ?
                        promiseActivityList[selectCategory].activities.map((activity, index) => (
                          <div key = {index}>
                                <div className="flex w-full items-center hover:opacity-50 mb-1 cursor-pointer">
                                  <Image src = "/Img/plus_fill.png" className="w-6 h-6 mb-1 mr-2" alt = "plus_fill" width={24} height={24}/>  
                                  <p className="text-sm sm:text-base" onClick={() => handleAddActivity(activity?.activity_id, 3)}>{activity?.activity}</p>
                                </div>
                            </div>
                        ))
                        : ((step === 2 && !isWrite) || (step === 3 && !isWrite)) &&
                        addedActivityList?.map((activity_id, index) => (
                          <div key = {index}>
                                <div className="flex w-full items-center hover:opacity-50 mb-1 cursor-pointer">
                                  <Image src = "/Img/plus_fill.png" className="w-6 h-6 mb-1 mr-2" alt = "plus_fill" width={24} height={24}/>  
                                  <p className="text-sm sm:text-base" onClick={() => (step === 2) ? handleAddActivity(activity_id, 2) : handleAddActivity(activity_id, 1)}>{getActivityById(activity_id)?.activity}</p>
                                </div>
                            </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  <hr className="border-lightGray sm:hidden" />
                  
                  <div className="w-full text-base sm:text-lg mt-4 sm:mt-0">
                    <p className="font-bold mb-2">담은 목록</p>
                    <div className=" overflow-scroll sm:h-auto sm:overflow-auto">
                      {
                        selectActivities.length === 0 ? (
                          <p className="text-sm sm:text-base text-boldGray">(아무것도 담기지 않았어요)</p>
                        )
                          : 
                        selectActivities.map((activity, index) => (
                          <div key = {index}className="flex w-full justify-between text-sm sm:text-base mb-1.5">
                                <p>{getActivityById(activity)?.activity}</p>
                                <p className = "text-boldGray hover:text-lightGray cursor-pointer" onClick={() => handleRemoveActivity(activity)}>삭제</p>
                            </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center my-4">
                  <button className={`${selectActivities.length > 0 ? 'bg-orange text-white hover:bg-orange50' : 'bg-lightGray  cursor-not-allowed'}  rounded-lg sm:text-lg px-6 sm:px-10 py-1`} onClick={() => handleStep1and2Submit(step)}>제출하기</button>
                </div>
              </div>
            )
          }
          {
            ((step === 1 && isWrite) || (step === 2 && isWrite) || (step === 3 && isWrite)) && (
              <p>팀원들의 선택을 기다려주세요!</p>
            )
          }
          {
            (step === 4 || step === 5)&& (
              isPlaceModal ? (
                <div>
                  <div className="w-full justify-between flex">
                    <p className="text-base sm:text-lg mb-2">장소 선택하기</p>
                    <Image
                      src="/Img/cancleBefore.png"
                      onMouseEnter={(e) =>
                        (e.currentTarget.src = "/Img/cancleAfter.png")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.src = "/Img/cancleBefore.png")
                      }
                      alt="cancel"
                      className="h-6 sm:h-8 w-6 sm:w-8 cursor-pointer md:ml-3"
                      width={32}
                      height={32}
                      onClick={
                        handleSelectPlaceModal
                      }/>
                  </div>
                  <div className="w-full flex flex-wrap">
                      <div className="w-full sm:pr-3">
                        <div className="w-full sm:w-1/2 flex mb-2 justify-between sm:justify-start">
                          <input
                            type="text"
                            className="w-3/5 h-8 bg-lightGray mr-4 text-sm px-2"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="(장소를 입력해주세요)"
                          />
                          <div className="flex justify-center items-center">
                            <button
                              className="px-5 bg-orange50 rounded-md h-8 text-black"
                              onClick={handleSearch} // ✅ 함수 실행 연결
                            >
                              검색
                            </button>
                          </div>
                        </div>
                        <KakaoMap searchKeyword={searchKeyword} onSelectPlace={handleSelectPlace} />
                      </div>
                  </div>
                </div>
              ): (
              <div className="w-full">
                {StepDesc(step)}
                <div className="w-full flex flex-wrap">
                  {/* left */}
                  <div className="w-full sm:w-1/2 sm:pr-3">
                    <div className="mb-5">
                      <p className="text-base mb-1">┃ 활동 종류</p>
                      <div className="flex">
                        <p className="border border-orange  text-orange w-28 h-8 flex items-center justify-center rounded-lg mr-2 text-sm sm:text-base">{getActivityById(finalActivityId)?.category}</p>
                        <p className="border border-orange  text-orange w-28 h-8 flex items-center justify-center rounded-lg text-sm sm:text-base">{getActivityById(finalActivityId)?.activity}</p>
                      </div>
                    </div>
                    <div className="mb-5">
                      <p className="text-base mb-1">┃ 활동 이름</p>
                      <input type="text"  className = "w-full h-8 bg-lightGray pl-2" value={promiseWriteData.title} onChange={(e) => setPromiseWriteData(prev => ({ ...prev, title: e.target.value }))}/>
                    </div>
                    <div className="mb-5">
                      <p className="text-base mb-1">┃ 활동 날짜</p>
                      <input 
                        type = "date"  
                        className="appearance-none w-full min-w-0 h-8 pl-2 bg-lightGray block leading-8"
                        style={{ WebkitAppearance: 'none' }}
                        value={promiseWriteData.date}
                        onChange={(e) => setPromiseWriteData(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="w-full sm:w-1/2 sm:pl-3 flex flex-col justify-between">
                    <div className="mb-5">
                      <div className="w-full flex justify-between items-center">
                        <p className="text-base mb-1">┃ 활동 장소</p>
                            {(step === 4) && <button className="text-orange text-sm" onClick={() => setIsPlaceModal(true)}>장소 선택하기</button>}
                      </div>
                      <p>장소 : {promiseWriteData.place}</p>
                      <p>주소 : {promiseWriteData.address}</p>
                      <p>연락처 : {promiseWriteData.place_tel}</p>
                      
                    </div>
                    <div className="mb-5">
                      <p className="text-base mb-1">┃ 기타 사항</p>
                      <input type="text" className = "w-full h-8 bg-lightGray pl-2" value={promiseWriteData.other} onChange={(e) => setPromiseWriteData(prev => ({ ...prev, other: e.target.value }))}/>
                    </div>
                  </div>
                </div>
                {
                  (step === 4) &&
                  <div className="w-full flex justify-center my-4">
                      <button 
                      className={`${promiseWriteData.title && promiseWriteData.date && promiseWriteData.place && promiseWriteData.address ? 'bg-orange text-white hover:bg-orange50' : 'bg-lightGray cursor-not-allowed'} rounded-lg sm:text-lg px-6 sm:px-10 py-1`} 
                      onClick={() => {
                        if (
                          promiseWriteData.title &&
                          promiseWriteData.date &&
                          promiseWriteData.place &&
                          promiseWriteData.address
                        ) {
                          handleStep1and2Submit(step);
                        }
                      }}

                      >
                      제출하기
                      </button>
                  </div>
                }
              </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PromiseCreationPage;
