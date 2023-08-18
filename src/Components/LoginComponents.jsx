import React from "react";
import "./LoginComponents.scss";
import { NaverLogin } from "./NaverLogin";
import { useNavigate } from "react-router-dom";
import kakao from '../images/kakao.png';
import google from '../images/google.png';


export const LoginComponents = () => {
    
    let navigate = useNavigate();


    return(
        <div className="wrapper">
            <div className="login-container">
                <div className="login-title">
                    <p><span style={{color: '#45B1FF'}}>EZPT</span> 로그인</p>
                    <p className="login-title_greet">EZPT에 오신 걸 환영합니다</p>
                </div>
                <div style={{marginBottom: '6rem'}}></div>
                <div className="login-social">
                    <div className="login-kakao"><img src={kakao}></img><p>카카오 계정으로 로그인</p></div>
                    <div className="login-google"><img src={google}></img><p>구글 계정으로 로그인</p></div>
                    <NaverLogin></NaverLogin>
                </div>
                <div style={{marginBottom: '3rem'}}></div>
                <div className="login-footer">
                    <button onClick={() => {}}>로그인</button>
                </div>

            </div>
        </div>

    );
}