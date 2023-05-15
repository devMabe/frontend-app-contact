"use client";

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { URL_REGISTER } from "../utils/constans";
import Link from "next/link";
import { comparePassword } from "../utils/functions";

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [data, setData] = useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (comparePassword(formData.password, formData.confirmPassword)) {
      axios
        .post(URL_REGISTER, formData)
        .then((response) => {
          setData(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("data", JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        alert('Error, las contraseñas no coinciden')
    }
  };

  if (data) {
    location.replace("/");
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Crea tu cuenta facilmente
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="firstname"
                        name="firstName"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Nombre"
                        value={formData.firstName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            firstName: event.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="firstname"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Nombre
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            lastName: event.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Apellido
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                        Correo electrónico
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            password: event.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Contraseña
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Confirma tu contraseña"
                        value={formData.confirmPassword}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            confirmPassword: event.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="confirmpassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Confirma tu contraseña
                      </label>
                    </div>
                    <div className="relative">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Registrarse
                      </button>
                    </div>
                    <div className="relative">
                      ¿ Ya tienes una cuenta ?{" "}
                      <Link
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                        href="/login"
                      >
                        Inicia sesión
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
