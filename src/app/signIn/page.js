"use client";

import { MdOutlineFiberPin } from "react-icons/md";
import logo from "../../../public/logo.png";
import { FaPhoneFlip } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import { useRouter } from "next/navigation";
const Login = () => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

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
      number,
      pin,
    };
    setError("");

    console.log(newAccount);
    axiosPublic
      .post("/login", newAccount)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Log in Successfull",
            showConfirmButton: false,
            timer: 1500,
          });

          router.push('/home');
        } else {
          // setError(data.response.data.message);
          console.log("something wrong");
        }
      })

      .catch((error) => {
        // setError(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[#333] bg-[#f0f0f0]">
      <div className="md:w-[30%] w-full shadow-lg p-5 bg-white">
        <div className="flex  items-center flex-col">
          <Image className="w-[100px]" src={logo} alt="" />
          <p className="font-bold text-2xl">Welcome</p>
        </div>
        <div>
          <p className="font-bold text-xl">Log In</p>
          <p className="text-xl mb-8">to your MFS account</p>

          <form onSubmit={handleSubmit}>
            <p className="text-gray-500">ACCOUNT NUMBER</p>
            <div className="flex gap-5 items-center">
              <FaPhoneFlip className="text-green-500" />
              <input
                className="p-3 border-b-2 bg-[#fff]  border-green-500 w-full"
                required
                type="text"
                name="number"
                placeholder="Enter your account number"
              />
            </div>

            <p className="text-gray-500 mt-8">MFS PIN</p>
            <div className="flex gap-5 items-center">
              <MdOutlineFiberPin className="text-green-500" />
              <input
                className="p-3 border-b-2 bg-[#fff] border-green-500 w-full"
                required
                type="password"
                placeholder="Enter MFS PIN"
                name="pin"
              />
            </div>

            <br />
            <p className="mb-2 text-red-500 text-center">{error}</p>

            <div className="flex justify-center">
              {
                <button
                  className="btn border-green-500 border-2 px-10 py-2 rounded-full "
                  type="submit"
                >
                  LOGIN
                </button>
              }
            </div>
            <div className="text-center mt-5">
              <p>Not registered yet?</p>
              <Link href="/signUp">
                <p className="font-bold">Open new account</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
