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
        re_password: '',
        user_type: ''
    })
    const {first_name, surname, email, password, re_password, user_type} = registerData
    const get_register_data = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }
    const submit_register_data = async (e) => {
        e.preventDefault()
        console.log("register data", registerData)
        //check if all fields are filled
        if (first_name === '' || surname === '' || email === '' || password === '' || re_password === '') {
            console.log("all fields are required")
            toast.error("all fields are required")
            return
        }
        //check if passwords match
        if (password !== re_password) {
            console.log("passwords do not match")
            toast.error("passwords do not match")
            return
        }
        //check if user type is selected
        if (user_type === '') {
            console.log("user type not selected")
            toast.error("user type not selected")
            return
        }
        try {
            const user = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    'custom:user_type': user_type
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
                                <div class="form-group" style={{display: 'flex', flexDirection: 'column'  }}>
                                    <div>
                                        <input type="radio" name="user_type" id="user_type" value="client" class="agree-term" checked={user_type === 'client'} onChange={get_register_data}/>
                                        <label for="user_type" class="label-agree-term">Client - I want to hire a car</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="user_type" id="user_type" value="merchant" class="agree-term" checked={user_type === 'merchant'} onChange={get_register_data}/>
                                        <label for="user_type" class="label-agree-term">Merchant - I want to rent out my car</label>
                                    </div>
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
