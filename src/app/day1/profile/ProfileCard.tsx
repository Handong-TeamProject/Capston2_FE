import { MyProfile, putMyProfileInfo } from "@/app/api/hooks/profile";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Image from "next/image";
import {useState } from "react";


function ProfileCard({ myProfile, index, setMyProfile }: { myProfile: MyProfile; index : number, setMyProfile: React.Dispatch<React.SetStateAction<MyProfile>> }) {
    // const [profilData, setProfileData] = useState(data);
    
    
    const [isEdit, setIsEdit] = useState(false);
    const [isResult, setIsResult] = useState(false);
    // const [quizAnswer, setQuizAnswer] = useState("");
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isWriteSuccessModalOpen, setIsWriteSuccessModalOpen] = useState(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

    
    

    const handleChangeColors = (buttonText: string) => {
        switch (buttonText) {
            case "작성하기":
                return "hover:bg-orange50 bg-orange text-white";
            case "제출하기":
                return `${(handleMyInoValidation()) ? 'bg-orange hover:bg-orange50' : 'bg-orange50'}  text-white`;
            case "완료하기":
                return "hover:bg-orange bg-orange50 text-white";
            case "취소하기":
                return "hover:bg-boldGray bg-lightGray text-white";
            case "맞춰보기":
                return "hover:bg-yellow50 bg-yellow text-white";
            case "현황보기":
                return "hover:bg-lightGray bg-boldGray text-white";
            case "닫기":
                return "hover:bg-boldGray bg-lightGray text-white";
            default:
                return "hover:bg-orange50 bg-orange text-white";
        }
    };

    const handleMyInoValidation = () =>  {
        if (myProfile.area?.length > 0 && myProfile.age?.length > 0 && myProfile.major?.length > 0 && myProfile.mbti?.length > 0 && myProfile.tmi?.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }
    const handleCheckMyInfo = () => {
        if (handleMyInoValidation()) {
            setIsWriteModalOpen(true);
        } else {
            setIsCheckModalOpen(true);
        }   

    }
    const handleWriteMyInfo = async () => {

        const putProfile = {
            id : myProfile.id,
            quizquestion: ["mbti", "area", "major", "age", "tmi"][Math.floor(Math.random() * 5)],
            mbti: myProfile.mbti,
            area: myProfile.area,
            major: myProfile.major,
            age: myProfile.age,
            tmi: myProfile.tmi,
        };
        await putMyProfileInfo(putProfile);
        setIsEdit(false);
        setIsWriteModalOpen(false);
        setIsWriteSuccessModalOpen(true);
        setMyProfile((prev) => ({...prev, writing_status :  true}))

    }
    
    return (
        <div className="w-full rounded-3xl bg-beige90 h-52 md:h-60 flex items-center px-4 lg:px-8">
            {/* <p>이름 : {myProfile.userName || ""}</p> */}

            {
                isResult === false ?
                    <>
                        <div className="flex flex-col items-center mr-4 lg:mr-8">
                            <Image
                                src={`/Img/member${index}.png`}
                                alt="user image"
                                className="w-14 lg:w-20"
                                width={48}
                                height={48}
                            />
                            {
                                myProfile.writing_status === false ?
                                    isEdit ?
                                        <button
                                            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('제출하기')}`}
                                            onClick={() => handleCheckMyInfo()}
                                        >제출하기</button>
                                        :
                                        <button
                                            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('작성하기')}`}
                                            onClick={() => setIsEdit(true)}
                                        >작성하기</button>
                                    :
                                    <button
                                        className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('현황보기')}`}
                                        onClick={() => setIsResult(true)}
                                    >현황보기</button>
                            }
                        </div>
                        
                        <div className="flex flex-col w-full">
                            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                                <div className="w-1/2">
                                    <p className="text-orange font-bold mb-1">이름</p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        readOnly
                                        value={myProfile.userName}
                                        onChange={(e) =>
                                            setMyProfile((prev) => ({
                                                ...prev,
                                                userName: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">지역</p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        readOnly = {!isEdit}
                                        value={myProfile.area || ""}
                                        onChange={(e) =>
                                            setMyProfile((prev) => ({
                                                ...prev,
                                                area: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">나이</p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        readOnly = {!isEdit}
                                        value={myProfile.age || ""}
                                        onChange={(e) =>
                                            setMyProfile((prev) => ({
                                                ...prev,
                                                age: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">직업/전공</p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        readOnly = {!isEdit}
                                        value={myProfile.major || ""}
                                        onChange={(e) =>
                                            setMyProfile((prev) => ({
                                                ...prev,
                                                major: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">MBTI</p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        readOnly = {!isEdit}
                                        value={myProfile.mbti || ""}
                                        onChange={(e) =>
                                            setMyProfile((prev) => ({
                                                ...prev,
                                                mbti: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">관심사/TMI</p>
                                    <input
                                        type="text"
                                        className="w-full"
                                        readOnly = {!isEdit}
                                        value={myProfile.tmi || ""}
                                        onChange={(e) =>
                                            setMyProfile((prev) => ({
                                                ...prev,
                                                tmi: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {isWriteModalOpen && (
                            <ConfirmModal
                                message="정말 작성하시겠습니까?"
                                closeModal={() => setIsWriteModalOpen(false)}
                                handleAction={() => handleWriteMyInfo()}
                            />
                        )}
                        {isWriteSuccessModalOpen && ( // 복사 모달 추가
                            <AlertModal
                                message="작성되었습니다!"
                                closeModal={() => setIsWriteSuccessModalOpen(false)}
                            />
                        )}
                        {isCheckModalOpen && ( // 복사 모달 추가
                            <AlertModal
                                message="모든 필드를 작성해주세요!"
                                closeModal={() => setIsCheckModalOpen(false)}
                            />
                        )}
                    </>
                : 
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between mb-2 items-center">
                            <p className="font-bold text-lg">{myProfile.userName}님의 퀴즈 결과</p>
                            <Image src="/Img/cancleBefore.png" onClick={() => setIsResult(false)} alt="cancle" width={30} height={30} className="w-[30px] h-[30px] cursor-pointer" />
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 text-sm lg:text-base">
                                <p className="text-orange">퀴즈 정답</p>
                                <p>{myProfile.mbti}</p>
                            </div>
                            <div className="w-1/2 text-sm lg:text-base">
                                <div className="mb-1">
                                    <p className="text-orange font-bold">김광일님의 답변</p>
                                    <p>MBTI</p>
                                </div>
                                <div className="mb-1">
                                    <p className="text-orange font-bold">김광일님의 답변</p>
                                    <p>MBTI</p>
                                </div>
                                <div className="mb-1">
                                    <p className="text-orange font-bold">김광일님의 답변</p>
                                    <p>MBTI</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default ProfileCard;