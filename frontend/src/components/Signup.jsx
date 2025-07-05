import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  // State to handle form input (username, email, password)
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Function to hangle input change
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  // Function to handle form submission
  const signupHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true); // Set loading to true
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          // Send POST request to the backend
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          withCredentials: true, // Allow credentials (cookies) with request
        }
      );
      // Check if the registration was successful
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message); // Show success message
        setInput({ username: "", email: "", password: "" }); // Clear form input
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error(error.response.data.message); // Show error message
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <form
        onSubmit={signupHandler}
        className='shadow-lg flex flex-col gap-5 p-8'
      >
        <div className='my-4 text-center'>
          <h1 className='text-xl font-bold'>LOGO</h1>
          <p className='text-sm'>
            Sign up to see photos and videos from your friends.
          </p>
        </div>
        <div>
          <Label htmlFor='Username' className='mb-1'>
            Username
          </Label>
          <Input
            type='text'
            name='username'
            value={input.username}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label htmlFor='Email' className='mb-1'>
            Email
          </Label>
          <Input
            type='email'
            name='email'
            value={input.email}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label htmlFor='Password' className='mb-1'>
            Password
          </Label>
          <Input
            type='password'
            name='password'
            value={input.password}
            onChange={changeEventHandler}
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className='mr-2 h-2 w-4 animate-spin' />
            Please wait
          </Button>
        ) : (
          <Button type='submit'>Sign Up</Button>
        )}
        <span>
          Already have an account?{" "}
          <Link className='text-blue-500' to='/login'>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
