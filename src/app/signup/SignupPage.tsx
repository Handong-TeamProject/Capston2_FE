'use client';

import React, { useState } from 'react';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useRouter } from 'next/navigation';

interface SignupPageProps {
  name: string;
  email: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ name, email }) => {
  const [gender, setGender] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
    setIsModified(true); // 성별 선택 시 isModified를 true로 설정
  };

  const router = useRouter();

  const handleSignup = () => {
    //  회원가입 api 로직 추가하기
    alert('회원가입이 완료되었습니다.');
    closeModal();
    router.push("/workspace")
  };

  return (
    <div className="w-full first-letter:lg:w-2/5 px-6 lg:px-0 flex-col flex items-center">
      <h1 className="text-lg lg:text-2xl font-bold mb-6">회원가입 페이지</h1>
      <div className="flex flex-col text-sm md:text-base lg:text-lg">
        <div className="flex items-center mb-4">
          <label className="mr-3 w-20">이름</label>
          <input
            type="text"
            value={name}
            // readOnly
            className="border rounded-lg px-2 py-1 bg-gray-100 text-gray-500"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-3 w-20">이메일</label>
          <input
            type="email"
            value={email}
            readOnly
            className="border rounded-lg px-2 py-1 bg-gray-100 text-gray-500"
          />
        </div>
        <div className="flex items-center mb-6">
          <label className="mr-3 w-20">성별</label>
          <button
            onClick={() => handleGenderSelection('남자')}
            className={`${
              gender === "남자"
                ? "bg-blue50 border-blue"
                : "bg-lightGray border-gray"
            } border-2 rounded-lg lg:w-24 lg:h-10 w-20 h-8 mr-2 lg:mr-3`}
          >
            남자
          </button>
          <button
            onClick={() => handleGenderSelection('여자')}
            className={`${
              gender === "여자"
                ? "bg-red50 border-red"
                : "bg-lightGray border-gray"
            } border-2 rounded-lg lg:w-24 lg:h-10 w-20 h-8`}
          >
            여자
          </button>
        </div>
        <button
          onClick={openModal}
          className={`${
            isModified ? "bg-orange hover:bg-orange50" : "bg-gray"
          } text-base h-10 mb-20 px-3 py-1 rounded-lg text-white`}
          disabled={!gender}
        >
          회원가입
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          message="회원가입을 진행하시겠습니까?"
          closeModal={closeModal}
          handleAction={handleSignup}
        />
      )}
    </div>
  );
};

export default SignupPage;
