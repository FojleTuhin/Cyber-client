"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const Page = () => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosPublic
      .get("/getData")
      .then((response) => {
        if (response.data.length > 0) {
          const decryptedData = response.data.map((item) => ({
            ...item,
            decryptedText: decrypt(item.text, "KEY"),
          }));
          setData(decryptedData);
        } else {
          setError("No data found");
        }
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
      });
  };

  const handleAddData = (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    const encrypted = encrypt(text, "KEY");
    console.log("Encrypted:", encrypted);

    const newData = {
      text: encrypted,
    };

    axiosPublic
      .post("/addData", newData)
      .then((response) => {
        console.log(response);
        setError(response.data.message);
        if (response.data.insertedId) {
          fetchData();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data add Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setError("Error adding data: " + error.message);
      });

    e.target.reset();
  };

  // Helper function to convert a character to its numeric value (A=0, B=1, ..., Z=25)
  function charToNum(char) {
    return char.charCodeAt(0) - 65;
  }

  // Helper function to convert a numeric value back to a character
  function numToChar(num) {
    return String.fromCharCode((num % 26) + 65);
  }

  function encrypt(plaintext, key) {
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/[^A-Z]/g, "");
    let cipherText = "";
    let fullKey = key + plaintext;

    for (let i = 0; i < plaintext.length; i++) {
      let plainChar = charToNum(plaintext[i]);
      let keyChar = charToNum(fullKey[i]);
      let encryptedChar = numToChar(plainChar + keyChar);
      cipherText += encryptedChar;
    }

    return cipherText;
  }

  function decrypt(cipherText, key) {
    cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/[^A-Z]/g, "");
    let plaintext = "";
    let fullKey = key;

    for (let i = 0; i < cipherText.length; i++) {
      let cipherChar = charToNum(cipherText[i]);
      let keyChar = charToNum(fullKey[i]);
      let decryptedChar = numToChar((cipherChar - keyChar + 26) % 26);
      plaintext += decryptedChar;
      fullKey += decryptedChar;
    }

    return plaintext;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-4">
        <Link
          href="/signIn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
        >
          Logout
        </Link>
      </div>

      <h1 className="text-2xl text-gray-700 font-bold mb-4 text-center">
        Welcome to Home Page
      </h1>
      <h3 className="text-xl text-gray-700 font-bold mb-4 text-center">
        Auto key cipher
      </h3>

      <div className="flex flex-col gap-20 items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleAddData} className="mb-4">
            <input
              type="text"
              name="text"
              className="border p-2 rounded w-full"
              placeholder="Add a new Data"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
            >
              Add Data
            </button>
          </form>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <ul className="list-disc list-inside">
            {data.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.decryptedText}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
