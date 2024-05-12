import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border">
      {children}
    </div>
  );
};

export default Card;