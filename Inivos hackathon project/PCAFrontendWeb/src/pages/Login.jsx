import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometer } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import "../customStyles.css";
import { useState } from "react";
import DashboardPage from "./Dashboard";
// import LoginImage from "../assets/login-image.jpg";
import RegisterationBackground from "../assets/RegistrationImage.png";
import EnvConfig from "../components/EnvConfig";
var envConfig = new EnvConfig();


async function authenticateUser(credentials) {    
    const apiUrl = `${envConfig.backendAPIUrl}/api/v1/UserLogin`;
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json()).catch((error) => {console.log(error);window.location.href = "/";});
}

export function Login()
{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

     // Make a POST request with fetch
     const handleSubmit = async e => {
        e.preventDefault();
        const response = await authenticateUser({username,password });           
        if ('token' in response) {     
          localStorage.setItem('userdata', JSON.stringify({isLogged : true,userId : response.userId,token : response.token}));
          localStorage.setItem('accessToken',response.token);
          window.location.href = '/';
        } else { console.log("Invalid response."); }
      }    

    return(
        <>
        <div style={{backgroundImage: `url(${RegisterationBackground})`, backgroundSize: 'cover',  backgroundPosition: 'center',}}>
            <div className="hold-transition login-page">
                <div className="login-box">
                <div className="login-logo">
                    {/* <b>Admin</b>LTE */}
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form noValidate onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                        <input type="text" name="userName" onChange={e => setUsername(e.target.value)} className="form-control" placeholder="User Name" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-user"></span>
                            </div>
                        </div>
                        </div>
                        <div className="input-group mb-2">
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary mt-4">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember" style={{marginLeft:'5px'}}>Remember Me</label>
                                </div>
                            </div>
                        {/* /.col */}
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block mt-3" >
                            Sign In
                            </button>
                        </div>
                        {/* /.col */}
                        </div>
                    </form>                  
                    <p className="mt-4">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    {/* <p className="mb-0">
                        <a href="register.html" className="text-center">
                        Register a new membership
                        </a>
                    </p> */}
                    </div>
                    {/* /.login-card-body */}
                </div>
                </div>
                {/* /.login-box */}
                {/* jQuery */}
            
            </div>
        </div>
        </>
    );
}
export default Login;