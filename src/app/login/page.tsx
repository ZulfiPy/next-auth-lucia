import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { db, usersTable } from "@/lib/db";
import { Form } from "@/lib/form";
import { redirect } from "next/navigation";

import type { DatabaseUser } from "@/lib/db";
import type { ActionResult } from "@/lib/form";
import { eq, lt, gte, ne } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default async function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 space-y-6">
            <h1>Sign in</h1>
            <Form action={login}>
                <div className="flex flex-col">
                    <div className="space-y-2">
                        <label htmlFor="username" className="px-2">Username:</label>
                        <input name="username" id="username" />
                        <br />
                        <label htmlFor="password" className="px-2">Password:</label>
                        <input type="password" name="password" id="password" />
                        <br />
                    </div>
                    <button className="p-2">Login</button>
                </div>
            </Form>
        </main>
    )
}

async function login(_: any, formData: FormData) {
    "use server";

    const username = formData.get("username") as string
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        }
    }

    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        }
    }

    console.log('----------------------')
    console.log('username:', username)
    console.log('password:', password);


    try {
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username))
        if (existingUser.length === 0) return
        console.log('user found')
        const validPassword = await bcrypt.compare(password, existingUser[0].password)
        console.log(validPassword)
        if (!validPassword) {
            console.log('password is invalid');
            return
        }

        const session = await lucia.createSession(existingUser[0].id, {})
        console.log('session created');
        const sessionCookie = lucia.createSessionCookie(session.id);
        console.log('session cookie created');
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error) {
        console.log('error occured while checking if user exits, error:', error);
    }

    return redirect('/');
}