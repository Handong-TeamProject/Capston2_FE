// components/ProjectDetailPage.tsx
"use client";

import React from "react";
import DayPerActivity from "./DayPerActivity";
import {dayDescription} from "@/data/dayDescription";
import {projectInfo} from "@/data/projectInfo";

function ProjectDetailPage() {
    interface DayInfo {
        day_status: number;
        activity_status: number;
    }

    const getDayInfo: DayInfo = {
        day_status: 3,
        activity_status: 1
    };

    return (
        <div className="w-full px-6">
            <div className="w-full text-center">
                <p className="text-xl font-bold md:text-2xl">
                    {projectInfo.default.title}
                </p>
                <p className="mt-1 text-xs text-gray md:text-base">
                    {projectInfo.default.desc}
                </p>
            </div>
            <div className="flex w-full">
                <div className="flex w-full flex-col border">left</div>
                <div className="flex w-full flex-col border">right</div>
            </div>
            <div className="w-full md:px-0">
                {
                    dayDescription.map(
                        (_, index) => (<DayPerActivity key={index} day={index + 1} getDayInfo={getDayInfo}/>)
                    )
                }
            </div>
        </div>
    );
}

export default ProjectDetailPage;
