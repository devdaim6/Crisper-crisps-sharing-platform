import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/db";
import User from "@models/users";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // Check if user already exists
                const userExists = await User.findOne({ email: profile.email });
                // console.log(profile.picture);

                // If not, create one
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        app_name: profile.name,
                        username: profile.name.replace(" ", "").toLowerCase()+Math.floor(Math.random()*100000),
                        image: profile.picture,
                    });
                    console.log("New User Created")
                }


                return true;

            } catch (error) {
                console.error(error);
                console.log(error)
                return false;
            }
        },
    }

});

export { handler as GET, handler as POST };
