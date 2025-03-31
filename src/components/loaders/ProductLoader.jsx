import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";


const ProductLoader = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <FaCartShopping  className="w-16 h-16 text-purple-600 animate-bounce" />
      </div>
      <p className="mt-4 text-lg font-semibold text-purple-600">
        Loading{dots}
      </p>
    </div>
  );
};

export default ProductLoader;
