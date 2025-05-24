import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, login } from '../Redux/Auth/Action';
import { store } from '../Redux/store';

function Signin() {

    const [inputData, setInputData] = useState({ email: "", password: "" });
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const { auth } = useSelector(store => store)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handle submit", inputData);
        setOpenSnackbar(true)
        dispatch(login(inputData))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }))
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    useEffect(() => {
        if (token) {
            dispatch(currentUser(token))
        }
    }, [token])

    useEffect(() => {
        console.log(auth.reqUser)
        if (auth.reqUser?.full_name) {
            navigate("/")
        }
    }, [auth.reqUser])

    return (
        <div className='flex justify-center h-screen items-center'>
            <div className="p-10 w-[30%] shadow-md bg-white">
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <p>
                            Email
                        </p>
                        <input type="text" className='py-2 px-3 outline-green-600 w-full rounded-md border-2 border-green-600'
                            placeholder='Enter your Email'
                            value={inputData.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <p>
                            Password
                        </p>
                        <input type="text" className='py-2 px-3 outline-green-600 w-full rounded-md border-2 border-green-600'
                            placeholder='Enter your Password'
                            value={inputData.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Button type="submit" sx={{ bgcolor: green[700], padding: ".5rem 0rem" }} className='w-full bg-green' variant='contained'  >SignIn</Button>
                    </div>

                </form>
                <div className="flex space-x-3 items-center mt-5">
                    <p className='p-0'>Create New Account</p>
                    <Button variant='text' onClick={() => navigate("/signup")}> SignUp</Button>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    LogIn Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signin