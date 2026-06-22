// import { useState } from "react";
// export function useMessage() {
//     const [message, setMessage] = useState({
//         text:"",
//         type:"success" | "error";
//      } as {text:string, type:string} | null);
//     });

//     const showMessage = (msg: string) => {
//         setMessage(msg);
//         setTimeout(() => {
//             setMessage(null);
//         }, 3000); // Clear the message after 3 seconds
//     }
//     return { message, showMessage };
// }

import { useState } from "react";
type MessageType = "success" | "error";
type Message = {
    text: string;
    type: MessageType;
} | null;
export function useMessage() {
    const [message, setMessage] = useState<Message>(null);
    const showMessage = (text: string, type: MessageType = "success") => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };
    return { message, showMessage };
}