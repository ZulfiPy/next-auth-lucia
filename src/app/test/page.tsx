"use client";
import { useEffect } from "react";

const Page = () => {
    const backendAPIRoute = process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN as string
    useEffect(() => {
        const getTestAPIRoute = async () => {

            console.log('backendAPIRoute', backendAPIRoute)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/test`, {
                    method: "GET",
                    credentials: "include",
                    cache: 'no-store'
                });

                const data = await response.json();
                console.log('data', data);
                return { data }
            } catch (error) {
                return { error }
            }
        }

        getTestAPIRoute();

    }, [])

    return (
        <>
            lol kak tak
        </>
    )
}

export default Page;