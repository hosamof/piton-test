import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAuthState } from '../store/authSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // global state
  const authState = useSelector(selectAuthState)


  return (
    <>
      <Head>
        <title>Piton App Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-blue-400'>
        <div className="flex flex-col items-center justify-start w-screen h-screen ">
          <nav className="flex space-x-4 w-300 mb-12 mt-6">
            {/* Check Login Status */}
            {
              !authState.loggedIn ?
                <>
                  {/* <Link className="text-2xl " href={'/login'}>Login</Link> */}
                  < Link className="text-2xl " href={'/register'}>Register</Link>
                </> :
                <>                  
                  <h2>Hi {authState.user}, welcome to our shop!</h2>
                </>
            }
          </nav>
          <h1 className=" text-5xl cl-blue">
            PITON
          </h1>
        </div>
      </main>
    </>
  )
}
