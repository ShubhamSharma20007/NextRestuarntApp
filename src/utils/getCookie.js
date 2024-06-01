"use server"
import { cookies } from "next/headers"
export const getCookie = (name) => {
    const cookieStore = cookies()
    const cookie = cookieStore.get(name)
    return cookie?.value
}