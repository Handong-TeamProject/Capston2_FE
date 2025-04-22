'use client';

import ActivityDesc from "@/components/common/ActivityDesc";
import React, {useState} from "react";
import {profileDesc} from "@/data/day1/profileDesc";
import ProfileCard from "./ProfileCard";
import EmptyProfile from "./EmptyProfile";

function ProfileListPage() {
    // const [ownerProfile, setOwnerProfile] = useState(profileDesc.owner);
    // const [memberProfiles, setMemberProfiles] = useState(profileDesc.members);
    const [ownerProfile] = useState(profileDesc.owner);
    const [memberProfiles] = useState(profileDesc.members);

    return (
        <div className="w-full px-6 lg:px-0">
            <div>
                <ActivityDesc day={0} activity={2}/>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-3 mb-6">
                    {
                        ownerProfile.profile_writing_status === true
                            ? (<ProfileCard index={1} profileType="owner_after" data={ownerProfile}/>)
                            : (<ProfileCard index={1} profileType="owner_before" data={ownerProfile}/>)
                    }
                </div>
                {
                    memberProfiles.map((data, index) => (
                        <div key={index} className="w-full md:w-1/2 px-3 mb-6">
                            {
                                data.profile_writing_status === true
                                    ? (
                                        data.apply_status === true
                                            ? (<ProfileCard index={index} profileType="apply" data={data}/>)
                                            : (<ProfileCard index={index} profileType="nonApply" data={data}/>)
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
