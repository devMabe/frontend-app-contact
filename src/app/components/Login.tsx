"use client";

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { URL_LOGIN } from "../utils/constans";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (formData) => {
    axios
      .post(URL_LOGIN, formData)
      .then((response) => {
        setData(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("data", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (data) {
    location.replace("/");
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Inicia sesión con tu cuenta
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        {...register("email", {
                          required: "El correo electrónico es requerido",
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-600"
                        }`}
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            email: event.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        {errors.email
                          ? errors.email.message
                          : "Correo electrónico"}
                        {errors.email?.type === "pattern" && (
                          <p>Ingresa una dirección de correo valida</p>
                        )}
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        {...register("password", {
                          required: "La contraseña es requerida",
                        })}
                        autoComplete="off"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        pattern=".{6,}"
                        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-600"
                        }`}
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            password: event.target.value,
                          })
                        }
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={handleShowPassword} className="">
                          {showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </button>
                      </div>

                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        {errors.password
                          ? errors.password.message
                          : "Contraseña"}
                      </label>
                    </div>
                    <div className="relative">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Iniciar sesión
                      </button>
                    </div>
                    <div className="relative">
                      ¿No tienes cuenta?{" "}
                      <Link
                        className="bg-blue-500 text-white rounded-md px-2"
                        href="/register"
                      >
                        Registrate aquí
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
