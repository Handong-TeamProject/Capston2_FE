// components/ProjectDetailPage.tsx
"use client";

import React, { useState } from "react";
import DayPerActivity from "./DayPerActivity";
import { dayDescription } from "@/data/dayDescription";
import { projectInfo } from "@/data/projectInfo";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { useParams } from "next/navigation";
import Image from "next/image";


function ProjectDetailPage() {
  interface DayInfo {
    day_status: number;
    content_status: number;
  }

  const params = useParams<{ projectId: string }>();
  const projectId = params?.projectId || "";
  

  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateModalOpen, setIsSelectedModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); 
  const [isDeleteFailModalOpen, setIsDeleteFailModalOpen] = useState(false); 
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [projectData, setProjectInfo] = useState(projectInfo);

  const getDayInfo: DayInfo = {
    day_status: projectData?.default?.day_status,
    content_status: projectData?.default?.content_status,
  };

  const openUpdateModal = () => setIsSelectedModalOpen(true);
  const closeUpdateModal = () => setIsSelectedModalOpen(false);

  const openDeleteModal = () => setIsDeletedModalOpen(true);
  const closeDeleteModal = () => setIsDeletedModalOpen(false);

  const openCancleModal = () => setIsCancleModalOpen(true);
  const closeCancleModal = () => setIsCancleModalOpen(false);

  const handleClickUpdateButton = () => {
    if (isEdit) {
      openUpdateModal();
      return 0;
    }
    setIsEdit(!isEdit);
  };

  const handleUpdateProject = () => {
    alert("프로젝트가 수정되었습니다.");
    window.scrollTo(0, 0); // 페이지 상단으로 이동
    closeUpdateModal();
    setIsEdit(false);
  };
  const [deleteMember, setDeleteMember] = useState(0);

  const handleDeleteMember = (index: number) => {
    alert("사용자가 삭제되었습니다.");
    // window.location.reload();
    window.scrollTo(0, 0); // 페이지 상단으로 이동
    closeDeleteModal();
    // 삭제 로직
        setProjectInfo((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.user_id !== deleteMember),
        }));
    setIsEdit(false);
    console.log(index, projectId);
    // 새로 유저 정보 가져오기
  };


  const handleClickDeleteMember = (user_id: number) => {
    if (user_id === projectData.default.owner) {
      setIsDeleteFailModalOpen(true);
      return 0;
    }
    setDeleteMember(user_id);
    openDeleteModal();
  };

  const handleUpdateCancle = () => {
    closeCancleModal();
    setIsEdit(false);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedDesc = e.target.value;
    setProjectInfo((prev) => ({
      ...prev,
      default: {
        ...prev.default,
        desc: updatedDesc,
      },
    }));
  };



  const handleCopyInviteCode = async () => {
    const textToCopy = projectData.default.code;

    // clipboard API 사용 가능 여부 확인
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopiedModalOpen(true);
        setTimeout(() => setIsCopiedModalOpen(false), 2000);
        return;
      } catch (err) {
        console.error("Clipboard API 실패", err);
      }
    }

    // fallback 방식 (execCommand)
    try {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.style.position = "fixed"; // 화면 밖에 배치 (iOS에서 문제 방지)
      textarea.style.opacity = "0"; // 사용자에게 보이지 않게
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (success) {
        setIsCopiedModalOpen(true);
        setTimeout(() => setIsCopiedModalOpen(false), 2000);
        window.scrollTo(0, 0); // 페이지 상단으로 이동
      } else {
        throw new Error("execCommand 실패");
      }
    } catch (error) {
      console.error("Fallback 복사 실패:", error);
      alert("초대코드 복사에 실패했습니다. 수동으로 복사해주세요.");
    }
  };

  return (
    <div className="w-full px-6 lg:px-0">
      <div className="flex w-full flex-col items-center">
        <div
          className="group flex cursor-pointer items-center justify-center"
          onClick={handleCopyInviteCode} // 클릭 이벤트 추가
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector("img");
            if (img) img.src = "/Img/pasteAfter.png";
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector("img");
            if (img) img.src = "/Img/pasteBefore.png";
          }}
        >
          <Image
            src="/Img/pasteBefore.png"
            alt="cancel"
            className="mr-2 h-3"
            width={12}
            height={12}
          />
          <p className="text-xs text-lightGray group-hover:text-orange">
            초대코드 복사하기
          </p>
        </div>
        <p className="text-xl font-bold md:text-2xl">
          {projectData.default.title}
        </p>
        <hr className="my-4 w-4/5 border-[1.5px] border-lightGray md:my-6 md:border-2" />
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-col md:w-1/4">
          <div className="mb-4 flex w-full flex-col">
            <div>
              <div className="flex items-start justify-between">
                <p className="mb-2 text-lg font-bold">| 프로젝트 소개</p>
                <div>
                  {isEdit && (
                    <button
                      className="mr-2 text-sm text-black hover:text-lightGray"
                      onClick={() => openCancleModal()}
                    >
                      취소하기
                    </button>
                  )}
                  <button
                    className={`${
                      isEdit
                        ? "text-orange hover:text-orange50"
                        : "text-lightGray hover:text-black"
                    } text-sm`}
                    onClick={handleClickUpdateButton}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Enter 키의 기본 동작 방지
                      }
                    }
                  }
                  >
                    {isEdit ? "저장하기" : "수정하기"}
                  </button>
                </div>
              </div>
              {isEdit ? (
                <textarea
                  className="box-border h-[100px] w-full resize-none border p-[0.1rem] text-sm text-gray outline-none focus:border-orange md:text-base"
                  value={projectData.default.desc}
                  onChange={handleChangeDescription}
                />
              ) : (
                <p className="w-full text-sm text-gray md:text-base">
                  {projectData.default.desc}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex w-full flex-col">
            <div>
              <p className="text-lg font-bold">| 구성원</p>
              <div className="flex flex-wrap text-xs text-gray md:text-base">
                {projectData.members.map((member, index) => (
                  <div className="mb-3 flex w-1/4 md:w-1/2" key={index}>
                    <div className="pt-4">
                      <div className="text-center">
                        <Image
                          src={`/Img/member${index + 1}.png`}
                          alt={member.name}
                          className="rounded-full md:h-16 md:w-16"
                          width={48}
                          height={48}
                        />
                        <p>{member.name}</p>
                      </div>
                    </div>
                    {isEdit && (
                      <div>
                        <Image
                          src="/Img/cancleBefore.png"
                          onMouseEnter={(e) =>
                            (e.currentTarget.src = "/Img/cancleAfter.png")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.src = "/Img/cancleBefore.png")
                          }
                          alt="cancel"
                          className="ml-1 h-6 w-6 cursor-pointer md:ml-3"
                          width={24}
                          height={24}
                          onClick={() =>
                            handleClickDeleteMember(member.user_id)
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="box-border w-full md:w-3/4 md:pl-10">
          <p className="mb-3 text-lg font-bold">| 컨텐츠</p>
          {dayDescription.map((_, index) => (
            <DayPerActivity
              key={index}
              day={index + 1}
              getDayInfo={getDayInfo}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          ))}
        </div>
      </div>
      {isUpdateModalOpen && (
        <ConfirmModal
          message="정말 수정하시겠습니까?"
          closeModal={closeUpdateModal}
          handleAction={handleUpdateProject}
        />
      )}
      {isDeletedModalOpen && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          closeModal={closeDeleteModal}
          handleAction={() => handleDeleteMember(deleteMember)}
        />
      )}
      {isCancleModalOpen && (
        <ConfirmModal
          message="정말 취소하시겠습니까?"
          closeModal={closeCancleModal}
          handleAction={() => handleUpdateCancle()}
        />
      )}
      {isCopiedModalOpen && ( // 복사 모달 추가
        <AlertModal
          message="초대코드가 복사되었습니다."
          closeModal={() => setIsCopiedModalOpen(false)}
        />
      )}
      {isDeleteFailModalOpen && ( // 복사 모달 추가
        <AlertModal
          message="이 구성원은 삭제할 수 없습니다."
          closeModal={() => setIsDeleteFailModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProjectDetailPage;
