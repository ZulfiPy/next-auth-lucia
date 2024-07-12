import { Lucia, TimeSpan } from "lucia";
import { adapter } from "./db";
import { cache } from "react";
import { cookies } from "next/headers";

import type { Session, User } from "lucia"
import type { DatabaseUser } from "./db";

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(60, "m"),
    sessionCookie: {
        expires: true,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username
        }
    }
});

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session; } | { user: null; session: null; }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            }
        }

        const result = await lucia.validateSession(sessionId);

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }

            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch { }
        return result;
    }
)


declare module "lucia" {
    interface Register {
        Lucia: typeof lucia,
        DatabaseUserAttributes: Omit<DatabaseUser, "id">
    }
}