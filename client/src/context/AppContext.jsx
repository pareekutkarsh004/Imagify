import { createContext, use } from "react";
import { useState } from "react";
import App from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) =>{
    const [user,setUser] = useState(null);
    const [showLogin,setShowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [credit,setCredit] = useState(false);

    const navigate = useNavigate()
    const  backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits',
                {headers: {token}}
            )
           console.log("HERE WE ARE!!")
           console.log(data)
            if(data.success){
                console.log("we are in app context")
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const generateImage = async(prompt) => {
         try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers:{token}})

            if(data.success){
                loadCreditsData();
                return data.resultImage
            }else{
                console.log("aagya error user wala generate!!")
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance == 0){
                    //redirect user to the buy credit page 
                    navigate('/buy');
                    
                }
            }
         } catch (error) {
            toast.error(error.message)
            navigate('/buy')
         }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }
    useEffect(()=>{
      if(token){
        loadCreditsData()
      }
    },[token])
    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken,
        credit, setCredit, loadCreditsData, logout, generateImage
    }

    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;