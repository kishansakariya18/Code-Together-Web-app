import React, { useEffect } from "react";
import Router from "next/router";

const Logout = () => {
  useEffect(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    Router.push("/");
    // window.location.reload();
  }, []);

  return <>Logout Page</>;
};

export default Logout;
