import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './NaverLogin.scss';
import icon from '../images/naverImage.png';
export const NaverLogin = ({ setGetToken, setUserInfo }) => {
    const naverRef = useRef();
    const navigate = useNavigate();
	const { naver } = window
	const NAVER_CLIENT_ID = '8pKUNu6ftH2UcziZHBo5'
	const NAVER_CALLBACK_URL = "http://118.67.133.132:3000/main"

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init()
        


		//토큰 넘겨주면 백에서 처리가능 (생략)
        naverLogin.getLoginStatus(async function (status) {
			if (status) {
              	// 로그인 정보 추출
                const userAge = naverLogin.user.getAge()
				const username = naverLogin.user.getName()
                
                sessionStorage.setItem("naver_age", userAge);
                sessionStorage.setItem("naver_name", username);
                
                console.log(naverLogin);
              // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
              // setUserInfo(naverLogin.user)
			}
		})     
	}
    
    
    
            // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 어스코드가 붙어서 전달된다.
            // 우선 아래와 같이 어스코드를 추출 할 수 있으며,
            // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.
   
	const userAccessToken = () => {
		window.location.href.includes('access_token') && getToken()
	}
        
    const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0]
			//token이 auth코드임
			console.log(token) 
        
        // localStorage.setItem('access_token', token)
		// setGetToken(token)
	}

        
	// 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
	useEffect(() => {
		initializeNaverLogin()
		userAccessToken()
	}, [])

	const handleNaver = () => {
		naverRef.current.children[0].click()
	}

	return (
		<>
            <div id='naverIdLogin' ref={naverRef} className='naverLogin'></div>
			<button className='naverBtn' onClick={handleNaver}>
				<img className='naverIcon'src={icon}></img>
				<div className='naverTitle'>네이버 계정으로 로그인</div>
			</button>
        </>
	)
}
