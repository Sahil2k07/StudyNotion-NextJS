"use client";

import IconBtn from "@/components/common/IconBtn";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

type StateVars = {
  loading: boolean;
  imageFile: File | null;
  previewSource: string | null;
  image: string;
};

export default function ChangeProfilePicture() {
  const { data } = useSession();

  const [state, setState] = useState<StateVars>({
    loading: false,
    imageFile: null,
    previewSource: null,
    image: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      previewFile(file);
      setState((prevState) => ({
        ...prevState,
        imageFile: file,
      }));
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setState((prevState) => ({
          ...prevState,
          previewSource: reader.result as string,
        }));
      }
    };
  };

  const handleFileUpload = async () => {
    if (!state.imageFile || !data) return;

    const loading = toast.loading("Updating Picture");
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const formData = new FormData();
      formData.append("displayPicture", state.imageFile);

      console.log(formData);

      // Update display picture
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
      }).then((res) => res.json());

      if (!response.success) {
        toast.dismiss(loading);
        toast.error(response.message);

        return;
      }

      toast.dismiss(loading);
      toast.success("Picture updated successfully");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Problem while updating the picture");
      console.log(error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data?.user.id }),
      }).then((res) => res.json());

      setState({ ...state, image: response.user.image });
    }

    fetchUserDetails();
  }, [data?.user.id]);

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <img
          src={state.previewSource || state?.image}
          alt={`profile-${data?.user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p>Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleClick}
                disabled={state.loading}
                className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={state.loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!state.loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
