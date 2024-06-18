import "../../style/components/header.css"
import logo from "../../assets/img/argentBankLogo.png"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "react-redux"

function Header () {

    const store = useStore()
    const navigate = useNavigate()
    const [user,setUser] = useState(store.getState().user)
    const [connected,setConnected] = useState(store.getState().connected)

    useEffect(() => {
        store.subscribe(()=> {
            setUser(store.getState().user)
        })
        store.subscribe(()=> {
            setConnected(store.getState().connected)
        })
    },[store])

    const logOff = () => {
        localStorage.clear()
        store.dispatch({type:"setToken",payload:""})
        store.dispatch({type:"setConnected",payload:false})
        store.dispatch({type:"setFirstname",payload:""})
        store.dispatch({type:"setLastname",payload:""})
        navigate("/")
    }

    if (!user || connected === false) {

        return (
            <header className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </div>
            </header>
        )   
    } 

    return (
        <header className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" href="./user.html">
                    <i className="fa fa-user-circle"></i>
                    {user.firstname}
                </Link>
                <Link className="main-nav-item" to="/" onClick={logOff}>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </header>
    )
    
}

export default Header