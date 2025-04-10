'use server';
//Generic actions to be used across the app.

import { getAuthSession } from './auth';
import { getUser } from './auth-options';
import { LoggedInUser } from '@/app/lib/definitions'

/*
Until I figure out how to modify the tokens to inlcude 
user id and user type, this function will grab all user data.
*/
export async function getUserData() {
    const session = await getAuthSession();
    if (!session?.user?.email) {
        return null;
    }
    const userInfo = await getUser(session.user.email);
    return userInfo;
}