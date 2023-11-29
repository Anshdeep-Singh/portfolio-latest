"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { set } from "firebase/database";


const QrComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrSrc, setQrSrc] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setShowQRCode(false);
    setQrSrc("")
    console.log(inputValue);
    try {
        const docRef = doc(db, "SearchCollection", "searches");
  
          await updateDoc(docRef, {
            inputs: arrayUnion(inputValue)
          });
        
      } catch (err) {
        console.error("Error updating document:", err);
      }

    setQrSrc("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(inputValue));
    setShowQRCode(true);
    setInputValue("");
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1 }}
        className="min-w-[70vw] flex flex-col justify-between z-50 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400/90 dark:bg-white/75 rounded-lg backdrop-blur-md py-32"
      >
        <div className="flex flex-row md:flex-col justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Text/Link/Contact"
            value={inputValue}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full text-base sm:w-[33vw] md:text-xs sm:px-1 xs:text-[10px]"
          />
          <button
            onClick={handleButtonClick}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none text-base focus:shadow-outline w-full md:w-auto md:text-xs xs:text-[10px]"
          >
            Generate QR Code
          </button>
        </div>
        {showQRCode && (
          <div className="m-4 p-4">
            <Image src={qrSrc} alt="QR Code" width={150} height={150} className="sm:w-[100px] sm:h-[100px] shadow-xl rounded-sm" />
          </div>
        )}{" "}
      </motion.div>
    </>
  );
};

export default QrComponent;
