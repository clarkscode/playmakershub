import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToast = ({ message }) => (
  <div style={{ display: "flex", alignItems: "center", color: "#fff" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{
        marginRight: "8px",
        width: "24px",
        height: "24px",
        color: "#00C851",
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span>{message}</span>
  </div>
);

export const notifySuccess = (message) => {
  toast(<CustomToast message={message} />, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: "#333", // Dark background color
      borderRadius: "8px",
      padding: "16px",
    },
  });
};
