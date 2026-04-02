import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 Characters"),
    email: z.string().email("Invalid Email"),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Must include uppercase letter")
      .regex(/[0-9]/, "Must include number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = async (data) => {
    console.log(data);

    //call backend api

    reset(); // clear form data
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register Page</h1>
        {/* Name */}
        <div>
          <input {...register("name")} placeholder="Name" />
          <p>{errors.name?.message}</p>
        </div>
        {/* Email */}
        <div>
          <input {...register("email")} placeholder="Email" />
          <p className="bg-red-300">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <input {...register("password")} placeholder="Password" />
          <p>{errors.password?.message}</p>
        </div>

        {/* confirm password */}
        <div>
          <input
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          <p>{errors.confirmPassword?.message}</p>
        </div>
        <button
          disabled={!isValid || isSubmitting}
          className={`px-4 py-2 rounded text-white ${
            !isValid || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
