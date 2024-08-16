import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomErrorToast = ({ message }) => (
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
        color: "#ff4444",
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <span className="text-white font-bold text-sm">{message}</span>
  </div>
);

export const notifyError = (message) => {
  toast(<CustomErrorToast message={message} />, {
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
      //   padding: "16px",
    },
  });
};
