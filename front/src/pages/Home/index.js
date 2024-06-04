import "../../style/pages/home.css"
import { useStore } from "react-redux"
import { useState,useEffect } from "react"
import DefaultHomePage from "../DefaultHomePage"

function Home () {
    const user = JSON.parse(localStorage.getItem("user"))
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const store = useStore()
    const [logged,setLogged] = useState(store.getState().logged)

    useEffect(() => {
        store.subscribe(()=> {
            setLogged(store.getState().logged)
        })
    },[store])

    if (logged === true) {
        let userData = []
        user ? (userData = user) : (userData = sessionUser)
        store.dispatch({type:"setFirstname", payload: userData.firstName})
        store.dispatch({type:"setLastname", payload: userData.lastName})

        const userFirstname = store.getState().user.firstname
        const userLastname = store.getState().user.lastname

        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{userFirstname} {userLastname} !</h1>
                    <button className="edit-button">Edit Name</button>
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
    } else {
        console.log("No user identified")}
        return (
            <DefaultHomePage/>
        )
}

export default Home