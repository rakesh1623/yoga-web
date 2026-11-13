import React, { useState } from "react";
import { useRouter } from "next/router";

const EditProfile = () => {
  const router = useRouter();
  const { email, name } = router.query; 

  const [updatedName, setUpdatedName] = useState(name || "");
  const [updatedEmail, setUpdatedEmail] = useState(email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("/api/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        name: updatedName,
        email: updatedEmail,
      }),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
      router.push("/myAccount");
    } else {
      alert("Failed to update profile. Try again.");
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
