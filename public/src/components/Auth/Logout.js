import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  navigate("/");
};

export default Logout;
