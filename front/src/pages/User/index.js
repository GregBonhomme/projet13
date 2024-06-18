import "../../style/pages/user.css"
import { useState,useEffect } from "react"
import { useStore } from "react-redux"
import { useNavigate } from "react-router-dom"
import NameEditor from "../../component/NameEditor"
import useToken from "../../utils/useToken"

function User () {

    const store = useStore()
    const navigate = useNavigate()
    const token = store.getState().token
    const [firstname,setFirstname] = useState(store.getState().user.firstname)
    const [lastname,setLastname] = useState(store.getState().user.lastname)
    const userCheck = useToken(token)

    useEffect(() => {
        store.subscribe(() => {
            setFirstname(store.getState().user.firstname)
        })
        store.subscribe(() => {
            setLastname(store.getState().user.lastname)
        })
        if (token === "" || userCheck === "invalid" ) {
            store.dispatch({type:"setConnected",payload: false})
            navigate("/")
            console.log("invalid user")
        }
    },[store])

        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{firstname} {lastname} !</h1>
                    <NameEditor />
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        )
    }

export default User