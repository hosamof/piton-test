import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAuthState, setAuthState } from "../store/authSlice"
import { Const } from "../utils/const"
import { Funcs } from "../utils/funcs"

export default function Register() {
    // global state
    const authState = useSelector(selectAuthState)
    const dispatch = useDispatch()

    // check if already logged in go to home page
    const router = useRouter();
    if (authState.loggedIn) {
        router.replace('/');
    }

    // local state
    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState('asdasd')
    const [email, setEmail] = useState('sadasd@asdsa')
    const [password, setPassword] = useState('asdasdasd')
    const callApi = async () => {
        // check inputs
        if (name.length == 0 || email.length == 0 || password.length < 5) {
            // @TODO: Check email validaty & password difficulty
            alert('Please Fill all fields');
            return;
        }

        // check if call is running
        if (isLoading) return;

        // show loading
        setLoading(true);

        // call api request
        // await Funcs.delay(5000); mock
        const rawResponse = await fetch(Const.REGISTER_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const content = await rawResponse.json();

        // update application state
        if (content != null && content!.token.length > 0) {
            dispatch(setAuthState({ loggedIn: true, token: content.token, user: name }))
        }

        // hide loading
        setLoading(false);
    }

    return (
        <main className="flex flex-row  w-screen h-screen">
            <div className="flex-[2_2_0%] bg-gradient-to-b from-blue-500 to-blue-900 h-screen flex items-center text-white">
                <div className="flex flex-col pl-28">
                    <h1 className="text-5xl mb-2">
                        PitonShop
                    </h1>
                    <p className="text-2xl">
                        The most popular book shop for IT
                    </p>
                </div>
            </div>
            <div className="flex-1 h-screen flex flex-col justify-center items-center">
                <div className="flex flex-col w-64 mb-8">
                    <h1 className="text-3xl text-black font-bold">
                        Hello!
                    </h1>
                    <p className="text-black">
                        Sign Up to Get Started
                    </p>
                </div>
                <form className="flex flex-col justify-center items-center h-60 w-full"
                    onSubmit={(e) => {
                        e.preventDefault()
                        callApi()
                    }}
                >
                    <input className="w-64 mb-3 rounded-full p-3 border border-solid border-gray-300 outline-none"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        required
                        type='text'
                        placeholder="Full Name"
                    // value={name}
                    ></input>
                    <input className="w-64 mb-3 rounded-full p-3 border border-solid border-gray-300 outline-none"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                        type='email'
                        placeholder="Email Address"
                    // value={email}
                    ></input>
                    <input className="w-64 mb-3 rounded-full p-3 border border-solid border-gray-300 outline-none"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                        minLength={6}
                        maxLength={20}
                        type='password'
                        placeholder="Password"
                    // value={password}
                    ></input>
                    {
                        isLoading ? <p>Loading ...</p>
                            : <input className="bg-blue-700 w-64 mb-3 rounded-full p-3 border border-solid border-gray-300 outline-none text-white text-sm cursor-pointer transition-all hover:bg-blue-900"
                                type='submit' value='Register'></input>
                    }
                </form>
            </div>
        </main>
    )
}