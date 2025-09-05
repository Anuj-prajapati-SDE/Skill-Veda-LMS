import { useNavigate } from "react-router-dom";
import "./SuccessPopup.css"; // Custom styles

const SuccessPopup = ({ show, onClose}) => {
    const navigate = useNavigate();
    const RedirectToDashboard = ()=>{
        navigate("/userdashboard/my-courses")
    }
  if (!show) return null;
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Hii,👋</h3>
          <span className="close-icon" onClick={onClose} >
          <i className="fa-solid fa-xmark" style={{color:"black"}}></i>
          </span>
        </div>
        <div className="popup-body">
          <p>Congratulations! You've successfully enrolled in our course. Get ready for a journey of happy learning ahead!</p>
        </div>
        <div className="popup-footer">
          <button className="start-learning-btn" onClick={RedirectToDashboard}>
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
