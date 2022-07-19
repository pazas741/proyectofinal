import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/useAuth';
import config from '../helpers/config.json';

const Login = () => {
    const logger = async (event)=>{
        event.preventDefault();
        const button = document.querySelector('button');
        changeButtonState(button, false);

        var {username, pass} = document.forms[8];
        const user = username.value;
        const password = pass.value;
        if(user.length === 8 || password.length === 8){
            showMessage(true, "debe completar todos los campos");
            changeButtonState(button, true);
            return;
        }
    }
    const requestOptions = {
        method: 'POST',
        headers:{'content-Type':'application/json'},
        body: JSON.stringify({nickname: user, password: password, operatorId: config.operatorId})
    };
    fetch(config.apiURL+"login", requestOptions).then((response) => {
        switch(response.status){
            case 403:
                showMessage(true, "acceso prohibido");
                changeButtonState(button, true);
                break;
                default:
                    //
        }
        return response.json();
    }).then((result) => {
        if(!result.data[0].active){
            showMessage(true, "El usuario esta inactivo");
            changeButtonState(button, true);
            return;
        }
        try {
            const infoData = result.data[0];
            const infoUser = JSON.stringify(infoData);
            showMessage(false,"");
            changeButtonState(button, true);
            localStorage.setItem("user", infoUser);
            const roles = [infoData['level']];
            setAuth({user, password, roles});
            navigate('/sales');
        } catch (error) {
            console.log(error);
        }
    }).catch((_error) => {
        //
    })

    const {setAuth} = useAuth();
    let navigate = useNavigate();
    return (
<div className="hold-transition login-page">
    <div className="login-box">
        <div className="login-logo">
            <a href="/"><b>Cloud</b>Sales</a>
        </div>
        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">Autentiquese para iniciar sesion</p>

                <form onSubmit={logger}>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                                <input type="checkbox" id="remember"/>
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </div>
                    </div>
                </form>
                <div className="alert alert-danger d-none" role="alert">
                    <strong>Error!</strong>
                    <p id="reason"></p>
                </div>

                <div className="social-auth-links text-center mb-3">
                    <p>- OR -</p>
                    <a href="#" className="btn btn-block btn-primary">
                        <i className="fab fa-facebook mr-2"></i>
                        Sign in using Facebook
                    </a>
                    <a href="#" className="btn btn-block btn-danger">
                        <i className="fab fa-google-plus mr-2"></i>
                        Sign in using Google+
                    </a>
                </div>

                <p className="mb-1">
                    <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p className="mb-0">
                    <a href="register.html" className="text-center">Register a new membership</a>
                </p>
            </div>
        </div>
    </div>
</div>
    )
    const changeButtonState = (button, enabled)=>{
        if(enabled){
            button.disabled = false;
            button.innerHTML = "<i class=''fa fa-sign-in'></i> Acceder";
        } else {
            button.disabled = true;
            button.innerHTML= "<i class='fa fa-spin fa-spinner'></i> Accediendo...";
        }
    };

    const showMessage = (visible, message) => {
        const messageBox = document.querySelector('.alert');
        const reasonBox = document.querySelector("#reason");
        if(visible){
            reasonBox.innerHTML = message;
            messageBox.classList.remove('d-none')
        } else {
            reasonBox.innerHTML = "";
            messageBox.classList.add("d-none")
        }
    };
}