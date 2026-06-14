import { useState } from "react";

export function useMessage() {
    const [message, setMessage] = useState<string | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, 3000); // Clear the message after 3 seconds
    }
    return { message, showMessage };
}