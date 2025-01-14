import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600">
          For any questions or concerns, please reach out to us:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-4">
          <li>Email: support@linktoit.in</li>
          <li>Phone: +91-XXXXXXXXXX</li>
          <li>Address: XYZ Road, ABC City, India</li>
        </ul>
      </div>
    </div>
  );
};

export default page;
