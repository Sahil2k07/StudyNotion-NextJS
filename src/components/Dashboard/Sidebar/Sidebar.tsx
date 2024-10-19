"use client";

import SidebarLink from "@/components/Dashboard/Sidebar/SidebarLink";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { sidebarLinks } from "@/data/dashboard-links";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";

type ConfirmationModalType = {
  text1: string;
  text2: string;
  btn1Handler: () => void;
  btn1Text: string;
  btn2Handler: () => void;
  btn2Text: string;
} | null;

export default function Sidebar() {
  const { data } = useSession();

  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalType>(null);

  return (
    <>
      <aside className="hidden md:flex h-[calc(100vh-3.5rem)]  min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && data?.user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => signOut(),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
