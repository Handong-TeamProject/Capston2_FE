import { getMemberQuizAnswers, MyProfile, PostMemberQuizAnswer, postMemberQuizAnswer } from "@/app/api/hooks/profile";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Image from "next/image";
import { useState } from "react";


function MemberCard({ data, index, id }: { data: MyProfile, index : number, id : number }) {
    
    const [, setIsResult] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [myProfile] = useState<MyProfile>(data);
    const quizQuesion = myProfile.quizquestion;
    const [quizAnswer, setQuizAnswer] = useState("");
    const [isApply, setIsApply] = useState(myProfile?.apply_status);


    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isWriteSuccessModalOpen, setIsWriteSuccessModalOpen] = useState(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

    type memberQuizAnswer = {
        userName: string;
        answer: string;
    };

    const [memberQuizAnswers, setMemberQuizAnswers] = useState<memberQuizAnswer[]>([]);

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

    const Input = ({ field }: { field: keyof MyProfile }) => {
    // If the field is the quiz question
        if (quizQuesion === field && isApply === false) {
            if (isEdit) {
                return (
                    <input
                        type="text"
                        className="w-full"
                        defaultValue={quizAnswer}
                        onBlur={(e) => setQuizAnswer(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setQuizAnswer(e.currentTarget.value);
                            }
                        }}
                        autoFocus
                        autoComplete="off"
                    />
                );
            } else {
                return (
                    <p className="w-full bg-orange rounded-sm text-center ">
                        Quiz
                    </p>
                );
            }
        }

        // For other fields, show read-only input
        return (
            <input
                type="text"
                className="w-full"
                readOnly
                value={myProfile[field] as string | number | readonly string[] | undefined}
                tabIndex={-1}
            />
        );
    }

    const handleCheckQuizAnswewr = () => {
        if (quizAnswer.length > 0) {
            setIsWriteModalOpen(true);
        } else {
            setIsCheckModalOpen(true);
        }
    }
    const handleQuizAnswerSubmit = async () => {
        const data:PostMemberQuizAnswer = {
            answer: quizAnswer,
            authorId: myProfile.id,
            itemuserId : id,
        }
        await postMemberQuizAnswer(data);
        setIsEdit(false);
        setIsWriteModalOpen(false);
        setIsWriteSuccessModalOpen(true);
        setIsApply(true);
    }

    const handleShowResult = async (id: number) => {
            setIsResult(true);
            const response = await getMemberQuizAnswers(id);
            setMemberQuizAnswers(
                Array.isArray(response)
                ? response.map((item) => ({
                    userName: item.userName,
                    answer : item.answer
                }))
                : []
            );
    
        }

    return (
        <div className="w-full rounded-3xl bg-beige90 h-52 md:h-60 flex items-center px-4 lg:px-8">
            {
                isApply && isEdit == true
                    ?
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between mb-2 items-center">
                            <p className="font-bold text-lg">{myProfile.userName}님의 퀴즈 결과</p>
                            <Image src="/Img/cancleBefore.png" onClick={() => setIsResult(false)} alt="cancle" width={30} height={30} className="w-[30px] h-[30px] cursor-pointer" />
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 text-sm lg:text-base">
                                <p className="text-orange">퀴즈 정답 <span className="text-black">(주제 : {myProfile.quizquestion})</span></p>
                                <p>{myProfile[myProfile.quizquestion as keyof MyProfile]}</p>
                            </div>
                            <div className="w-1/2 text-sm lg:text-base">
                                {
                                    memberQuizAnswers.map((data, index) => (
                                        <div className="mb-1" key = {index}>
                                            <p className="text-orange font-bold">{data.userName}님의 답변</p>
                                            <p>{data.answer}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            
                    :
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
                                isApply
                                    ?
                                    isEdit
                                        ?
                                        <button
                                            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('닫기')}`}
                                            onClick={() => setIsEdit(false)}
                                        >닫기</button>
                                        :
                                        <button
                                            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('현황보기')}`}
                                            onClick={() => handleShowResult(myProfile.id)}
                                        >현황보기</button>
                                    :
                                    isEdit
                                        ?
                                        <button
                                            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('제출하기')}`}
                                            onClick={() => handleCheckQuizAnswewr()}
                                        >제출하기</button>
                                        :
                                        <button
                                            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors('맞춰보기')}`}
                                            onClick={() => setIsEdit(true)}
                                        >맞춰보기</button>
                            }
                        </div>
                
                        <div className="flex flex-col w-full">
                            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                                <div className="w-1/2">
                                    <p className="text-orange font-bold mb-1">이름</p>
                                    <Input field={'userName'} />
                                </div>
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">지역</p>
                                    <Input field={'area'} />
                                </div>
                            </div>
                            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">나이</p>
                                    <Input field={'age'} />
                                </div>
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">직업/전공</p>
                                    <Input field={'major'} />
                                </div>
                            </div>
                            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">MBTI</p>
                                    <Input field={'mbti'} />
                                </div>
                                <div className="w-1/2">
                                    <p className="text-orange  font-bold mb-1">관심사/TMI</p>
                                    <Input field={'tmi'} />
                                </div>
                            </div>
                        </div>
                        {isWriteModalOpen && (
                            <ConfirmModal
                                message="정말 제출하시겠습니까?"
                                closeModal={() => setIsWriteModalOpen(false)}
                                handleAction={() => handleQuizAnswerSubmit()}
                            />
                        )}
                        {isWriteSuccessModalOpen && ( // 복사 모달 추가
                            <AlertModal
                                message="제출되었습니다!"
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
            }
        </div>
    )
}
export default MemberCard;