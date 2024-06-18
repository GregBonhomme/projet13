import "../../style/pages/login.css"
import { useRef } from "react"
import { useStore } from "react-redux"
import { useNavigate } from "react-router-dom"

function Login () {

    const emailRef = useRef()
    const passwordRef = useRef()
    const rememberRef = useRef()
    const store = useStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        let emailData = emailRef.current.value
        let passwordData = passwordRef.current.value
        let rememberCheck = rememberRef.current.checked

        try {
            const loginResponse = await fetch("http://localhost:3001/api/v1/user/login", {
                method:"POST",
                headers:{"content-type":"application/json; charset=utf-8"},
                mode:"cors",
                body:JSON.stringify({
                    "email":emailData,
                    "password":passwordData
                })
            })
        
            if (loginResponse.status === 200) {
                const loginData = await loginResponse.json()
                const token = loginData.body.token
                store.dispatch({type:"setToken",payload:token})
                if (rememberCheck === true) {
                    localStorage.setItem("token", token)
                }
                navigate("/user")
            } else {
                console.error("Login failed with status : ",loginResponse.status)
            }
        } catch (error) {
            console.error("An error occured: ", error)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input type="text" name="email" ref={emailRef}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" ref={passwordRef}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" name="remember-me" ref={rememberRef}/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    )
}

export default Login