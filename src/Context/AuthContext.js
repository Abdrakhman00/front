import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("token")) || null,
    isFetching:false,
    error:false
}

/* Reads the data from the Provider and changes INITIAL_STATE */
export const   AuthContext = createContext(INITIAL_STATE)

/* Children here are the Components that need to get the data.[In this Application we specified App COmponent as Child in index.js so that we can server every every component exist in the app */
/* This will provide data to all the children that we are giving here */
export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("token")
      },[state.token])

    return (
        <AuthContext.Provider
        value={{
            token:state.token,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}