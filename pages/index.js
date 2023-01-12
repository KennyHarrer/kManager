import styles from './index.module.scss';
/*

Really this page serves as a log in. No other pages will be accessable until you log in here.

*/

export default function Home() {
    return (
        <div className={styles.login}>
            <form action="/api/auth" method="post">
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
                </div>
            </form>
        </div>
    );
}
