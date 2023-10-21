import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/signin-image.jpg'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [userEmail, setUserEmail] = useState('')
    const [ response, setResponse ] = useState(null)
    const [ code, setCode ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const handleEmailInput = (e) => {
        setUserEmail(e.target.value)
    }
    const handleCodeInput = (e) => {
        setCode(e.target.value)
    }
    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const send_reset_email = async (e) => {
        e.preventDefault()
        console.log("user email", userEmail)
        try {
            const res = await Auth.forgotPassword(userEmail);
            console.log("forgot password response", res)
            toast.success("reset code sent")
            setResponse(res)
        } catch (error) {
            console.log('error sending reset code', error);
            toast.error(error.message)
        }
    }
    // handle password reset
    const handle_password_reset = async (e) => {
        e.preventDefault()
        console.log("user email", userEmail)
        try {
            const res = await Auth.forgotPasswordSubmit(userEmail, code, newPassword);
            console.log("forgot password response", res)
            toast.success("password reset successful")
            setResponse(res)
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
                                <input type="text" name="email" value={userEmail} placeholder="Your Email" onChange={handleEmailInput}/>
                            </div>
                            {response && response.CodeDeliveryDetails && (
                                <>
                                                            <div class="form-group">
                                                            <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                                            <input type="text" name="email" value={code} placeholder="Your Email" onChange={handleCodeInput}/>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                                            <input type="password" name="newPassword" placeholder="Enter New Password" value={newPassword} onChange={handleNewPassword}/>
                                                        </div>
                                                        </>
                                                        )}

                            <div class="form-group form-button">
                            {response && response.CodeDeliveryDetails ? (
                                <input type="submit" onClick={handle_password_reset} class="form-submit" />
                            ) : (
                                <input type="submit" onClick={send_reset_email} class="form-submit" />
                            )}
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
