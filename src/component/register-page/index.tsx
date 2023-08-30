import { match } from 'assert';
import React, {useRef, useState, useEffect} from 'react'

const RegisterPage: React.FC = () => {

    const USER_REGEX = /.{4,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const userRef = useRef<any>()
    const errRef = useRef<any>()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatchPwd, setValidMatchPwd] = useState(false)
    const [matchPwdFocus, setMatchPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
      userRef.current.focus()
    },[])

    useEffect(()=>{
      const result = USER_REGEX.test(user)
      console.log(user, result)
      setValidName(result)
    },[user])

    useEffect(()=>{
      const result = PWD_REGEX.test(pwd)
      console.log(pwd, result)
      setValidPwd(result)
      const match = pwd === matchPwd
      setValidMatchPwd(match)
    },[pwd, matchPwd])

    useEffect(()=>{
      setErrMsg('')
    },[user, pwd, matchPwd])

  return (
    <section>
      <p ref={errRef} className={errMsg ? '' : 'hidden'}></p>
      <h1>Register</h1>
      <form>
        <label htmlFor='username'>
          UserName:
        </label>
        <input
          type='text'
          id="username"
          ref={userRef}
          autoComplete='off'
          onChange={(e)=>{
            setUser(e.target.value)
          }}
          required
          onFocus={()=> setUserFocus(true)}
          onBlur={()=> setUserFocus(false)}
        />
        <p id='uidnote' className={ userFocus && user && !validName ? '' : 'hidden'}>
          4 to 24 characters
        </p>

        <label htmlFor='password'>
          Password:
        </label>
        <input
          type='password'
          id="password"
          onChange={(e)=>{
            setPwd(e.target.value)
          }}
          required
          onFocus={()=> setPwdFocus(true)}
          onBlur={()=> setPwdFocus(false)}
        />
        <p id='pwdnote' className={ pwdFocus && pwd && !validPwd ? '' : 'hidden'}>
          8 to 24 characters,
          Must include upppercase and lowercase letters, a number and a speical character.
          !@#$%
        </p>
      </form>
    </section>
  )
}

export default RegisterPage