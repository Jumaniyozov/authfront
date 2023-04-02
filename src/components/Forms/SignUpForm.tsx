import React, { useEffect, useRef, useState } from "react";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import axios from "@/api/axios";
import NotificationBox from "./NotificationBox";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUpForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const disableSubmit = !validName || !validMatch || !validPwd ? true : false;

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    if (success) {
      console.log(user);
      console.log(pwd);
      console.log(matchPwd);
      //   setUser("");
      //   setPwd("");
      //   setMatchPwd("");
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const V1 = USER_REGEX.test(user);
    const V2 = PWD_REGEX.test(pwd);
    if (!V1 || !V2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "/api/register",
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      setUser("");
      setPwd("");
      setMatchPwd("");
      setSuccess(true);
      formRef.current?.reset();
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Usename Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign In
            </h2>
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              to your account
            </p>
          </div>

          <div className="mt-8 relative">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6 ">
                {/* <NotificationBox msg="Error" description={errMsg} /> */}
                {errMsg && <NotificationBox msg="Error" description={errMsg} />}
                <div>
                  <div>
                    <label
                      htmlFor="signin_user"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        id="signin_user"
                        name="signin_user"
                        type="text"
                        autoComplete="off"
                        // onChange={(e) => setUser(e.target.value)}
                        required
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        className="block pr-10 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {validName && user && (
                          <>
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                        {!validName && userFocus && user && (
                          <>
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </div> */}
                    </div>
                    {/* {userFocus && !validName ? (
                      <div className="mt-2 flex gap-2 bg-indigo-600 text-white  rounded-md py-2 px-4">
                        <InformationCircleIcon className="h-6 w-6 mt-1" />
                        <div className="">
                          4 to 24 characters.
                          <br />
                          Must begin with a letter.
                          <br />
                          Letters, numbers, underscores, hyphens allowed
                          <br />
                        </div>
                      </div>
                    ) : null} */}
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      htmlFor="signin_pwd"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        id="signin_pwd"
                        name="signin_pwd"
                        type="password"
                        // onChange={(e) => setPwd(e.target.value)}
                        required
                        // onFocus={() => setPwdFocus(true)}
                        // onBlur={() => setPwdFocus(false)}
                        className="block pr-10 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {validPwd && pwd && (
                          <>
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                        {!validPwd && pwdFocus && pwd && (
                          <>
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </div> */}
                    </div>
                    {/* {pwdFocus && !validPwd ? (
                      <div className="mt-2 flex gap-2 bg-indigo-600 text-white  rounded-md py-2 px-4">
                        <InformationCircleIcon className="h-6 w-6 mt-1" />
                        <div className="">
                          8 to 24 characters.
                          <br />
                          Must include uppercase and lowercase letters, a number
                          and a special character.
                          <br />
                          Allowed special characters: !@#$%
                          <br />
                        </div>
                      </div>
                    ) : null} */}
                  </div>
                </div>
                <div>
                  <button
                    disabled={disableSubmit}
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="mt-2 flex">
                <p className="block text-sm font-medium text-gray-700">
                  Don't have an account?
                  <a href="#" className="underline ml-2">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign Up
            </h2>
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              and start your 14-day free trial
            </p>
          </div>

          <div className="mt-8 relative">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
                {/* <NotificationBox msg="Error" description={errMsg} /> */}
                {errMsg && <NotificationBox msg="Error" description={errMsg} />}
                <div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        ref={userRef}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        className="block pr-10 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {validName && user && (
                          <>
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                        {!validName && userFocus && user && (
                          <>
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {userFocus && !validName ? (
                      <div className="mt-2 flex gap-2 bg-indigo-600 text-white  rounded-md py-2 px-4">
                        <InformationCircleIcon className="h-6 w-6 mt-1" />
                        <div className="">
                          4 to 24 characters.
                          <br />
                          Must begin with a letter.
                          <br />
                          Letters, numbers, underscores, hyphens allowed
                          <br />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        className="block pr-10 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {validPwd && pwd && (
                          <>
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                        {!validPwd && pwdFocus && pwd && (
                          <>
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {pwdFocus && !validPwd ? (
                      <div className="mt-2 flex gap-2 bg-indigo-600 text-white  rounded-md py-2 px-4">
                        <InformationCircleIcon className="h-6 w-6 mt-1" />
                        <div className="">
                          8 to 24 characters.
                          <br />
                          Must include uppercase and lowercase letters, a number
                          and a special character.
                          <br />
                          Allowed special characters: !@#$%
                          <br />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      htmlFor="confirm_pwd"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        id="confirm_pwd"
                        name="confirm_pwd"
                        type="password"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className="block pr-10 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {validMatch && matchPwd && (
                          <>
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                        {!validMatch && matchFocus && matchPwd && (
                          <>
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {matchFocus && !validMatch ? (
                      <div className="mt-2 flex items-center gap-2 bg-indigo-600 text-white  rounded-md py-2 px-4">
                        <InformationCircleIcon className="h-6 w-6 mt-1" />
                        <div>Must match first password</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <button
                    disabled={disableSubmit}
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="mt-2 flex">
                <p className="block text-sm font-medium text-gray-700">
                  Already registered?
                  <a href="#" className="underline ml-2">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUpForm;
