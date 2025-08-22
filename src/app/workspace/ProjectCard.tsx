import { useState } from "react";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { useRouter } from "next/navigation";
import { getAccessApi } from "../api/api";

interface ProjectData {
  id: number;
  title: string;
  desc: string;
  day_status: string;
}

function ProjectCard({ data, setProjectList }: { data: ProjectData, setProjectList: React.Dispatch<React.SetStateAction<ProjectData[]>> }) {
  const router = useRouter();
  const [isSelectedModalOpen, setIsSelectedModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);

  const openSelectedModal = () => setIsSelectedModalOpen(true);
  const closeSelectedModal = () => setIsSelectedModalOpen(false);

  const openDeletedModal = () => setIsDeletedModalOpen(true);
  const closeDeletededModal = () => setIsDeletedModalOpen(false);

  const handleSelectedProject = () => {
    sessionStorage.setItem("projectId", String(data.id));
    router.push(`/project/${data.id}`); // Next.js client-side routing
  };

  const handleChangeDayStatus = (day_status: string) => {
    switch (day_status) {
      case "0":
        return "시작전";
      case "1":
        return "1일차";
      case "2":
        return "2일차";
      case "3":
        return "3일차";
      case "4":
        return "4일차";
      case "5":
        return "5일차";
      case "6":
        return "종료됨";
      default:
        return "";
    }
  };

  const getTextColor = (day_status: string) => {
    switch (day_status) {
      case "0":
        return "text-blue bg-blue50";
      case "6":
        return "text-red bg-red50";
      default:
        return "text-green bg-green50";
    }
  };

  const getButtonText = (day_status: string) => {
    switch (day_status) {
      case "6":
        return "보러 가기";
      default:
        return "진행하기";
    }
  };

  const getButtonColor = (day_status: string) => {
    switch (day_status) {
      case "6":
        return "bg-orange50";
      default:
        return "bg-orange";
    }
  };

  const deleteProject = async () => {

    const postProject = async () => {
      try {
        const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
        const response = await api_access.delete("/itemuser", {
          data: { id: data.id }
        } as any);    

        if (response.status === 200) {
          console.log("삭제 완료");
        } else {
          alert("프로젝트 삭제에 실패했습니다.");
        }

        return response;
      } catch (error) {
        console.error("Failed to create project:", error);
        alert("프로젝트 삭제에 실패했습니다.");
      }
    };

    const response = await postProject()
    console.log(response);
    setProjectList((prev) => prev.filter((project) => project.id !== data.id));
    alert("프로젝트가 삭제되었습니다.");
    closeDeletededModal();
  };

  // const handleCreateProject = async () => {
  
  //     const postProject = async () => {
  //       try {
  //         const api_access = getAccessApi(); // 클라이언트 전용 인스턴스
  //         const response = await api_access.post("/item", {
  //           title: projectName,
  //           content: projectDesc,
  //         });
  //         console.log("Project created:", response.data);
  //         if (response.status === 200) {
  //         } else {
  //           alert("프로젝트 생성에 실패했습니다.");
  //         }
  //       } catch (error) {
  //         console.error("Failed to create project:", error);
  //         alert("프로젝트 생성에 실패했습니다.");
  //       }
  //     };
  
  //     await postProject();;
      
  //     // 모달 닫기 및 상태 초기화
  //     closeConfirmCreateModal();
  //     closeCreateModal();
  //     setProjectName("");
  //     setProjectDesc("");
      
  //     // 추가 로직: 새로운 프로젝트를 프로젝트 리스트에 추가
  //     getProjectList(setProjectList);
  //   };

  return (
    <div className="w-full flex flex-col justify-between rounded-2xl bg-baseGray px-10 py-8">
      <div>
        <div className="flex justify-between">
          <div
            className={`${getTextColor(data.day_status)} flex h-6 w-14 items-center justify-center rounded text-xs font-bold md:h-7 md:w-20 md:text-base`}
          >
            {handleChangeDayStatus(data.day_status)}
          </div>
          <button
            onClick={openDeletedModal}
            className="text-xs text-gray hover:text-orange md:text-base"
          >
            삭제하기
          </button>
        </div>
        <p className="mt-2 text-xl font-bold lg:text-2xl">{data.title}</p>
        <hr className="my-3 border text-lightGray" />
        <p>{data.desc}</p>
      </div>
      <div>
        <button
          onClick={openSelectedModal}
          className={`object-hover mt-6 h-10 w-full rounded-lg text-lg font-bold hover:border-2 hover:border-orange hover:bg-baseGray hover:text-orange ${getButtonColor(data.day_status)}`}
        >
          {getButtonText(data.day_status)}
        </button>
      </div>

      {isSelectedModalOpen && (
        <ConfirmModal
          message="이동하시겠습니까?"
          closeModal={closeSelectedModal}
          handleAction={handleSelectedProject}
        />
      )}
      {isDeletedModalOpen && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          closeModal={closeDeletededModal}
          handleAction={deleteProject}
        />
      )}
    </div>
  );
}

export default ProjectCard;
