// components/DayPerActivity.tsx
"use client";

import React, { useState } from "react";
import { dayDescription } from "@/data/dayDescription";
import AlertModal from "../common/AlertModal";
import { useRouter } from "next/navigation";

interface DayInfo {
  day_status: number;
  activity_status: number;
}

function DayPerActivity({
  day,
  getDayInfo,
}: {
  day: number;
  getDayInfo: DayInfo;
}) {
  const today = dayDescription[day - 1];
  if (!today) return null;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const router = useRouter();

  return (
    <div className="mb-6">
      <div className="flex items-start">
        <div
          className={`text-ls mr-2 rounded-md px-3 py-0.5 text-center font-bold text-white ${getDayInfo.day_status >= day ? "bg-orange" : "bg-beige"} `}
        >
          {day}일차
        </div>
        <p className="w-9/12 text-base font-bold">{today.title}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm">{today.desc}</p>
      </div>
      <div className="scrollbar-hide mt-3 flex w-full overflow-x-auto py-3 pl-2">
        {today.activity.map((activity, index) => (
          <div
            key={index}
            className={`object-hover mr-3 flex h-[150px] w-[250px] flex-shrink-0 flex-col justify-center rounded-lg px-5 py-3 shadow-md hover:scale-105 active:border ${
              getDayInfo.day_status < day ||
              (getDayInfo.day_status === day &&
                getDayInfo.activity_status < activity.step)
                ? "bg-lightGray blur-sm"
                : getDayInfo.day_status === day &&
                    getDayInfo.activity_status === activity.step
                  ? "bg-yellow text-white"
                  : "bg-beige90 text-orange"
            }`}
            onClick={() =>
              getDayInfo.day_status < day ||
              (getDayInfo.day_status === day &&
                getDayInfo.activity_status < activity.step)
                ? openModal()
                : router.push(activity.href)
            }
          >
            <p className="text-xs">STEP {activity.step}</p>
            <p className="mb-3 font-bold">{activity.title}</p>
            <p className="text-xs">{activity.desc}</p>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AlertModal
          message="이전 단계를 완료해주세요!"
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default DayPerActivity;
