import React from "react";
import dogImg from "../assets/napuppy.png"; // Replace with your actual image path


export default function NotAuthorized() {
return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
<img
src={dogImg}
alt="Cute Dog - Not Authorized"
className="w-64 h-64 object-contain mb-6"
/>


<h1 className="text-3xl font-bold text-gray-800 mb-2">Not Authorized</h1>
<p className="text-lg text-gray-600">
You are not authorized to access this page.
</p>
</div>
);
}