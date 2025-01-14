import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600">
          By using LinkToIt, you agree to these terms and conditions. Please
          read them carefully.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">
          Usage Guidelines
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Users must provide accurate information.</li>
          <li>Misuse of the platform is prohibited.</li>
        </ul>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">
          Payment Terms
        </h2>
        <p className="text-gray-600">
          All payments are final and non-transferable.
        </p>
      </div>
    </div>
  );
};

export default page;
