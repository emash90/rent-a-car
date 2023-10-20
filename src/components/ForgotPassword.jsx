import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/signin-image.jpg'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [userEmail, setUserEmail] = useState('')
    const handleUserEmail = (e) => {
        setUserEmail(e.target.value)
    }

    const send_reset_email = async (e) => {
        e.preventDefault()
        console.log("user email", userEmail)

        //check if user with email exists
        const response = await Auth.signIn(userEmail);
        console.log("response", response)
        if (!response) {
            toast.error("user does not exist")
            return
        }
        console.log("user email", userEmail)
        try {
            const res = await Auth.forgotPassword(userEmail);
            console.log("forgot password response", res)
            toast.success("reset code sent")
        } catch (error) {
            console.log('error sending reset code', error);
            toast.error(error.message)
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
                        <h2 class="form-title">Reset Password</h2>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="email" value={userEmail} placeholder="Your Email" onChange={handleUserEmail}/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" onClick={send_reset_email} class="form-submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ForgotPassword
