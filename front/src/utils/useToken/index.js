import { useState,useEffect } from "react"
import { useStore } from "react-redux"

function useToken (token) {

    const [profile,setProfile] = useState(null)
    const store = useStore()

    useEffect (() => {
        const fetchData = async() => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json; charset=utf-8",
                        "Authorization":"Bearer " + token
                        }
                    })
                const profileData = await response.json()
                
                if (profileData.status === 200) {
                    const user = await profileData.body
                    setProfile(user)
                    store.dispatch({type:"setFirstname",payload: user.firstName})
                    store.dispatch({type:"setLastname" ,payload: user.lastName})
                    store.dispatch({type:"setConnected",payload:true})
                } else {
                    setProfile("invalid")
                }
            } catch (error) {
                console.error("An error occured",error)
                setProfile("invalid")
            }
        }
        token && fetchData()
    },[token])

    return profile
}

export default useToken