// components/ProjectDetailPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import DayPerActivity from "./DayPerActivity";
import { dayDescription } from "@/data/dayDescription";
import { projectInfo } from "@/data/projectInfo";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getProjectInfo, putProjectInfo, } from "@/app/api/hooks/project";

export interface ProjectMember {
  name: string;
  id: number;
}

export interface ProjectInfo {
  title: string;
  desc: string;
  code: string;
  day_status: number;
  content_status: number;
  owner: number;
  users : ProjectMember[];
}



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
  
  const [projectData, setProjectInfo] = useState<ProjectInfo>({} as ProjectInfo);
  const [editProjectData, setEditProjectInfo] = useState<ProjectInfo>(projectData);

  const getDayInfo: DayInfo = {
    day_status: projectData?.day_status,
    content_status: projectData?.content_status,
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

    const usePutProjectInfo = async () => {
      const projectId = sessionStorage.getItem("projectId");
      if (projectId) {
        const sendProjectInfo:putProjectInfo = {
          id: projectId,
          title: editProjectData.title,
          content: editProjectData.desc,
        };
        const response = await putProjectInfo(sendProjectInfo);
        // console.log("받은 응답:", response);
        alert("프로젝트가 수정되었습니다.");
        setProjectInfo((prev) => ({
          ...prev,
          desc: editProjectData.desc,
        }));
        window.scrollTo(0, 0); // 페이지 상단으로 이동
        closeUpdateModal();
        setIsEdit(false);
      }
    };
    usePutProjectInfo();
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
      members: prev.users.filter((user) => user.id !== deleteMember),
        }));
    setIsEdit(false);
    // console.log(index, projectId);
    // 새로 유저 정보 가져오기
  };


  const handleClickDeleteMember = (user_id: number) => {
    if (user_id === projectData.owner) {
      setIsDeleteFailModalOpen(true);
      return 0;
    }
    setDeleteMember(user_id);
    openDeleteModal();
  };

  const handleUpdateCancle = () => {
    closeCancleModal();
    setIsEdit(false);
    setEditProjectInfo((prev) => ({
      ...prev,
      desc: projectData.desc,
    }));
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedDesc = e.target.value;
    setEditProjectInfo((prev) => ({
      ...prev,
      desc: updatedDesc,
    }));
  };



  const handleCopyInviteCode = async () => {
    const textToCopy = projectData.code;

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
  useEffect(() => {
    const fetchProjectInfo = async () => {
      const projectId = sessionStorage.getItem("projectId");
      if (projectId) {
        const response = await getProjectInfo(projectId);
        // console.log("받은 응답:", response);
        const responseProjectInfo = {
          title: response.title,
          desc: response.content, // 서버의 content → 프론트의 desc로 대응
          code: response.code,
          day_status: response.daystatus,
          content_status: response.contentstatus,
          owner: response.owner,
          users: response.users
            ? response.users.map((member: { userName: string, id: number }) => ({
              name: member.userName,
              id: member.id,
            }))
            : [], // null이면 빈 배열로 대체
        };
        setProjectInfo({
          ...responseProjectInfo,
        });
        setEditProjectInfo({...responseProjectInfo,});
      }
    };
    fetchProjectInfo();
  }, []);

  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full px-6 lg:px-0">
      <div className="flex w-full flex-col items-center">
        <div
          className="group flex cursor-pointer items-center justify-center"
          onClick={handleCopyInviteCode} // 클릭 이벤트 추가
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={hovered ? "/Img/pasteAfter.png" : "/Img/pasteBefore.png"}
            alt="paste"
            className="mr-2 h-3"
            width={12}
            height={12}
          />

          <p className="text-xs text-lightGray group-hover:text-orange mb-1">
            초대코드 복사하기
          </p>
        </div>
        <p className="text-xl font-bold md:text-2xl">
          {projectData?.title}
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
                  value={editProjectData?.desc}
                  onChange={handleChangeDescription}
                />
              ) : (
                <p className="w-full text-sm text-gray md:text-base">
                  {projectData?.desc}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex w-full flex-col">
            <div>
              <p className="text-lg font-bold">| 구성원</p>
              <div className="flex flex-wrap text-xs text-gray md:text-base">
                {projectData.users?.map((member, index) => (
                  <div className="mb-3 flex w-1/4 md:w-1/2" key={index}>
                    <div className="pt-4">
                      <div className="text-center flex flex-col items-center">
                        <Image
                          src={`/Img/member${index + 1}.png`}
                          alt={member?.name || "member"}
                          className="rounded-full md:h-16 md:w-16"
                          width={48}
                          height={48}
                        />
                        <p>{member?.name}</p>
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
                            handleClickDeleteMember(member.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
                  {/* { 
                    projectData.default.day_status === 5 ?
          <div className="box-border w-full md:w-3/4 md:pl-10">
            <p className="mb-3 text-lg font-bold">| 약속 정보</p>
            <div className="flex">
                  <p>다같이 환호 공원 가자</p>
                      <p className="ml-5 text-xs text-gray">자세히</p>
            </div>
          </div>
                      : ""

                  } */}
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
