import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, register } from '../Redux/Auth/Action';

function Signup() {
    const [inputData, setInputData] = useState({ full_name: "", email: "", password: "" });
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const { auth } = useSelector(store => store)
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const dispatch = useDispatch();

    console.log("current user",auth.reqUser);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle submit", inputData);

        try {
            // Dispatch register action and wait for response if needed
            await dispatch(register(inputData));

            // If registration is successful, you can navigate or show a success message
            setOpenSnackbar(true);
            // You could navigate to another page, like the login page
            // navigate("/login");
        } catch (err) {
            // Catch and handle any errors here
            setError(err.message);
            console.error("Registration error:", err);
        }
    };

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
        <div className='flex flex-col justify-center min-h-screen items-center'>
            <div className="p-10 w-[30%] shadow-md bg-white">
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <p>
                            User Name
                        </p>
                        <input type="text" className='py-2 px-3 outline-green-600 w-full rounded-md border-2 border-green-600'
                            placeholder='Enter username'
                            value={inputData.full_name}
                            name="full_name"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p>
                            Email
                        </p>
                        <input type="text" className='py-2 px-3 outline-green-600 w-full rounded-md border-2 border-green-600'
                            placeholder='Enter your Email'
                            value={inputData.email}
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <p>
                            Password
                        </p>
                        <input type="password" className='py-2 px-3 outline-green-600 w-full rounded-md border-2 border-green-600'
                            placeholder='Enter your Password'
                            value={inputData.password}
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <Button type="submit" sx={{ bgcolor: green[700], padding: ".5rem 0rem" }} className='w-full bg-green' variant='contained'  >SignUp</Button>
                    </div>

                </form>
                <div className="flex space-x-3 items-center mt-5">
                    <p className='p-0'>Already Have a Account</p>
                    <Button variant='text' onClick={() => navigate("/signin")}> SignIn</Button>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Your Account Successfully Created!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signup