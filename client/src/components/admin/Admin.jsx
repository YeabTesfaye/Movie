import React from "react";
import AuthForm from "../auth/Form";
import { adminAuthRequest } from "../../lib/api";
import { adminActions } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onResponseReceived = (data) => {
    console.log("From Admin", data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/")
  };

  const getData = async (data) => {
    try {
      adminAuthRequest(data.values).then(onResponseReceived);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
}

export default Admin;
