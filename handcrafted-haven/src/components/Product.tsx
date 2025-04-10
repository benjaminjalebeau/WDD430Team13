import React from "react";
import { ProductProps } from "@/app/lib/definitions";



const Product: React.FC<ProductProps> = ({ name, description, price, for_sale, image_url }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <img
        src={image_url || "/placeholder-item.png"} // Use a placeholder if no image is provided
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3> 
      <p className="text-sm text-gray-600 mb-2">{description}</p> 
      <p className="text-sm text-gray-800 font-medium">${price.toFixed(2)}</p>
      <p
        className={`mt-2 text-sm font-medium ${
          for_sale ? "text-green-600" : "text-red-600"
        }`}
      >
        {for_sale ? "Available for Sale" : "Not for Sale"}
      </p>
    </div>
  );
};

export default Product;