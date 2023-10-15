import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/signin-image.jpg'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify';

const LoginComponent = () => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = loginData
    const get_login_data = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }
    const submit_login_data = async (e) => {
        e.preventDefault()
        console.log("login data", loginData)
        try {
            const user = await Auth.signIn(email, password);
            if (user) {
                navigate('/')
                toast.success("successfull login")              
            } else {
                toast.error("Login Failed")
            }
        } catch (error) {
            console.log('error signing in', error);
            toast.error("Login Failed")
        }
    }
  return (
    <>
    <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src={image} alt="sing up image" /> </figure>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign-in</h2>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="email" value={email} placeholder="Your Email" onChange={get_login_data}/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" placeholder="Password" value={password} onChange={get_login_data}/>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" onClick={submit_login_data} class="form-submit" />
                            </div>
                        </form>
                        <div class="social-login">
                            <span class="social-label"> Don't have an account?  <Link to="/register">Sign up</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default LoginComponent
