import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Shipping and Delivery Policy
        </h1>
        <p className="text-gray-600">
          LinkToIt deals with digital products, so no physical shipping is
          required. Services are accessible immediately upon successful payment.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">Delays</h2>
        <p className="text-gray-600">
          In case of technical issues, please contact our support team for
          resolution.
        </p>
      </div>
    </div>
  );
};

export default page;
