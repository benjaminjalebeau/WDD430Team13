import React from "react";

interface ProductProps {
  description: string;
  price: number;
  forSale: boolean;
  imageURL: string;
}

const Product: React.FC<ProductProps> = ({ description, price, forSale, imageURL }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <img
        src={imageURL || "/placeholder-item.png"} // Use a placeholder if no image is provided
        alt={description}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{String(description)}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <p
        className={`mt-2 text-sm font-medium ${
          forSale ? "text-green-600" : "text-red-600"
        }`}
      >
        {forSale ? "Available for Sale" : "Not for Sale"}
      </p>
    </div>
  );
};

export default Product;