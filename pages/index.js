import styles from './index.module.scss';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
/*

Really this page serves as a log in. No other pages will be accessable until you log in here.

*/

export default function Home() {
    async function hashPassword(password, salt) {
        let hashedPassword = 'hashing method TBD';
        return hashedPassword;
    }

    async function SignIn(form) {
        let { username, password } = form;

        let res = await (
            await fetch('/api/login', { body: JSON.stringify({ username }), method: 'post' })
        ).json();
        if (res.error) {
            return; // TODO: deal with this
        }
        let { nonce, salt } = res;
        let hashedPassword = hashPassword(password, salt);
        let response = CryptoJS.HmacSHA256(hashedPassword, nonce);
        res = await (
            await fetch('/api/auth', {
                body: JSON.stringify({ response, nonce, username }),
                method: 'post',
            })
        ).json();
        if (res.error) {
            //TODO: deal with this
        }
        let { token } = res;
        //save token, move to password vault where we will request encrypted data, and decrypt it using the plain text password.
    }

    return (
        <div className={styles.login}>
            <form onSubmit={SignIn} action="/api/auth" method="post">
                <div>
                    <h1>Sign In</h1>
                    <div>
                        <label for="email">Email</label>
                        <input name="email" id="email" type="email" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input name="password" id="password" type="password" />
                    </div>
                    <button type="submit">Sign In</button>
                    <Link href="/signup">Don't have an account? Sign up!</Link>
                </div>
            </form>
        </div>
    );
}
