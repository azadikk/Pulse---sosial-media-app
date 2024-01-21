import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import "../signup/index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import { LoginSchema } from "./schema/LoginSchema";
import axios from "axios";
import {
  ErrorComponent,
  ErrorComponent2,
  ErrorComponent3,
} from "../errors-success/LoginError";
import GlobalButtonLoading from "../GlobalButtonLoading";
import { useToken } from "../contexts/TokenContext";
import { useUserInfo } from "../contexts/UserInfo";

const Login = () => {
  //show error message on the client
  const [handleError, setHandleError] = React.useState<string | null>(null);

  //navigate to dashboard the user
  const navigate = useNavigate();

  const { setToken } = useToken();

  //get user info on logging
  const { setUserInfo } = useUserInfo();


  return (
    <div className="login-container">
      <div className="background-provider">
        <img src="./pulselogo.svg" alt="background-image" />
      </div>

      <Formik
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const api = "http://localhost:3000/login";
          const request = await axios.post(api, values, {
            validateStatus: (status: number) => {
              return status >= 200 || status === 400;
            },
          });
          try {
            if (
              request.data &&
              request.data.message === "loggedSuccess" &&
              request.data.token 
            ) {
      
              setHandleError("successlogin");

              const user_token = request.data.token;

              //get the token to session storage
              const session = localStorage.setItem("authToken", user_token);

              setToken(session);

              if (localStorage.getItem("ifUserFirstLogin") === "true") {
                const timeout = setTimeout(() => {
                  navigate("/profil/profilə-düzəliş");
                }, 700);
                return () => clearTimeout(timeout);
              } else if (localStorage.getItem("ifUserFirstLogin") === "false") {
                const timeout = setTimeout(() => {
                  navigate("/profil");
                }, 700);
                return () => clearTimeout(timeout);
              }
           

              const hiddenErrMessage = setTimeout(() => {
                setHandleError(null);
              }, 3200);
              return () => clearTimeout(hiddenErrMessage);

            } else if (
              request.data &&
              request.data.invalidPass === "invalid password"
            ) {
              setHandleError("invalidpass");
              const hiddenErrMessage = setTimeout(() => {
                setHandleError(null);
              }, 3200);
              return () => clearTimeout(hiddenErrMessage);
            } else if (request.data.notfound === "not found user") {
              setHandleError("notfounduser");
              const hiddenErrMessage = setTimeout(() => {
                setHandleError(null);
              }, 3200);
              return () => clearTimeout(hiddenErrMessage);
            }
          } catch (error) {
            console.log(error, "request error at login");
          }
        }}
        initialValues={{
          nickname: "",
          password: "",
        }}
      >
        {(props) => (
          <Form>
            {handleError === "invalidpass" && (
              <ErrorComponent>
                Şifrə və ya istifadəçi adınız düzgün yazılmayıb
              </ErrorComponent>
            )}
            {handleError === "notfounduser" && (
              <ErrorComponent2>İstifadəçi tapılmadı..</ErrorComponent2>
            )}
            {handleError === "successlogin" && (
              <ErrorComponent3>
                Giriş uğurludur. Yönləndirilirsiniz..
              </ErrorComponent3>
            )}
            <div className="input-field">
              <label>İstifadəçi adı (görünən ad)</label>
              <Field name="nickname" type="text" autoComplete="off" />
              {props.errors.nickname && props.touched.nickname && (
                <p>{props.errors.nickname}</p>
              )}
            </div>

            <div className="input-field">
              <label>Şifrə</label>
              <Field name="password" type="password" autoComplete="off" />
              {props.errors.password && props.touched.password && (
                <p>{props.errors.password}</p>
              )}
            </div>

            <div className="bottom">
              <div className="buttons">
                <button
                  id="login"
                  type="submit"
                  disabled={handleError === "successlogin"}
                >
                  {handleError === "successlogin" ? (
                    <GlobalButtonLoading />
                  ) : (
                    "Daxil ol"
                  )}
                </button>
              </div>

              <div className="more">
                <div className="label">
                  <label>Bir hesabın yoxdur?</label>
                  <Link to="/qeydiyyat" id="link">
                    Qeydiyyat
                  </Link>
                </div>

                <div className="label">
                  <label>Nə isə yadından çıxıb?</label>
                  <Link to="" id="link">
                    Yenilə
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Link className="get-back" to="/">
        <IoIosArrowBack id="backicon" />
        Geri
      </Link>
    </div>
  );
};

export default Login;
