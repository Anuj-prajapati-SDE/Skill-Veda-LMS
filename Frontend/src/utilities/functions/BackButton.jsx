import { useNavigate } from "react-router-dom";

const BackButton = ({path}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="back"
    >
      <i class="fa-solid fa-arrow-left"></i>
    </button>
  );
};

export default BackButton;
