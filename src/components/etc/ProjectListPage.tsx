"use client"

// components/ProjectListPage.tsx
import React, { useState } from 'react';
import Introduce from '../layout/Introduce';
import { InputField, InputSpan, TextareaField } from '../normal/InputSpan';
import AlertModal from '../common/AlertModal';
import ProjectCard from './ProjectCard';

const ProjectListPage: React.FC = () => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfirmCreateModalOpen, setIsConfirmCreateModalOpen] = useState(false);
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
    const [projectList, setProjectList] = useState<ProjectInfo[]>([
        {
            id : 1,
            title: "10년지기 친구들",
            desc: "소중한 친구들과의 관계를 더욱 발전시키기 위해 이 서비스를 통해 다양한 활동을 계획하고 서로의 관심사를 공유하며 친밀도를 높이고 싶습니다.",
            day_status: "0"
        },
        {
            id : 2,
            title: "가족 모임",
            desc: "가족들과의 소중한 시간을 계획하고 추억을 공유하며 더욱 돈독한 관계를 유지하기 위한 프로젝트입니다.",
            day_status: "2"
        },
        {
            id : 3,
            title: "회사 동료들과의 협업",
            desc: "회사 동료들과의 협업을 통해 프로젝트를 성공적으로 완수하고 팀워크를 강화하기 위한 프로젝트입니다.",
            day_status: "6"
        },
        {
            id : 4,
            title: "동아리 활동",
            desc: "동아리 멤버들과 함께 다양한 활동을 계획하고 즐기며 친목을 다지는 프로젝트입니다.",
            day_status: "3"
        },
        {
            id : 5,
            title: "여행 계획",
            desc: "친구들과 함께 여행을 계획하고 준비하며 추억을 쌓기 위한 프로젝트입니다.",
            day_status: "5"
        }
    ]);

    const openJoinModal = () => setIsJoinModalOpen(true);
    const closeJoinModal = () => setIsJoinModalOpen(false);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openConfirmCreateModal = () => setIsConfirmCreateModalOpen(true);
    const closeConfirmCreateModal = () => setIsConfirmCreateModalOpen(false);

    const openConfirmJoinModal = () => setIsConfirmJoinModalOpen(true);
    const closeConfirmJoinModal = () => setIsConfirmJoinModalOpen(false);

    const isCreateButtonEnabled = projectName.trim() !== "" && projectDesc.trim() !== "";
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
    };

    const handleJoinProject = () => {
        closeConfirmJoinModal();
        closeJoinModal();
        setProjectCode("");
        alert("프로젝트에 참여하였습니다!");
    };

    return (
        <div className='w-full px-6 md:px-0'>
            {/* 헤더 섹션 */}
            <div className="flex flex-col md:flex-row mt-16 w-full justify-between">
                <Introduce 
                    title="내가 속한 Rapos" 
                    desc="새로운 Rapo 프로젝트를 생성, 참여할 수 있으며, \\자신이 속한 Rapo 프로젝트의 리스트를 볼 수 있습니다." 
                />
                <div className="flex my-3 md:my-0 mb-6">
                    <button 
                        className="w-20 h-8 md:w-24 md:h-10 rounded bg-lightGray text-boldGray font-bold text-s md:text-lg mr-3 md:mr-6 hover:bg-gray object-hover hover:text-white"
                        onClick={openJoinModal}
                    >
                        참여하기
                    </button>
                    <button 
                        className="w-24 h-8 md:w-28 md:h-10 rounded bg-black text-white font-bold text-s md:text-lg flex justify-center items-center hover:bg-orange object-hover"
                        onClick={openCreateModal}
                    >
                        <img src="/Img/plus.png" className='w-4 mr-1' />
                        <span>생성하기</span>
                    </button>
                </div>
            </div>

            {/* 메인 콘텐츠 섹션 */}
            {
                projectList.length >= 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-4 md:mt-10 mb-12 md:mb-20'>
                        {
                            projectList.map((data, index) => (
                                <ProjectCard key={index} data={data} />
                            ))
                        }
                    </div>
                ): (
                    <div className='flex-container min-h-80 md:min-h-[500px] justify-center'>
                        <p className='text-lightGray text-base md:text-xl font-bold mb-3'>아직 프로젝트가 없습니다.</p>
                        <img src="/Img/empty.png" className='w-20 md:w-24' />
                    </div> 
                )
            }


            {/* 참여하기 모달 */}
            {isJoinModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-80 md:w-[400px]">
                        <div className='flex items-center mb-4 justify-between'>
                            <h2 className="text-lg font-bold md:text-xl">프로젝트 참여</h2>
                            <img 
                                src="/Img/cancleBefore.png" 
                                className='w-10'
                                onMouseEnter={(e) => e.currentTarget.src = "/Img/cancleAfter.png"}
                                onMouseLeave={(e) => e.currentTarget.src = "/Img/cancleBefore.png"}
                                onClick={handleCancleInput}
                            />
                        </div>
                        <div>
                            <InputSpan text="참여 코드" />
                            <InputField
                                value={projectCode} 
                                onChange={setProjectCode} 
                            />
                        </div>
                        <button 
                            className={`w-full rounded h-10 mt-5 text-black ${isJoinButtonEnabled ? 'bg-orange' : 'bg-boldGray'} hover:bg-orange50 object-hover hover:text-gray`}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-80 md:w-[400px]">
                        <div className='flex items-center mb-4 justify-between'>
                            <h2 className="text-lg font-bold md:text-xl">프로젝트 생성</h2>
                            <img 
                                src="/Img/cancleBefore.png" 
                                className='w-10'
                                onMouseEnter={(e) => e.currentTarget.src = "/Img/cancleAfter.png"}
                                onMouseLeave={(e) => e.currentTarget.src = "/Img/cancleBefore.png"}
                                onClick={handleCancleInput}
                            />
                        </div>
                        <div>
                            <InputSpan text="라포 프로젝트명" />
                            <InputField
                                value={projectName} 
                                onChange={setProjectName} 
                            />
                        </div>
                        <div className='mt-4'>
                            <InputSpan text="라포 프로젝트 설명" />
                            <TextareaField
                                value={projectDesc} 
                                onChange={setProjectDesc} 
                            />
                        </div>
                        <button 
                            className={`w-full rounded h-10 mt-5 text-black ${isCreateButtonEnabled ? 'bg-orange' : 'bg-boldGray'} hover:bg-orange50 object-hover hover:text-gray`}
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
                <AlertModal text = "생성하시겠습니까?" closeModal={closeConfirmCreateModal} handleAction={handleCreateProject}/>
            )}

            {/* 참여 확인 모달 */}
            {isConfirmJoinModalOpen && (
                <AlertModal text = "참여하시겠습니까?" closeModal={closeConfirmJoinModal} handleAction={handleJoinProject}/>
            )}
        </div>
    );
};

export default ProjectListPage;
