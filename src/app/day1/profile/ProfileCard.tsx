import Image from "next/image";
import { useState } from "react";

interface ProfileData {
    user_id: number;
    profile_writing_status: boolean;
    name?: string;
    age?: number;
    area?: string;
    mbti?: string;
    major?: string;
    tmi?: string;
    quiz_question?: string;
    apply_status?: boolean;
}

const handleReturnValue = (text : string) => {
    switch (text) {
        case "이름":
            return "name";
        case "지역":
            return "area";
        case "MBTI":
            return "mbti";
        case "직업/전공":
            return "major";
        case "관심사/TMI":
            return "tmi";
        case "나이":
            return "age";
        default:
            return undefined;
    }
}

function ProfileCard({index, profileType, data} : {
    index: number;
    profileType: string;
    data : ProfileData
}) {
    
    // const [profilData, setProfileData] = useState(data);
    const [profilData] = useState(data);
    const [initData, setInitData] = useState<ProfileData>({
        user_id: 0,
        profile_writing_status: false,
        name: profilData.name,
        age: 0,
        area: "",
        mbti: "",
        major: "",
        tmi: "",
        quiz_question: "",
        apply_status: false,
    });
    const [isEdit, setSetIsEdit] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState("");

    const handleChangeColors = (buttonText : string) => {
        switch (buttonText) {
            case "작성하기":
                return "hover:bg-orange50 bg-orange text-white";
            case "제출하기":
                return "hover:bg-orange bg-orange50 text-white";
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

    const Button = ({handler, buttonText} : {
        handler: () => void;
        buttonText: string;
    }) => (
        <button
            onClick={handler}
            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors(buttonText)}`}>
            {buttonText}
        </button>
    );



    const RowInput = ({ text1, text2, data}: { text1: string; text2: string; data: ProfileData;}) => {
        
        return (
            <div className="w-full flex gap-3 mb-1 text-sm lg:text-base">
                <div className="w-1/3">
                    <p className="text-orange  font-bold mb-1">{text1}</p>
                    {
                        profileType === "owner_before" ? (
                            isEdit ? (
                                <input type="text" className="w-full" value={String(data[handleReturnValue(text1) as keyof ProfileData]) ?? ""} onChange={(e) =>
                                    setInitData((prev) => ({
                                        ...prev,
                                        [handleReturnValue(text1) as keyof ProfileData]: e.target.value,
                                    }))
                                }/>
                            ) : (
                                <p>{String(data[handleReturnValue(text1) as keyof ProfileData]) ?? ""}</p>
                            )
                        ) : (
                            handleReturnValue(text1) === profilData.quiz_question ? (
                                isEdit ? (
                                    <input type="text" className="w-full" autoFocus value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)}/>
                                ) : (
                                    <p className="text-white bg-gray rounded-md text-center w-1/2">Quiz</p>
                                )
                            ) : (
                                <p>{String(data[handleReturnValue(text1) as keyof ProfileData]) ?? ""}</p>
                            )
                        )
                    }
                    

                </div>
                <div className="w-2/3">
                    <p className="text-orange font-bold mb-1">{text2}</p>
                    {
                        profileType === "owner_before" ? (
                            isEdit ? (
                                <input type="text" className="w-full" value={String(data[handleReturnValue(text2) as keyof ProfileData]) ?? ""} onChange={(e) =>
                                    setInitData((prev) => ({
                                        ...prev,
                                        [handleReturnValue(text2) as keyof ProfileData]: e.target.value,
                                    }))
                                }/>
                            ) : (
                                <p>{String(data[handleReturnValue(text2) as keyof ProfileData]) ?? ""}</p>
                            )
                        ) : (
                            handleReturnValue(text2) === profilData.quiz_question ? (
                                isEdit ? (
                                    <input type="text" className="w-full" autoFocus value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)}/>
                                ) : (
                                    <p className="text-white bg-gray rounded-md text-center w-1/2">Quiz</p>
                                )
                            ) : (
                                <p>{String(data[handleReturnValue(text2) as keyof ProfileData]) ?? ""}</p>
                            )
                        )
                    }

                </div>
            </div>
            
        )
    }

    const handleSubmit = (submitType: string) => {
        if (window.confirm("정말로 제출하시겠습니까?")) {
            if (submitType === "write") {
                // write api code
                data.profile_writing_status = true;
                setSetIsEdit(false);
            } else if (submitType === "quiz") {
                // quiz api code
                profilData.apply_status = true;
                setSetIsEdit(false);
            }

            alert("제출되었습니다.");
        }
    }
    return (
        <div
            className="w-full rounded-3xl bg-beige90 h-52 md:h-60 flex items-center px-4 lg:px-8">
            <div className="flex flex-col items-center mr-4 lg:mr-8">
                <Image
                    src={`/Img/member${index + 1}.png`}
                    alt="user image"
                    className="w-14 lg:w-20"
                    width={48}
                    height={48}
                />
                {
                    // isEdit ? (
                    //     <Button handler = {() => handleSubmit("write")} buttonText="제출하기"/>
                    // ) : (
                    //     <Button handler = {() => setSetIsEdit(!isEdit)} buttonText="작성하기"/>
                    // )   
                    profileType === "owner_before" ? (
                        isEdit ? (
                            <Button handler = {() => handleSubmit("write")} buttonText="제출하기"/>
                        ) : (
                            <Button handler = {() => setSetIsEdit(!isEdit)} buttonText="작성하기"/>
                        )
                    ) :profileType === "owner_after" ? (
                        isEdit ? (
                            <Button handler = {() => setSetIsEdit(!isEdit)} buttonText="닫기"/>
                        ) : (
                            <Button handler = {() => setSetIsEdit(!isEdit)} buttonText="현황보기"/>
                        )
                    ) : (
                        profileType === "apply" ? (
                            isEdit ? (
                            <Button handler = {() => setIsResult(!isResult)} buttonText="닫기"/>
                        ) : (
                            <Button handler = {() => setIsResult(!isResult)} buttonText="현황보기"/>
                        )
                        ) : (
                            isEdit ? (
                            <Button handler = {() => handleSubmit("write")} buttonText="제출하기"/>
                        ) : (
                            <Button handler = {() => setSetIsEdit(!isEdit)} buttonText="맞춰보기"/>
                        )
                        )
                    )
                }

            </div>
            {
                isResult ? (
                    <div className="w-full flex">
                        <div className="w-1/2 text-sm lg:text-base">
                            <p className="text-orange">퀴즈 정답</p>
                            <p>ISFJ</p>
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
                ) : (
                    profileType === "owner_before" ? (
                            <div className="flex flex-col w-full">
                                <RowInput data={initData} text1="이름" text2="지역"/>
                                <RowInput data={initData} text1 = "나이" text2 = "직업/전공"/>
                                <RowInput data={initData} text1 = "MBTI" text2 = "관심사/TMI"/>
                            </div>
                        ) : (
                            <div className="flex flex-col w-full">
                                <RowInput data={profilData} text1="이름" text2="지역"/>
                                <RowInput data={profilData} text1 = "나이" text2 = "직업/전공"/>
                                <RowInput data={profilData} text1 = "MBTI" text2 = "관심사/TMI"/>
                            </div>
                    )
                )    
            }
        </div>
    );
}
export default ProfileCard;