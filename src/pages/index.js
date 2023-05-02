import { Inter } from 'next/font/google'
import styles from '../styles/first.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href='/register' legacyBehavior>
          <a>
            <button>Register</button>
          </a>
        </Link>
        <Link href='/login' legacyBehavior>
          <a>
            <button>Login</button>
          </a>
        </Link>
      </div>
    </main>
  )
}
