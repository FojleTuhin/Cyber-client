"use client";

import Link from "next/link";
import { useState } from "react";
import { FaPhoneFlip } from "react-icons/fa6";
import {
  MdEmail,
  MdOutlineDriveFileRenameOutline,
  MdOutlineFiberPin,
} from "react-icons/md";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";    

const Register = () => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const Router = useRouter();       

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const number = e.target.number.value;
    // const pin = e.target.pin.value;
    const rsaPin = e.target.pin.value;

 
    if (!/^\d{5}$/.test(rsaPin)) {
      setError("Password must be 5 digit");
      return;
    }

    function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    return result;
  }
  
  // Helper function to find modular multiplicative inverse
  function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  }
  
  // RSA key generation (using hard-coded values)
  const p = 991; // Prime number
  const q = 101; // Another prime number
  const n = p * q; // Modulus
  const phi = (p - 1) * (q - 1); // Euler's totient
  const pe = 17; // Public exponent (usually 65537, but using a smaller value for demonstration)
  const d = modInverse(pe, phi); // Private exponent
  
  
  // Encryption function
  function encrypt(rsaPin) {
    return modPow(rsaPin, pe, n);
  }
  
  // Decryption function
//   function decrypt(ciphertext) {
//     return modPow(ciphertext, d, n);
//   }
  
  const pin = encrypt(rsaPin);
  
//   const decrypted = decrypt(encrypted);
//   console.log("Decrypted message:", decrypted);
  


    const newAccount = {
      name,
      email,
      number,
      pin,
    };
    setError("");
    console.log(newAccount);

    axiosPublic.post('/user', newAccount)
        .then(data => {
            console.log(data);
            setError(data.data.message);
            if (data.data.insertedId) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign Up Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });


            //  redirect('/home');
            Router.push('/home');   

            }

           

        })

    setError('');
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-[#f0f0f0] text-[#333]">
      <div className="md:w-[30%] w-full shadow-lg p-5 bg-white">
        <div>
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl text-center ">Register now</p>
            <hr className="mb-5 border-2 border-green-500 w-[50%] " />
          </div>

          <form onSubmit={handleSubmit}>
            <p className="text-gray-500">Name</p>
            <div className="flex gap-5 items-center">
              <MdOutlineDriveFileRenameOutline className="text-green-500" />
              <input
                className="p-3 border-b-2 bg-stone-50  border-green-500 w-full"
                name="name"
                type="text"
                placeholder="Enter your Name"
                required
              />
            </div>

            <p className="text-gray-500 mt-8">Email</p>
            <div className="flex gap-5 items-center">
              <MdEmail className="text-green-500" />
              <input
                className="p-3 border-b-2 bg-stone-50  border-green-500 w-full"
                name="email"
                type="email"
                placeholder="Enter your Email"
                required
              />
            </div>

            <p className="text-gray-500 mt-8">ACCOUNT NUMBER</p>
            <div className="flex gap-5 items-center">
              <FaPhoneFlip className="text-green-500" />
              <input
                className="p-3 border-b-2 bg-stone-50  border-green-500 w-full"
                type="text"
                name="number"
                placeholder="Enter your account number"
                required
              />
            </div>

            <p className="text-gray-500 mt-8">MFS PIN</p>
            <div className="flex gap-5 items-center">
              <MdOutlineFiberPin className="text-green-500" />
              <input
                className="p-3 border-b-2 bg-stone-50 border-green-500 w-full"
                type="password"
                placeholder="Enter MFS PIN"
                name="pin"
                required
              />
            </div>

            <br />

            <p className="mb-2 text-red-500 text-center">{error}</p>

            <div className="flex justify-center">
              <button
                className="btn border-green-500 border-2 px-10 py-2 rounded-full "
                type="submit"
              >
                REGISTER
              </button>
            </div>
            <div className="text-center mt-5">
              <p> registered yet?</p>
              <Link href="/signIn">
                <p className="font-bold">LOGIN</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
