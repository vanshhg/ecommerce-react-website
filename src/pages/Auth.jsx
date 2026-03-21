import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth(){
    const [mode, setMode] = useState("signup");
    const [error, seterror] = useState(null);
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {signUp, login}= useContext(AuthContext);
    const navigate = useNavigate()

    function onSubmit(data){
        let result;
        if( mode === "signup"){
            result = signUp(data.email, data.password)
        }else{
            result = login(data.email, data.password)
        }
        console.log(result.success);
        if(result.success){
            navigate("/")
        }else{
            seterror(result.error)
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        {mode === "signup" ? "Sign Up" : "Login"}
                    </h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input className="form-input" type="email" id="email" 
                                {...register('email', {required: "Email is required"})}/>
                            {errors.email && <span style={{color: "crimson"}}>{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input 
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 6, 
                                    message: "Password must be at least 6 characters",
                                },
                                maxLength:{
                                    value: 12,
                                    message: "Password must be less than 12 characters",
                                },
                            })}
                            className="form-input" type="password" id="password"/>
                            {errors.password && <span style={{color: "crimson"}}>{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            {mode === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </form>
                    <div className="auth-switch">
                        {mode === "signup" ? (
                        <p> Already have an account?{" "}<span onClick={() => setMode("login")} className="auth-link">Login</span></p>) : (
                        <p> Don't have an account?{" "}<span onClick={() => setMode("signup")} className="auth-link">Sign Up</span></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}