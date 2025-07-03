import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import "../styles/styles.css";

const ButtonSettings = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Configuración" arrow>
        <button
          type="button"
          className="dropbtn"
          onClick={() => navigate("/administration")}
        >
          <Settings fontSize="large" color="action" />
        </button>
      </Tooltip>
    </>
  );
};

export default ButtonSettings;
