'use client'

import Introduce from "@/components/layout/Introduce";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MyPage: React.FC = () => {
  const initMyInfo = {
    name: "정은다",
    gender: "여자",
    email: "test@gmail.com"
  };

  const [myInfo, setMyInfo] = useState(initMyInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState(initMyInfo);
  const [isUpdateModalOpen, setIsSelectedModalOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const openUpdateModal = () => setIsSelectedModalOpen(true);
  const closeUpdateModal = () => setIsSelectedModalOpen(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditInfo(myInfo); // Reset editInfo to current myInfo when toggling
  };

  const handleSave = () => {
    alert("정보가 수정되었습니다.");
    closeUpdateModal();
    setMyInfo(editInfo);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });
  };

  const handleGenderChange = (gender: string) => {
    setEditInfo({ ...editInfo, gender });
  };

  useEffect(() => {
    // Check if the edited info is different from the original info
    setIsModified(
      editInfo.name !== myInfo.name || editInfo.gender !== myInfo.gender
    );
  }, [editInfo, myInfo]);

  return (
    <div className="w-full px-6 lg:px-0 flex-col flex">
      <div className="mt-16 flex w-full flex-col">
        <Introduce title="나의 정보" desc="마이페이지에서는 나의 이름과 성별 정보를 수정할 수 있습니다." />
      </div>
      <div className="mt-10">
        <Image
          src="/Img/member1.png"
          alt="profile init image"
          width={60}
          height={60}
          className="w-16 h-16 lg:w-20 lg:h-20 mb-4 mr-10"
        />

        <div className="flex flex-col text-sm md:text-base lg:text-lg">
          <div className="flex items-center mb-2 h-8">
            <label className="mr-3 w-20">이름</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editInfo.name}
                onChange={handleChange}
                className="border rounded-lg px-2 py-1 outline-none focus:border-orange"
              />
            ) : (
              <p>{myInfo.name}</p>
            )}
          </div>
          <div className="flex items-center my-2 lg:my-3  h-8">
            <label className="mr-3 w-20">이메일</label>
            <p className="text-base">{myInfo.email}</p>
          </div>
          
          <div className="flex items-center my-2 lg:my-3">
            <label className="mr-3 w-20">성별</label>
            <button
              onClick={() => handleGenderChange("남자")}
              className={`${
                editInfo.gender === "남자"
                  ? "bg-blue50 border-blue"
                  : "bg-lightGray border-gray"
              } border-2 rounded-lg g:w-24 lg:h-10 w-20 h-8 mr-2 lg:mr-3`}
              disabled={!isEditing}
            >
              남자
            </button>
            <button
              onClick={() => handleGenderChange("여자")}
              className={`${
                editInfo.gender === "여자"
                  ? "bg-red50 border-red"
                  : "bg-lightGray border-gray"
              } border-2 rounded-lg lg:w-24 lg:h-10 w-20 h-8`}
              disabled={!isEditing}
            >
              여자
            </button>
          </div>
        </div>

        <div className="mt-4 mb-32">
        {isEditing ? (
          <div className="flex space-x-4">
            <button
              onClick={openUpdateModal}
              className={`${
                isModified ? "bg-orange hover:bg-orange50" : "bg-gray"
              } mb-4 px-3 py-1 rounded-lg text-white`}
              disabled={!isModified}
              >
              저장하기
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-lightGray mb-4 px-3 py-1 rounded-lg text-white hover:bg-boldGray"
              >
              취소
            </button>
          </div>
        ) : (
          <button
          onClick={handleEditToggle}
          className="bg-orange mb-4 px-3 py-1 rounded-lg text-white hover:bg-orange50"
          >
            수정하기
          </button>
        )}
        </div>
      </div>
      {isUpdateModalOpen && (
        <ConfirmModal
          message="정말 수정하시겠습니까?"
          closeModal={closeUpdateModal}
          handleAction={handleSave}
        />
      )}
    </div>
  );
};

export default MyPage;
