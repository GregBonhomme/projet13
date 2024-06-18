import "../../style/components/nameEditor.css"
import { useState,useEffect } from "react"
import { useStore } from "react-redux"

function NameEditor () {

    const store = useStore()
    const [savedFirstname,setSavedFirstname] = useState(store.getState().user.firstname)
    const [savedLastname,setSavedLastname] = useState(store.getState().user.lastname)
    const [editMode,setEditMode] = useState(false)
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")

    useEffect (() => {
        store.subscribe(() => {
            setSavedFirstname(store.getState().user.firstname)
        })
        store.subscribe(()=> {
            setSavedLastname(store.getState().user.lastname)
        })
    },[store])

    const toggleMode = () => {
        setEditMode(current => !current)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        let token = store.getState().token

        try {
            const submitResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
                method:"PUT",
                headers:{
                    "content-type":"application/json; charset=utf-8",
                    "Authorization":"Bearer " + token
                    },
                mode:"cors",
                body:JSON.stringify({
                    "firstName":firstname,
                    "lastName":lastname
                })
            })
            if (submitResponse.status === 200) {
                store.dispatch({type:"setFirstname",payload:firstname})
                store.dispatch({type:"setLastname",payload:lastname})
                toggleMode()
            }
        } catch (error) {
            console.error("An error occured: ", error)
        }
    } 

    if (editMode === true) {
        return (
            <form className="nameEditor" onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="firstname" value={firstname} onChange={e => setFirstName(e.target.value)} placeholder={savedFirstname}></input>
                    <input type="text" name="lastname" value={lastname} onChange={e => setLastName(e.target.value)} placeholder={savedLastname}></input>
                </div>
                <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={toggleMode}>Cancel</button>
                </div>
            </form>
        )
    } 
    
    return (
        <button type="button" className="edit-button" onClick={toggleMode}>Edit Name</button>
    )
}

export default NameEditor