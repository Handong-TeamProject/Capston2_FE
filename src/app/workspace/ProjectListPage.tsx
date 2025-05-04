"use client";

// components/ProjectListPage.tsx
import React, { useState } from "react";
import Introduce from "../../components/layout/Introduce";

import ConfirmModal from "../../components/Modal/ConfirmModal";
import ProjectCard from "./ProjectCard";
import { projectData } from "@/data/projectData";
import { InputField, InputSpan, TextareaField } from "@/components/common/InputSpan";
import Image from "next/image";

const ProjectListPage: React.FC = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmCreateModalOpen, setIsConfirmCreateModalOpen] =
    useState(false);
  const [isConfirmJoinModalOpen, setIsConfirmJoinModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectCode, setProjectCode] = useState("");

  interface ProjectInfo {
    id: number;
    title: string;
    desc: string;
    day_status: string;
  }
  const [projectList, setProjectList] = useState<ProjectInfo[]>(projectData);

  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openConfirmCreateModal = () => setIsConfirmCreateModalOpen(true);
  const closeConfirmCreateModal = () => setIsConfirmCreateModalOpen(false);

  const openConfirmJoinModal = () => setIsConfirmJoinModalOpen(true);
  const closeConfirmJoinModal = () => setIsConfirmJoinModalOpen(false);

  const isCreateButtonEnabled =
    projectName.trim() !== "" && projectDesc.trim() !== "";
  const isJoinButtonEnabled = projectCode.trim() !== "";

  const handleCancleInput = () => {
    closeJoinModal();
    closeCreateModal();
    setProjectName("");
    setProjectDesc("");
  };

  const handleCreateProject = () => {
    closeConfirmCreateModal();
    closeCreateModal();
    setProjectName("");
    setProjectDesc("");
    alert("프로젝트가 생성되었습니다!");

    // 추가 로직: 새로운 프로젝트를 프로젝트 리스트에 추가
    const newProject = {
      id: projectList.length + 1,
      title: projectName,
      desc: projectDesc,
      day_status: "0",
    };
    setProjectList([...projectList, newProject]);
  };

  const handleJoinProject = () => {
    closeConfirmJoinModal();
    closeJoinModal();
    setProjectCode("");
    alert("프로젝트에 참여하였습니다!");
  };

  return (
    <div className="w-full px-6 lg:px-0">
      {/* 헤더 섹션 */}
      <div className="mt-16 flex w-full flex-col justify-between md:flex-row">
        <Introduce
          title="내가 속한 Rapos"
          desc="새로운 Rapo 프로젝트를 생성, 참여할 수 있으며, \\자신이 속한 Rapo 프로젝트의 리스트를 볼 수 있습니다."
          project_id={1000}
        />
        <div className="my-3 mb-6 flex md:my-0">
          <button
            className="text-s object-hover mr-3 h-8 w-20 rounded bg-lightGray font-bold text-boldGray hover:bg-gray hover:text-white md:mr-6 md:h-10 md:w-24 md:text-lg"
            onClick={openJoinModal}
          >
            참여하기
          </button>
          <button
            className="text-s object-hover flex h-8 w-24 items-center justify-center rounded bg-black font-bold text-white hover:bg-orange md:h-10 md:w-28 md:text-lg"
            onClick={openCreateModal}
          >
            <Image src="/Img/plus.png" className="mr-1"  alt = "plus Img" width={16} height={16}/>
            <span>생성하기</span>
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 섹션 */}
      {projectList.length > 0 ? (
        <div className="mb-12 mt-4 grid grid-cols-1 gap-10 md:mb-20 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((data, index) => (
            <ProjectCard key={index} data={data} setProjectList={setProjectList} />
          ))}
        </div>
      ) : (
        <div className="flex-container min-h-80 justify-center md:min-h-[500px]">
          <p className="mb-3 text-base font-bold text-lightGray md:text-xl">
            아직 프로젝트가 없습니다.
          </p>
          <Image src="/Img/empty.png" className="md:w-24" alt = "empty Img"  width={80} height={80}/>
        </div>
      )}

      {/* 참여하기 모달 */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow-lg md:w-[400px]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold md:text-xl">프로젝트 참여</h2>
              <Image
                src="/Img/cancleBefore.png"
                width={40}
                height={40}
                alt = "cancle before Img"
                onMouseEnter={(e) =>
                  (e.currentTarget.src = "/Img/cancleAfter.png")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.src = "/Img/cancleBefore.png")
                }
                onClick={handleCancleInput}
              />
            </div>
            <div>
              <InputSpan message="참여 코드" />
              <InputField value={projectCode} onChange={setProjectCode} />
            </div>
            <button
              className={`mt-5 h-10 w-full rounded text-black ${isJoinButtonEnabled ? "bg-orange" : "bg-boldGray"} object-hover hover:bg-orange50 hover:text-gray`}
              disabled={!isJoinButtonEnabled}
              onClick={openConfirmJoinModal}
            >
              참여하기
            </button>
          </div>
        </div>
      )}

      {/* 생성하기 모달 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow-lg md:w-[400px]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold md:text-xl">프로젝트 생성</h2>
              <Image
                src="/Img/cancleBefore.png"
                width={40}
                height={40}
                alt = "cancleBefore img"
                onMouseEnter={(e) =>
                  (e.currentTarget.src = "/Img/cancleAfter.png")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.src = "/Img/cancleBefore.png")
                }
                onClick={handleCancleInput}
              />
            </div>
            <div>
              <InputSpan message="라포 프로젝트명" />
              <InputField value={projectName} onChange={setProjectName} />
            </div>
            <div className="mt-4">
              <InputSpan message="라포 프로젝트 설명" />
              <TextareaField value={projectDesc} onChange={setProjectDesc} />
            </div>
            <button
              className={`mt-5 h-10 w-full rounded text-black ${isCreateButtonEnabled ? "bg-orange" : "bg-boldGray"} object-hover hover:bg-orange50 hover:text-gray`}
              disabled={!isCreateButtonEnabled}
              onClick={openConfirmCreateModal}
            >
              생성하기
            </button>
          </div>
        </div>
      )}

      {/* 생성 확인 모달 */}
      {isConfirmCreateModalOpen && (
        <ConfirmModal
          message="생성하시겠습니까?"
          closeModal={closeConfirmCreateModal}
          handleAction={handleCreateProject}
        />
      )}

      {/* 참여 확인 모달 */}
      {isConfirmJoinModalOpen && (
        <ConfirmModal
          message="참여하시겠습니까?"
          closeModal={closeConfirmJoinModal}
          handleAction={handleJoinProject}
        />
      )}
    </div>
  );
};

export default ProjectListPage;
