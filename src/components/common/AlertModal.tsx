interface AlertModalProps {
    message: string;
    closeModal: () => void;
}

function AlertModal({ message, closeModal }: AlertModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="w-72 rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bol">{message}</h2>
                <div className="flex justify-end">
                    <button
                        className="rounded bg-orange px-4 py-2 text-white hover:bg-orange50"
                        onClick={closeModal}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;
