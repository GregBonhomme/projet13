import "../../style/components/header.css"
import logo from "../../assets/img/argentBankLogo.png"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "react-redux"

function Header () {

    const store = useStore()
    const navigate = useNavigate()
    const [logged,setLogged] = useState(store.getState().logged)
    console.log(logged)

    useEffect(()=> {
        store.subscribe(()=> {
            setLogged(store.getState().logged)
        })
    },[store])

    const logOff = () => {
        localStorage.clear()
        sessionStorage.clear()
        store.dispatch({type:"setFirstname",payload:""})
        store.dispatch({type:"setLastname",payload:""})
        store.dispatch({type:"loggedOff"})
        navigate("/")
    }

    if (logged === true) {
        const userFirstname = store.getState().user.firstname

        return (
            <header className="main-nav">
                <a className="main-nav-logo" href="./index.html">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <Link className="main-nav-item" href="./user.html">
                        <i className="fa fa-user-circle"></i>
                        {userFirstname}
                    </Link>
                    <Link className="main-nav-item" to="/" onClick={logOff}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
            </header>
        )
    } else {
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
}

export default Header