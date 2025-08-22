'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import React, {useState} from "react";
import {profileDesc} from "@/data/day1/profileDesc";
import ProfileCard from "./ProfileCard";
import ProfileCard2 from "./ProfileCard2";
import EmptyProfile from "./EmptyProfile";

function ProfileListPage() {
    // const [myProfile, setMyProfile] = useState(profileDesc.owner);
    // const [memberProfiles, setMemberProfiles] = useState(profileDesc.members);
    const [memberProfiles] = useState(profileDesc.members);

    return (
        <div className="w-full px-6 lg:px-0">
            <div>
                <ActivityDesc day={0} activity={2} project_id={1}/>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-3 mb-6">
                    <ProfileCard />
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
                    memberProfiles.map((data, index) => (
                        <div key={index} className="w-full md:w-1/2 px-3 mb-6">
                            {
                                data.profile_writing_status === true
                                    ? (
                                        data.apply_status === true
                                            ? (<ProfileCard2 index={0} profileType="" data=
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
                                                    }} /> )
                                            : (<ProfileCard2 index={0} profileType="" data=
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
                                                    }} />)
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
