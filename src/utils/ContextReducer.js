"use client"
import { createContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { useMemo } from "react";
import jwt from "jsonwebtoken";
import { getCookie } from "./getCookie";
export const CartContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
         
        case "REMOVE":
            console.log(action.payload)
            // state =  state.filter((item) => item.id != action.payload.id);
            const newArr = [...state];
            newArr.splice(state.indexOf(action.payload.id),1)
            return newArr
        case "UPDATE":
        return state.map((item) =>
            item.tempId === action.payload.tempId
                ? { ...item, qty: parseInt(item.qty) + parseInt(action.payload.qty), price: parseInt(item.price) + parseInt(action.payload.price) }
                : item
        );
        case "UPDATE_QTY_INCREMENT":
            return state.map((item)=>{
                if(item.tempId === action.payload.tempId){
                    return {...item, qty: parseInt(item.qty) + 1, price: parseInt(item.price) + parseInt(action.payload.unitPrice)}
                }
                return item
            })
        case 'UPDATE_QTY_DECREMENT':
            return state.map((item)=>{
                if(item.tempId == action.payload.tempId){
                    return {...item, qty: parseInt(item.qty) - 1, price: parseInt(item.price) - parseInt(action.payload.unitPrice)}
                }
               return item 
            })
        case "CLEAR":
            return [];

     
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    const [user, setUser] = useState('')
    
    useEffect(()=>{
        const fetchCurrentUser =async()=>{
        const currentUser = await getCookie('token')
    
        if(currentUser){
        const decoded =  jwt.decode(currentUser)
            console.log(decoded)
        setUser(decoded)
        }
        else{
            setUser('')
        }

        }
        fetchCurrentUser()
    },[])


    const contextValue = useMemo(() => {
        return { state, dispatch,user };
    }, [state, dispatch,user]);


    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
}