import {useEffect} from "react";

interface AlertModalProps {
    message: string;
    closeModal: () => void;
}

function AlertModal({message, closeModal} : AlertModalProps) {
    useEffect(() => {
        const handleKeyDown = (event : KeyboardEvent) => {
            if (event.key === "Enter") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return() => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal]);

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-72 rounded bg-white p-6 shadow-lg">
                <h2 className="font-bol mb-4 text-base lg:text-lg">{message}</h2>
                <div className="flex justify-end">
                    <button
                        className="rounded bg-orange px-4 py-2 text-white hover:bg-orange50"
                        onClick={closeModal}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;
