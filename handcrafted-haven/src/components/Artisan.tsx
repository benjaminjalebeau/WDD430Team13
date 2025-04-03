import React from "react";

interface ArtisanProps {
  name: string;
  photoURL?: string; 
}

const Artisan: React.FC<ArtisanProps> = ({ name, photoURL }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 mb-2">
        <img
          src={photoURL || "/placeholder-profile.jpg"} 
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-800">{name}</h3>
    </div>
  );
};

export default Artisan;
