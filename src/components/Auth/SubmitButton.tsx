"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900"
      disabled={pending}
    >
      {pending ? (
        <div className="flex text-pink-400 justify-center items-center gap-2">
          Processing
          <div className="rounded-md h-4 w-4 border-2 border-t-2 border-pink-400 animate-spin "></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
