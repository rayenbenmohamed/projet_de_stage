import axios from 'axios';
import React, { useState } from 'react'

const Signup = () => {
    const [username, setUsername] = useState();
    const [email, setemail] = useState();
    const [userpassword, setpassword] = useState();

    const signup=()=>{
        if(username!=""&&userpassword!=""){
            let newuser={username:username,password:userpassword}
            axios.post("http://localhost:3001/users",newuser).then(res=>{
                axios.get(`http://localhost:3001/users?username=${username}`).then(res=>{
                    localStorage.setItem("userId",res.data[0].id)
                })
                
            }
            )
        }
    }
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-outline-primary ms-2" data-bs-toggle="modal" data-bs-target="#signupModal">
                <span className="fa fa-user-plus me-1"></span> Register
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-primary w-100 mb-4">
                                <span className="fa fa-google me-2"></span> Sign up With Google
                            </button>
                            <button className="btn btn-primary w-100 mb-4">
                                <span className="fa fa-facebook me-2"></span> Sign up With Facebook
                            </button>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInput" className="form-label">Username</label>
                                    <input type="text" className="form-control" onChange={(e)=>{setUsername(e.target.value)}} id="exampleInput" />
                                </div>
                      
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" onChange={(e)=>{setpassword(e.target.value)}} className="form-control" id="exampleInputPassword1" />
                                </div>
                             
                                <button type="button" onClick={signup} className="btn btn-outline-primary w-100 mt-5">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;