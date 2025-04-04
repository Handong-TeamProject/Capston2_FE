import { useState } from "react";
import AlertModal from "../common/AlertModal";
import { useRouter } from "next/navigation";

interface ProjectData {
    id: number;
    title: string;
    desc: string;
    day_status: string;
}

function ProjectCard({ data }: { data: ProjectData }) {

    const [isSelectedModalOpen, setIsSelectedModalOpen] = useState(false);
    const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
    const router = useRouter();

    const openSelectedModal = () => setIsSelectedModalOpen(true);
    const closeSelectedModal = () => setIsSelectedModalOpen(false);

    const openDeletedModal = () => setIsDeletedModalOpen(true);
    const closeDeletededModal = () => setIsDeletedModalOpen(false);

    const handleSelectedProject = () => {
        router.push(`/project/${data.id}`); // Next.js의 클라이언트 라우팅
    };

    const handleChangeDayStatus = (day_status: string) => {
        switch (day_status) {
            case '0':
                return "시작전";
            case '1':
                return "1일차";
            case '2':
                return "2일차";
            case '3':
                return "3일차";
            case '4':
                return "4일차";
            case '5':
                return "5일차";
            case '6':
                return "종료됨";
            default:
                return "";
        }
    };

    const getTextColor = (day_status: string) => {
        switch (day_status) {
            case '0':
                return "text-blue bg-blue50"; // Example color for '0'
            case '6':
                return "text-red bg-red50"; // Example color for '6'
            default:
                return "text-green bg-green50"; // Example color for '1~5'
        }
    };

    const getButtonText = (day_status: string) => {
        switch (day_status) {
            case '6':
                return "보러 가기"; // Example color for '6'
            default:
                return "진행하기"; // Example color for '1~5'
        }
    };

    const getButtonColor = (day_status: string) => {
        switch (day_status) {
            case '6':
                return "bg-orange50"; // Example color for '6'
            default:
                return "bg-orange"; // Example color for '1~5'
        }
    };
    

    const deleteProject = () => {
        alert("프로젝트가 삭제되었습니다.");
        window.location.reload();
        window.scrollTo(0, 0); // 페이지 상단으로 이동
        closeDeletededModal();
        // handleDeleteProject();
        //삭제 로직
    }
    return (
        <div className="w-100 bg-baseGray py-8 px-10 rounded-2xl" >
            <div className="flex justify-between">
                <div className={`${getTextColor(data.day_status)} text-xs md:text-base w-14 md:w-20 h-6 md:h-7 font-bold flex justify-center items-center rounded`}>
                    {handleChangeDayStatus(data.day_status)}
                </div>
                <button onClick={openDeletedModal} className="text-xs md:text-base text-gray hover:text-orange">삭제하기</button>
            </div>
            <p className="text-xl md:text-2xl font-bold mt-2">{data.title}</p>
            <hr className="text-lightGray border my-3" />
            <p>{data.desc}</p>
            <button onClick={openSelectedModal} className={`w-full h-10 rounded-lg text-lg font-bold mt-6 object-hover hover:bg-baseGray  hover:border-2 hover:border-orange hover:text-orange ${getButtonColor(data.day_status)}`}>{getButtonText(data.day_status)}</button>

            {isSelectedModalOpen && (
                <AlertModal text = "이동하시겠습니까?" closeModal={closeSelectedModal} handleAction={handleSelectedProject}/>
            )}
            {isDeletedModalOpen && (
                <AlertModal text = "정말 삭제하시겠습니까?" closeModal={closeDeletededModal} handleAction={deleteProject}/> 
            )}
        </div>
    );
}

export default ProjectCard;