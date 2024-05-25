import Image from "next/image";

const ProfileBar = ({
  profileImageUrl,
  username,
  emailAddress,
  phoneNumber,
}: {
  profileImageUrl: string;
  username: string | null;
  emailAddress: string | null;
  phoneNumber: string | null;
}) => {
  return (
    <div className="flex bg-blue-300 rounded-md">
      <Image
        src={profileImageUrl}
        alt="User picture"
        height={100}
        width={100}
      />
      <div className="flex flex-col">
        <p>Name: {username ? username : "N/A"}</p>
        <p>Email: {emailAddress ? emailAddress : "N/A"}</p>
        <p>Phone: {phoneNumber ? phoneNumber : "N/A"}</p>
      </div>
    </div>
  );
};

export default ProfileBar;
