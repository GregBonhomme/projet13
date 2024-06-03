import "../../style/pages/login.css"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

function Login () {

    const emailRef = useRef()
    const passwordRef = useRef()
    const rememberRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        let emailData = emailRef.current.value
        let passwordData = passwordRef.current.value
        let rememberCheck = rememberRef.current.checked
        console.log(emailData)
        console.log(passwordData)
        console.log(rememberCheck)

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
                console.log(token)

                const profileResponse = await fetch("http://localhost:3001/api/v1/user/profile",{
                    method:"POST",
                    headers:{"content-type":"application/json; charset=utf-8",
                            "Authorization":"Bearer " + token
                    }
                })
            
            const profileData = await profileResponse.json()
            const userData = profileData.body
                if (rememberCheck === true) {
                    localStorage.removeItem("user")
                    sessionStorage.removeItem("user")
                    localStorage.setItem("user",JSON.stringify(userData))
                    const data = localStorage.getItem("user")
                        console.log(data)
                } else {
                    localStorage.removeItem("user")
                    sessionStorage.removeItem("user")
                    sessionStorage.setItem("user",JSON.stringify(userData))
                    const data = JSON.parse(sessionStorage.getItem("user"))
                        console.log(data.firstName)
                }
            navigate("/")
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