
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { AuthContext } from "@/Context/AppContext";

//registration schema
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Maximum length for password is less than 20")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must include special character"),

  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword,{
  message:"Passwords do not match",
  path:["confirmPassword"]
})

const Register = () => {
 
  const navigate = useNavigate();
  const {registerAdmin} = useContext(AuthContext);
  //react hook form
  const {register, handleSubmit, reset, formState:{errors, isSubmitting, isValid}} = useForm({
  resolver: zodResolver(registerSchema),
  mode: "onChange"
});

  //handle submit
  const onSubmit = async(data) =>{
    console.log(data);
    
    //simulate api
    const {name, email, password} = data;
    const result = await registerAdmin(name, email, password)
    
    if(result.success === true){
      navigate("/login")
    }
    else{
      
    //reset the form
    reset()
    }
  }

  //password show or not show
  const [show, setShow] = useState(false);
  const toggle = (e) =>{
    e.preventDefault()
    setShow(!show)
  }
//<form onSubmit={handleSubmit(onSubmit)}></form>
  return <div className="min-h-screen bg-navy flex items-center justify-center">

    
  <div className="w-full max-w-lg px-4 sm:px-6 lg:px-8 py-8 bg-navy-card border-navy-border rounded-lg">

      {/* header */}
      <div className="mb-3 flex items-center justify-around">
        <div className="bg-gold p-2 rounded-sm">SEC </div>
        <div>
          <h1 className="text-text-base">Create your account</h1>
        <h2 className="text-text-muted">Sylhet Engineering College</h2>
        </div>
        
      </div>

     <div className="bg-navy-card">
       
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* name */}
        <div>
          <h1 className="text-text-muted text-sm mb-0.5">Full Name</h1>
          <input
            type="text"
            
            {...register("name")}
            className="w-full px-4 py-2  rounded-sm bg-navy-elevated focus:outline-none focus:ring-1 focus:ring-gold text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        {/* email */}
        <div className="mt-5">
          <h1 className="text-text-muted text-sm mb-0.5">Email Address</h1>
          <input
            type="text"
            
            {...register("email")}
            className="w-full px-4 py-2  rounded-sm bg-navy-elevated focus:outline-none focus:ring-1 focus:ring-gold text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* password */}
              <div className="mt-5">
  <h1 className="text-text-muted text-sm mb-0.5">
     Password
  </h1>

  <div className="relative">
    {/* Input */}
    <input
      type={show ? "text" : "password"}
      {...register("password")}
      className="w-full px-4 py-2 pr-16 rounded-sm bg-navy-elevated 
                 focus:outline-none focus:ring-1 focus:ring-gold text-white"
    />

    {/* Button inside input */}
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 
                 text-sm text-gray-400 hover:text-white"
    >
      {show ? "Hide" : "Show"}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password.message}
    </p>
  )}
</div>
     
        {/* Confirm Password */}
        <div className="mt-5">
  <h1 className="text-text-muted text-sm mb-0.5">
    Confirm Password
  </h1>

  <div className="relative">
    {/* Input */}
    <input
      type={show ? "text" : "password"}
      {...register("confirmPassword")}
      className="w-full px-4 py-2 pr-16 rounded-sm bg-navy-elevated 
                 focus:outline-none focus:ring-1 focus:ring-gold text-white"
    />

    {/* Button inside input */}
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 
                 text-sm text-gray-400 hover:text-white"
    >
      {show ? "Hide" : "Show"}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmPassword.message}
    </p>
  )}
</div>
  <button
          disabled={!isValid || isSubmitting}
          className={`px-4 py-2 rounded text-black w-full mt-5 ${
            !isValid || isSubmitting
  ? "bg-gold/50 text-muted-foreground cursor-not-allowed"
  : "bg-gold hover:bg-gold/90"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>

        {/* Already have an account */}
        <p className="text-text-muted text-sm text-center mt-4">
  Already have an account?{" "}
  <Link to="/login" className="text-gold hover:underline">
    Login
  </Link>
</p>
      </form>
     </div>

    </div>
  </div>
};

export default Register;
