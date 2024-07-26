import logger from "@/lib/logger";

export default function Page() {
    logger.info('---------------------------------');
    logger.info('i am here server page')

    logger.info(`${process.env.NODE_ENV}`, 'NODE_ENV')
    logger.info(`${process.env.NEXTAUTH_SECRET}`, 'NEXTAUTH_SECRET')
    logger.info(`${process.env.MONGODB_URI}`, 'MONGODB_URI')
    logger.info(`${process.env.NEXTAUTH_URI}`, 'NEXTAUTH_URI');
    logger.info(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`, 'NEXT_PUBLIC_BACKEND_DOMAIN')
    logger.info(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}`, 'NEXT_PUBLIC_BACKEND_API_DOMAIN')
    logger.info('---------------------------------');

    return (
        <>
            .env /server page <br />
        </>
    )
}