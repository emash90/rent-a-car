import React, {useState} from 'react'
import Image from '../assets/signup-image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify'

const RegisterComponent = () => {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        first_name: '',
        surname: '',
        email: '',
        password: '',
        re_password: ''
    })
    const {first_name, surname, email, password, re_password} = registerData
    const get_register_data = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }
    const submit_register_data = async (e) => {
        e.preventDefault()
        console.log("register data", registerData)
        //check if passwords match
        if (password !== re_password) {
            console.log("passwords do not match")
            toast.error("passwords do not match")
            return
        }
        try {
            const user = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,          // optional
                    // other custom attributes 
                }
            });
            if (user) {
                navigate('/confirm')
                //delay 2 seconds to show the toast message
                setTimeout(() => {
                    toast.success("Enter the confirmation code sent to your email")
                }, 2000);
            } else {
                toast.error("Registration Failed")
            }
        } catch (error) {
            console.log('error signing in', error);
            toast.error("Registration Failed")
            
        }
    }




  return (
    <div>
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" class="register-form" id="register-form">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="first_name" value={first_name} placeholder="Your Name" onChange={get_register_data}/>
                            </div>
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="surname" value={surname} placeholder="Your Surname" onChange={get_register_data}/>
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" value={email} placeholder="Your Email" onChange={get_register_data}/>
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" value={password} placeholder="Password" onChange={get_register_data}/>
                            </div>
                            <div class="form-group">
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_password" value={re_password} placeholder="Repeat your password" onChange={get_register_data}/>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" class="form-submit" onClick={submit_register_data} />
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src={Image} alt="sing up image" /></figure>
                        <a href="#" class="signup-image-link"><Link to="/login">I am already member</Link></a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default RegisterComponent
