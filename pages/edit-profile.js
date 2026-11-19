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
    <section className="min-h-[65vh] bg-canvas px-4 py-12 text-ink sm:px-6">
      <div className="mx-auto max-w-2xl rounded border border-[var(--color-border)] bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="mb-8 text-3xl font-bold text-ink">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="profile-name" className="mb-2 block font-semibold text-muted">Name</label>
            <input
              id="profile-name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded border border-[var(--color-border)] bg-canvas p-3 text-ink"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="mb-2 block font-semibold text-muted">Email</label>
            <input
              id="profile-email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded border border-[var(--color-border)] bg-canvas p-3 text-ink"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-[var(--color-primary)] py-3 font-semibold text-[var(--color-on-forest)] shadow-sm hover:opacity-90"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
