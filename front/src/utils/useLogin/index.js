
function useLogin (input) {

    let formdata = JSON.stringify(input)
    
    return (
        fetch("localhost:3001/api/v1/user/login", {
            method:"POST",
            body: {
                "email":"",
                "password":""
            }
        }).then(response => {
            if (response.status === 200) {
                return response
            } else {
                return "Error" + response.status
            }
        })
    )
}

export default useLogin