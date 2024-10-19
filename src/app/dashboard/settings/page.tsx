import ChangeProfilePicture from "@/components/Dashboard/settings/ChangeProfilePicture";
import DeleteAccount from "@/components/Dashboard/settings/DeleteAccount";
import EditProfile from "@/components/Dashboard/settings/EditProfile";
import UpdatePassword from "@/components/Dashboard/settings/UpdatePassword";

export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-medium mb-14 text-richblack-5">
        Edit Profile
      </h1>

      <ChangeProfilePicture />

      <EditProfile />

      <UpdatePassword />

      <DeleteAccount />
    </div>
  );
}
