import { useEffect } from "react";
import api from "../../services/api";

export default function TestPage() {
  useEffect(() => {
    api.get("/test")
      .then(res => {
        console.log("Server response:", res.data);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  }, []);

  return <div>Testing API...</div>;
}