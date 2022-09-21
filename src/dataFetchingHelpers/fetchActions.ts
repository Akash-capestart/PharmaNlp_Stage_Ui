import { storageGet } from "../localStorageHelpers/localStorageActions";

const getToken = () => {    
    const token : string = storageGet("isLoggedIn") ? storageGet("token") : ""
    return token
}

const preUrl = "https://ecom-api-testing.herokuapp.com"
const pharmaPreUrl = "https://stagecspapi.pharmanlp.com"

export const FetchGet = async (url: string) => {    
    const response = await fetch(`${pharmaPreUrl}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": getToken()
        }
    })
    .then(res => res.json())    
    return response    
}

export const FetchPost = async (url: string, payLoad: any) => {
    const response = await fetch(`${preUrl}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": getToken()
        },
        body: JSON.stringify(payLoad)
    })
    .then(res => res.json())
    return response
}
