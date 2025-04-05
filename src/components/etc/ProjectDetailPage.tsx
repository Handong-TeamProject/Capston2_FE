// components/ProjectDetailPage.tsx
"use client";

import React, { useState } from "react";
import DayPerActivity from "./DayPerActivity";
import { dayDescription } from "@/data/dayDescription";
import { projectInfo } from "@/data/projectInfo";
import ConfirmModal from "../common/ConfirmModal";
import AlertModal from "../common/AlertModal";

function ProjectDetailPage() {
    interface DayInfo {
        day_status: number;
        activity_status: number;
    }

    const getDayInfo: DayInfo = {
        day_status: 3,
        activity_status: 1
    };

    const [isEdit, setIsEdit] = useState(false);
    const [isUpdateModalOpen, setIsSelectedModalOpen] = useState(false);
    const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
    const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);
    const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사 모달 상태 추가
    const [projectData, setProjectInfo] = useState(projectInfo);

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
        setIsEdit(!isEdit);
    };

    const handleDeleteMember = (index: number) => {
        alert("사용자가 삭제되었습니다.");
        window.location.reload();
        window.scrollTo(0, 0); // 페이지 상단으로 이동
        closeDeleteModal();
        // 삭제 로직
        // 새로 유저 정보 가져오기
    };

    const [deleteMember, setDeleteMember] = useState(0);

    const handleClickDeleteMember = (user_id: number) => {
        setDeleteMember(user_id);
        openDeleteModal();
    };

    const handleUpdateCancle = () => {
        closeCancleModal();
        setIsEdit(false);
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            textarea.style.position = "fixed";  // 화면 밖에 배치 (iOS에서 문제 방지)
            textarea.style.opacity = "0";       // 사용자에게 보이지 않게
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
            <div className="w-full flex flex-col items-center">
                <div
                    className="flex items-center justify-center group cursor-pointer"
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
                    <img
                        src="/Img/pasteBefore.png"
                        alt="cancel"
                        className="w-3 h-3 mr-2"
                    />
                    <p className="text-lightGray text-xs group-hover:text-orange">
                        초대코드 복사하기
                    </p>
                </div>
                <p className="text-xl font-bold md:text-2xl">
                    {projectData.default.title}
                </p>
                <hr className=" w-4/5 my-4 md:my-6 border-[1.5px] md:border-2 border-lightGray" />
            </div>
            <div className="w-full flex md:flex-row flex-col">
                <div className="flex w-full md:w-1/4 flex-col">
                    <div className="flex w-full flex-col mb-4">
                        <div>
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-lg mb-2">| 프로젝트 소개</p>
                                <div>
                                    {isEdit && (
                                        <button
                                            className="text-black hover:text-lightGray text-sm mr-2"
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
                                        }  text-sm`}
                                        onClick={handleClickUpdateButton}
                                    >
                                        {isEdit ? "저장하기" : "수정하기"}
                                    </button>
                                </div>
                            </div>
                            {isEdit ? (
                                <textarea
                                    className="w-full h-[100px] border text-sm focus:border-orange outline-none box-border p-[0.1rem] text-gray md:text-base resize-none"
                                    value={projectData.default.desc}
                                    onChange={handleChangeDescription}
                                />
                            ) : (
                                <p className="w-full  text-sm text-gray md:text-base">
                                    {projectData.default.desc}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full flex-col mb-4">
                        <div>
                            <p className="font-bold text-lg">| 구성원</p>
                            <div className="text-xs text-gray md:text-base flex flex-wrap">
                                {projectData.members.map((member, index) => (
                                    <div className="w-1/4 md:w-1/2 flex mb-3" key={index}>
                                        <div className="pt-4">
                                            <div className="text-center">
                                                <img
                                                    src={`/Img/member${index + 1}.png`}
                                                    alt={member.name}
                                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                                                />
                                                <p>{member.name}</p>
                                            </div>
                                        </div>
                                        {isEdit && (
                                            <div>
                                                <img
                                                    src="/Img/cancleBefore.png"
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.src =
                                                            "/Img/cancleAfter.png")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.src =
                                                            "/Img/cancleBefore.png")
                                                    }
                                                    alt="cancel"
                                                    className="ml-1 md:ml-3 w-6 h-6 cursor-pointer"
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
                <div className="w-full md:w-3/4 md:pl-10 box-border">
                    <p className="font-bold text-lg mb-3">| 컨텐츠</p>
                    {dayDescription.map((_, index) => (
                        <DayPerActivity
                            key={index}
                            day={index + 1}
                            getDayInfo={getDayInfo}
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
        </div>
    );
}

export default ProjectDetailPage;
