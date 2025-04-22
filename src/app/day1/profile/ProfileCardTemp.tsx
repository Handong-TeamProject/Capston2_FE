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

function ProfileCard({ index, data, user_id }: { index: number; data: ProfileData; user_id: number }) {
    const [isEditable, setIsEditable] = useState(user_id === data.user_id);
    const [isEditing, setIsEditing] = useState(false);
    const [quizMode, setQuizMode] = useState(false);
    const [profileData, setProfileData] = useState(data);
    const [quizAnswer, setQuizAnswer] = useState("");

    const handleInputChange = (field: keyof ProfileData, value: string | number) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleMode = () => {
        if (isEditable) {
            // setQuizMode(false); // Reset quiz mode when switching to edit mode
            setIsEditing(!isEditing);
        } else {
            setQuizMode(!quizMode);
        }
    };

    return (
        <div className="w-full rounded-3xl bg-beige90 h-52 md:h-60 flex items-center pl-4 lg:pl-10">
            <div className="flex flex-col items-center mr-4 lg:mr-10">
                <img src={`/Img/member` + (index + 1) + ".png"} alt="user image" className="w-14 lg:w-20" />
                <button
                    className={`rounded-md w-20 lg:w-24 h-8 mt-4 text-sm lg:text-lg ${
                        isEditable ? "bg-orange text-white" : "bg-beige text-orange"
                    }`}
                    onClick={toggleMode}
                >
                    {isEditable ? "작성하기" : quizMode ? "취소" : "맞춰보기"}
                </button>
            </div>
            <div className="w-full">
                <div className="flex w-full">
                    <div className="mr-4 mb-2 text-sm lg:text-base">
                        <p className="text-orange mb-2">이름</p>
                        {
                            isEditable ? (
                                <input
                                    type="text"
                                    className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                    value={profileData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            ): (

                                data.quiz_question === "name" ? (
                                    quizMode ? (
                                        <input
                                        type="text"
                                        className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                        />
                                    ): (
                                        <p className = "w-12 bg-boldGray text-center rounded-lg text-white">Quiz</p>
                                    )
                                ): (
                                    <p>{data.name}</p>
                                )
                            )
                        }
                    </div>
                    <div className="mr-4 mb-2 text-sm lg:text-base w-full">
                        <p className="text-orange mb-2">지역</p>
                        {
                            data.quiz_question === "area" ? (
                                quizMode ? (
                                    <input
                                        type="text"
                                        className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                    />
                                ): (
                                    <p className = "w-12 bg-boldGray text-center rounded-lg text-white">Quiz</p>
                                )
                            ): (
                                    <p>{data.area}</p>
                            )
                        }
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="mr-4 mb-2 text-sm lg:text-base">
                        <p className="text-orange mb-2">나이</p>
                        {
                            data.quiz_question === "age" ? (
                                quizMode ? (
                                    <input
                                        type="text"
                                        className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                    />
                                ): (
                                    <p className = "w-12 bg-boldGray text-center rounded-lg text-white">Quiz</p>
                                )
                            ): (
                                    <p>{data.age}</p>
                            )
                        }
                    </div>
                    <div className="mr-4 mb-2 text-sm lg:text-base w-full">
                        <p className="text-orange mb-2">직업/전공</p>
                        {
                            data.quiz_question === "major" ? (
                                quizMode ? (
                                    <input
                                        type="text"
                                        className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                    />
                                ): (
                                    <p className = "w-12 bg-boldGray text-center rounded-lg text-white">Quiz</p>
                                )
                            ): (
                                    <p>{data.major}</p>
                            )
                        }
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="mr-4 mb-2 text-sm lg:text-base">
                        <p className="text-orange mb-2">mbti</p>
                        {
                            data.quiz_question === "mbti" ? (
                                quizMode ? (
                                    <input
                                        type="text"
                                        className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                    />
                                ): (
                                    <p className = "w-12 bg-boldGray text-center rounded-lg text-white">Quiz</p>
                                )
                            ): (
                                    <p>{data.mbti}</p>
                            )
                        }
                    </div>
                    <div className="mr-4 mb-2 text-sm lg:text-base w-full">
                        <p className="text-orange mb-2">관심사/TMI</p>
                        {
                            data.quiz_question === "tmi" ? (
                                quizMode ? (
                                    <input
                                        type="text"
                                        className="w-12 lg:w-16 outline-none focus:outline focus:outline-1 focus:outline-orange"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                    />
                                ): (
                                    <p className = "w-12 bg-boldGray text-center rounded-lg text-white">Quiz</p>
                                )
                            ): (
                                    <p>{data.tmi}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
