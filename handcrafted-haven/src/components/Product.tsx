import React from "react";
import Link from "next/link";
import { ProductProps } from "@/app/lib/definitions";


//I added the id so I could include it in the <Link> and send the user to the correct productID review page
// in order to add this id in the props here I had to add it in the Product.tsx component and the ProductProps
const Product: React.FC<ProductProps> = ({ id, product_name, description, price, for_sale, image_url, artisan_name, formattedDate }) => {
  return (
    // this is the <Link> that I added
    
      <div className="border rounded-lg shadow-md p-4 bg-white relative">
        <img
          src={image_url || "/placeholder-item.png"} // Use a placeholder if no image is provided
          alt={product_name}
          className="w-full h-48 object-cover rounded-md mb-1"
        />
        <div className="flex justify-between">
          <p className="text-right text-xs italic text-gray-500"> Listed: {formattedDate}</p>
          <p className="text-right text-xs italic text-gray-500">By: {artisan_name}</p>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product_name}</h3> 
        <p className="text-sm text-gray-600 mb-2">{description}</p> 
        <p className="text-sm text-gray-800 font-medium">${price.toFixed(2)}</p>
        <div className="flex justify-between">
          <p
            className={`mt-2 text-sm font-medium ${
              for_sale ? "text-green-600" : "text-red-600"
            }`}
          >
            {for_sale ? "Available for Sale" : "Not for Sale"} 
          </p>
          
          
            <Link href={`/products/${id}/review/`} className="mt-2 text-sm font-medium bg-[] text-[#023047] hover:text-[#219EBC] transition ">
              View Reviews
            </Link>
          
        </div>
      </div>
    
  );
};

export default Product;