interface AlertModalProps {
    text: string;
    closeModal: () => void;
    handleAction: () => void;
}

function AlertModal({ text, closeModal, handleAction }: AlertModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-72">
                <h2 className="text-lg font-bold mb-4">{text}</h2>
                <div className="flex justify-end">
                    <button
                        className="mr-2 bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
                        onClick={closeModal}>
                        취소
                    </button>
                    <button
                        className="bg-orange py-2 px-4 rounded text-white hover:bg-orange50"
                        onClick={handleAction}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AlertModal