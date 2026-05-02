import {Link, useNavigate} from "react-router"
import { useState, useEffect } from "react"
import api from "../api/axios";

export default function Navbar() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return(
        <nav className="flex justify-between p-4 shadow">
            <Link to="" className="font-bold text-xl"></Link>
            <div className="flex gap-4 items-center">
                {
                    !userId ?(
                        <>
                            <Link to="/login" className="text-lg">Login</Link>
                            <Link to="/signup" className="text-lg">Signup</Link>
                        </>
                    ) : (
                        <button onClick={logout} className="text-lg">Logout</button>
                    )
                }
            </div>
        </nav>
    )
}