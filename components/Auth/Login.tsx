"use client"
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex h-[100vh] flex-col justify-center items-center bg-slate-100">
            <div className='bg-white rounded-xl shadow-lg flex flex-col items-center px-8 py-16 lg:px-8 w-80 sm:w-[500px]'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-lg sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete='email' required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                    "/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600
                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                    " />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded cursor-pointer border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 block cursor-pointer text-sm font-medium leading-6 text-gray-900 select-none">Remember me</span>
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-sky-600 hover:text-sky-700">Forgot password?</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">Sign in</button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold leading-6 text-sky-700 hover:text-sky-600">Create Account</a>
                    </p> */}
                </div>
            </div>
        </div>
    )
}

export default Login;