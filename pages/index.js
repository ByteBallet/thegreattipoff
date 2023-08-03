import { getSession } from 'next-auth/client';
import HomeBase from 'HomeBase';

export async function getServerSideProps(context) {
    try {
        const updatedSession = await getSession({ req: context.req });

        context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');

        return {
            props: {
                session: updatedSession,
            },
        };
    } catch {
        return {
            props: {},
        };
    }
}

export default function Home(props) {
    return (
        <>
            <HomeBase props={props} />
        </>
    );
}
