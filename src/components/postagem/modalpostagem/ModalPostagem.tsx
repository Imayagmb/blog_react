import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { RiAddCircleLine } from "react-icons/ri";
import FormPostagem from "../formpostagem/FormPostagem";

// ========== COMPONENTE ==========

function ModalPostagem() {
  return (
    <Popup
      trigger={
        <button
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm 
text-white bg-teal-500 hover:bg-teal-600 shadow-md shadow-teal-300/30 hover:shadow-lg 
hover:shadow-teal-400/40 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 
cursor-pointer"
        >
          <RiAddCircleLine
            size={17}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Nova Postagem
        </button>
      }
      modal
      contentStyle={{
        borderRadius: "1.5rem",
        padding: "0",
        border: "none",
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
        maxWidth: "560px",
        width: "90%",
      }}
      overlayStyle={{
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <FormPostagem />
    </Popup>
  );
}

export default ModalPostagem;
