import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";


const Logo = () => {
  const [text, setText] = useState("AS");

  const handleHover = () => {
    setText((prevText) => (prevText === "AS" ? "ID" : "AS"));
  };

  const handleHoverEnd = () => {
    setText("AS");
  };

  return (
    <div className="flex item-center justify-center mt-2">
      <motion.div
        onClick={(e) => e.preventDefault()}
        className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full text-2xl font-light"
        style={{ boxShadow: "0px 5px 15px -3px rgba(0, 0, 0, 0.9)" }}
                whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.5, ease: "easeInOut" },
          backgroundColor: [
            "#000",
            "#1d3557",
            "#f1faee",
            "#a8dadc",
            "#457b9d",
            "#ffff00",
            "#e63946",
          ],
        }}
        onMouseEnter={handleHover}
        onHoverEnd={handleHoverEnd}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default Logo;
