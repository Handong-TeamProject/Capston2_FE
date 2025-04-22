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

interface ProfileQuizAnswer {
    user_id: number;
    name: string;
    answer: string;
    is_correct: boolean;
}

interface IniitialProfileData {
    name?: string;
    age?: number;
    area?: string;
    mbti?: string;
    major?: string;
    tmi?: string;
}

const handleInputChange = (
    field: keyof ProfileData,
    value: string | number,
    setData:
        | React.Dispatch<React.SetStateAction<IniitialProfileData>>
        | React.Dispatch<React.SetStateAction<ProfileData>>
) => {
    setData((prev: any) => ({
        ...prev,
        [field]: value,
    }));
};

const returnFieldName = (text: string): keyof ProfileData | undefined => {
    switch (text) {
        case "이름":
            return "name";
        case "지역":
            return "area";
        case "MBTI":
            return "mbti";
        case "전공":
            return "major";
        case "TMI":
            return "tmi";
        case "나이":
            return "age";
        default:
            return undefined;
    }
};

const RowInputSet = ({
    text1,
    text2,
    value1,
    value2,
    setData,
    isEdit,
}: {
    text1: string;
    text2: string;
    value1: any;
    value2: any;
    isEdit: boolean;
    setData:
        | React.Dispatch<React.SetStateAction<IniitialProfileData>>
        | React.Dispatch<React.SetStateAction<ProfileData>>;
}) => {
    return (
        <div className="w-full">
            <div className="w-full flex">
                <div className="mr-3">
                    <p className="text-orange text-sm lg:text-base mb-2">{text1}</p>
                    <input
                        type="text"
                        className={`w-full ${isEdit ? "bg-lightGray" : "bg-transparent"}`}
                        value={value1 ?? ""}
                        onChange={(e) => {
                            const field = returnFieldName(text1);
                            if (field) handleInputChange(field, e.target.value, setData);
                        }}
                        readOnly={!isEdit}
                    />
                </div>
                <div className="w-full">
                    <p className="text-orange text-sm lg:text-base mb-2">{text2}</p>
                    <input
                        type="text"
                        className={`w-full ${isEdit ? "bg-lightGray" : "bg-transparent"}`}
                        value={value2 ?? ""}
                        onChange={(e) => {
                            const field = returnFieldName(text2);
                            if (field) handleInputChange(field, e.target.value, setData);
                        }}
                        readOnly={!isEdit}
                    />
                </div>
            </div>
        </div>
    );
};

function ProfileCard({
    index,
    data,
    user_id,
    profileQuizAnswer
}: {
    index: number;
    data: ProfileData;
    user_id: number;
    profileQuizAnswer : Array<ProfileQuizAnswer>;
}) {
    const [isEditable, setIsEditable] = useState(user_id === data.user_id);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [isApplyMode, setIsApplyMode] = useState(false);

    const [profileData, setProfileData] = useState(data);
    const [inputData, setInputData] = useState(data as IniitialProfileData);
    const [quizAnswer, setQuizAnswer] = useState("");
    const isApplyStatus = data.apply_status;

    const sortedProfileQuizAnswer = profileQuizAnswer
        .filter((answer) => answer.user_id !== profileData.user_id);
 

    const toggleMode = () => {
        if (isEditable) {
            setIsEditMode(!isEditMode);
        } else {
            setIsQuizMode(!isQuizMode);
        }
    };

    const handleSubmitProfile = () => {
        if (window.confirm("정말로 제출하시겠습니까?")) {
            alert("제출되었습니다.");
            setIsEditMode(false);
        }
    };

    const handleSubmitQuiz = () => {
        if (window.confirm("정말로 제출하시겠습니까?")) {
            alert("제출되었습니다.");
            setIsQuizMode(false);
        }
    };

    const Button = ({
        handler,
        buttonText,
    }: {
        handler: () => void;
        buttonText: string;
    }) => (
        <button
            onClick={handler}
            className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg object-hover ${handleChangeColors(
                buttonText
            )}`}
        >
            {buttonText}
        </button>
    );

    const handleChangeColors = (buttonText: string) => {
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

    return (
        <div className="w-full rounded-3xl bg-beige90 h-52 md:h-60 flex items-center px-4 lg:px-8">
            <div className="flex flex-col items-center mr-4 lg:mr-8">
                <img
                    src={`/Img/member${index + 1}.png`}
                    alt="user image"
                    className="w-14 lg:w-20"
                />
                {
                    isApplyStatus ? (
                        isApplyMode ? (
                             <Button handler={() => setIsApplyMode(false)} buttonText="닫기" />
                        ) : (
                            <Button handler={() => setIsApplyMode(true)} buttonText="현황보기" />
                       )
                    ): (
                            
                        isEditable ? (
                            isEditMode ? (
                                <div className="flex flex-col items-center">
                                <Button handler={handleSubmitProfile} buttonText="완료하기" />
                                <Button handler={() => setIsEditMode(false)} buttonText="취소하기" />
                            </div>
                            ) : (
                                <Button handler={() => setIsEditMode(true)} buttonText="작성하기" />
                            )
                        ) : isQuizMode ? (
                            <div className="flex flex-col items-center">
                                <Button handler={handleSubmitQuiz} buttonText="제출하기" />
                                <Button handler={() => setIsQuizMode(false)} buttonText="취소하기" />
                            </div>
                        ) : (
                            <Button handler={() => setIsQuizMode(true)} buttonText="맞춰보기" />
                        )
                    )
                }
            </div>

            {
                isApplyMode ? (
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <p>{profileData.name}님의 퀴즈 정답</p>
                            <p>{ profileData.age}</p>
                        </div>
                        <div className="w-full">
                            {
                                sortedProfileQuizAnswer.map((answer, index) => (
                                    <div key={index} className="flex gap-2">
                                        {answer.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-2">
                        <RowInputSet
                            text1="이름"
                            text2="지역"
                            value1={isEditable ? inputData.name : profileData.name}
                            value2={isEditable ? inputData.area : profileData.area}
                            setData={setInputData}
                            isEdit={isEditable ? isEditMode : isQuizMode}
                        />
                        <RowInputSet
                            text1="나이"
                            text2="전공"
                            value1={isEditable ? inputData.age : profileData.age}
                            value2={isEditable ? inputData.major : profileData.major}
                            setData={setInputData}
                            isEdit={isEditable ? isEditMode : isQuizMode}
                        />
                        <RowInputSet
                            text1="MBTI"
                            text2="TMI"
                            value1={isEditable ? inputData.mbti : profileData.mbti}
                            value2={isEditable ? inputData.tmi : profileData.tmi}
                            setData={setInputData}
                            isEdit={isEditable ? isEditMode : isQuizMode}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default ProfileCard;
