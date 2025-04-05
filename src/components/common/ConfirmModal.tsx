interface ConfirmModalProps {
  message: string;
  closeModal: () => void;
  handleAction: () => void;
}

function ConfirmModal({ message, closeModal, handleAction }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-72 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">{message}</h2>
        <div className="flex justify-end">
          <button
            className="bg-gray-200 hover:bg-gray-300 mr-2 rounded px-4 py-2"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="rounded bg-orange px-4 py-2 text-white hover:bg-orange50"
            onClick={handleAction}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
