'use client'

export default function Page() {
    console.log('---------------------------------');
    console.log('i am here client page');

    console.log(process.env.NODE_ENV, 'NODE_ENV')
    console.log(process.env.NEXTAUTH_SECRET, 'NEXTAUTH_SECRET')
    console.log(process.env.MONGODB_URI, 'MONGODB_URI')
    console.log(process.env.NEXTAUTH_URI, 'NEXTAUTH_URI');
    console.log(process.env.NEXT_PUBLIC_BACKEND_DOMAIN, 'NEXT_PUBLIC_BACKEND_DOMAIN')
    console.log(process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN, 'NEXT_PUBLIC_BACKEND_API_DOMAIN')
    console.log('---------------------------------');

    return (
        <>
            .env /client page <br />
            NEXT_PUBLIC_BACKEND_DOMAIN: ${process.env.NEXT_PUBLIC_BACKEND_DOMAIN} <br />
            NEXT_PUBLIC_BACKEND_API_DOMAIN: ${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}
        </>
    )
}