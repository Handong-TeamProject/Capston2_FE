'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import React, {useEffect, useState} from "react";
import {profileDesc} from "@/data/day1/profileDesc";
import ProfileCard from "./ProfileCard";
import ProfileCard2 from "./ProfileCard2";
import EmptyProfile from "./EmptyProfile";
import { getMyProfileInfo, MyProfile } from "@/app/api/hooks/profile";

function ProfileListPage() {
    // const [myProfile, setMyProfile] = useState(profileDesc.owner);
    // const [memberProfiles, setMemberProfiles] = useState(profileDesc.members);
    // const [memberProfiles] = useState(profileDesc.members);

    const [myProfile, setMyProfile] = useState<MyProfile>({
            id:0,
            userId: 0,
            itemId: 0,
            writing_status: false,
            userName: "",
            age: "",
            area: "",
            mbti: "",
            major: "",
            tmi: "",
            quizquestion: "",
            apply_status: false,
        });
    
    const [memberProfile, setMemberProfile] = useState<MyProfile[]>([]);

    useEffect(() => {
        const fetchProjectInfo = async () => {
            const projectId = sessionStorage.getItem("projectId");
            if (projectId) {
                const response = await getMyProfileInfo(projectId);
                // console.log("받은 응답:", response);
                const initMyProfile = {
                    id : response.id,
                    writing_status: response.writing_status,
                    itemId: response.itemId,
                    userId: response.userId,
                    quizquestion: response.quizquestion,
                    mbti: response.mbti,
                    area: response.area,
                    major: response.major,
                    age: response.age,
                    tmi: response.tmi,
                    userName: response.userName,
                    apply_status: false,
                };


                setMyProfile(
                    initMyProfile,
                );
                setMemberProfile(
                    response.users
                )
            }
        };
        fetchProjectInfo();
    }, []);

    return (
        <div className="w-full px-6 lg:px-0">
            <div>
                <ActivityDesc day={0} activity={2} project_id={1}/>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-3 mb-6">
                    <ProfileCard myProfile={myProfile} setMyProfile={setMyProfile} />
                    {/* <ProfileCard2 index={0} profileType="" data=
                        {
                        {
                            userId: 0,
                            itemId: 0,
                            writing_status: false,
                            userName: "",
                            age: "",
                            area: "",
                            mbti: "",
                            major: "",
                            tmi: "",
                            quizquestion: "",
                            apply_status: false
                        }
                        // {
                        //     userId: 0,
                        //     itemId: 0,
                        //     writing_status: false,
                        //     userName: "김광일",
                        //     age: "20",
                        //     area: "서울",
                        //     mbti: "ESFJ",
                        //     major: "컴퓨터공학",
                        //     tmi: "발냄새",
                        //     quizquestion: "",
                        //     apply_status: false
                        // }
                    } /> */}
                </div>
                {
                    memberProfile.map((data, index) => (
                        <div key={index} className="w-full md:w-1/2 px-3 mb-6">
                            {
                                data.writing_status === true
                                    ? (
                                        data.apply_status === true
                                            ? (<ProfileCard2 index={0} profileType="" data={data} /> )
                                            : (<ProfileCard2 index={0} profileType="" data={data} /> )
                                    )
                                    : (<EmptyProfile/>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ProfileListPage;
