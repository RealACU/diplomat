"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { updateUserMetadata } from "@/actions/updateUserMetadata";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

function SchoolAffiliationPage() {
  const router = useRouter();
  const [schoolAffiliation, setSchoolAffiliation] = useState("");
  const { user, isLoaded } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    const result = await updateUserMetadata(user.id, schoolAffiliation);

    if (result.success) {
      Swal.fire({
        title: "Success!",
        text: "Did it without a hitch",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'bg-periwinkle-100 hover:bg-periwinkle-200 text-white',
        },
      });
      router.push('/');
    } else {
      console.error("Error updating user metadata:", result.error);
      alert("Failed to update school affiliation. Please try again.");
    }
  };

  if (!isLoaded) {
    return <div className="mt-12">Loading...</div>;
  }

  return (
    <div className="bg-stone-50 w-96 rounded-2xl py-7 drop-shadow-xl mt-16 mb-20 flex justify-center text-center border border-gray-300">
      <form onSubmit={handleSubmit} className="w-full mx-10">
        <h3 className="font-bold text-lg text-gray-800">
          Additional Details
          <p className="font-light text-sm text-gray-500">You're almost there!</p>
        </h3>
        <div className="my-8">
          <p className="text-start text-sm mx-0.5 mb-1">School Name</p>
          <Input
            className="h-auto w-full border border-gray-300 drop-shadow-sm rounded-md py-2 px-3 text-xs bg-stone-50 focus:outline-none transition-all duration-200 focus-visible:ring-gray-200"
            type="text"
            id="schoolAffiliation"
            value={schoolAffiliation}
            onChange={(e) => setSchoolAffiliation(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit"
          className="text-sm bg-gradient-to-t from-gray-800 to-gray-700 hover:bg-gradient-to-b text-white rounded-md py-1.5 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SchoolAffiliationPage;
