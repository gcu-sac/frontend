import { UserContext } from "@/app/context/user";
import Image from "next/image";
import { useContext } from "react";
import userImage from "../../public/user-profile.png";

const UserIcon = () => {
  const { user } = useContext(UserContext);

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image src={userImage} alt="user image" width={100} height={100} />
    </div>
  );
};

export default UserIcon;
