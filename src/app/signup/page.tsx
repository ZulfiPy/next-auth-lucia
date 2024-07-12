import { ActionResult, Form } from "@/lib/form";
import { db, client } from "@/lib/db";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { generateId, generateIdFromEntropySize } from "lucia";
import bcrypt from "bcryptjs";
import { usersTable } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 space-y-6">
            <h1>Create an account</h1>
            <Form action={signup}>
                <div className="flex flex-col">
                    <div className="space-y-2">
                        <label htmlFor="username" className="px-2">Username:</label>
                        <input name="username" id="username" />
                        <br />
                        <label htmlFor="password" className="px-2">Password</label>
                        <input type="password" name="password" id="password" />
                        <br />
                    </div>
                    <button>register</button>
                </div>
            </Form>
        </main>
    )
}

async function signup(_: any, formData: FormData) {
    "use server";

    const username = formData.get('username');
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
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = generateId(username.length);
    console.log('userId:', userId);
    console.log('username:', username);
    console.log('hashedPassword:', hashedPassword);

    try {
        const newUser = await db.insert(usersTable).values({
            id: userId,
            username,
            password: hashedPassword
        })
        .returning(); 

        console.log('new user registered', newUser);
    } catch (error) {
        console.log('error occurred while registering new user, error:', error);
    }

    return redirect('/')
}