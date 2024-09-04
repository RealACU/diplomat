import Image from "next/image";

const ProfileBar = ({
  profileImageUrl,
  username,
  emailAddress,
  phoneNumber,
}: {
  profileImageUrl: string;
  username?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
}) => {
  return (
    <div className="h-full w-full p-2 flex rounded-md">
      <Image
        src={profileImageUrl}
        alt="User picture"
        height={60}
        width={60}
        className="rounded-full"
      />
      <div className="flex flex-col pl-4 items-start">
        <p className="text-sm text-slate-500 font-bold">
          Name: {username ? username : "N/A"}
        </p>
        <p className="text-sm text-slate-500">
          Email: {emailAddress ? emailAddress : "N/A"}
        </p>
        <p className="text-sm text-slate-500">
          Phone: {phoneNumber ? phoneNumber : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProfileBar;
