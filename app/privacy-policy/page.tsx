import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600">
          At LinkToIt, your privacy is important to us. This Privacy Policy
          outlines how we collect, use, and protect your personal information.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Personal details (name, email, contact information).</li>
          <li>Payment information for transactions.</li>
          <li>Usage data for improving our services.</li>
        </ul>
        <h2 className="text-lg font-semibold text-gray-800 mt-6">
          Data Protection
        </h2>
        <p className="text-gray-600">
          We implement strict security measures to protect your data and comply
          with legal regulations.
        </p>
      </div>
    </div>
  );
};

export default page;
