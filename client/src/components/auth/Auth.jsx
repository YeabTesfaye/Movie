import AuthForm from "./Form";
import { userAuthRequest } from "../../lib/api";
import { userActions } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Auth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onResponseReceived = (data) => {
    dispatch(() => userActions.login());
    localStorage.setItem("userId", data.user._id)
    navigate("/");
  }
  const getData = async (data) => {
    try {
       userAuthRequest(data.values, data.signup).then(onResponseReceived)
      .catch(e =>  console.log(e)) 
      
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div>
      <AuthForm
        isAdmin={false}
        onSubmit={getData}
      />
    </div>
  );
}

export default Auth;
