"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ScrollText, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import setBgGuide from "@/actions/setBgGuide";
import addPositionPaper from "@/actions/addPositionPaper";
import addDelegateResource from "@/actions/addDelegateResource";

// Cloudinary
declare global {
  var cloudinary: any;
}
const cloudName = "dxsogumfq";
const uploadPreset = "Default";

const UploadButton = ({
  type,
  tourneyId,
  committeeId,
  delegateId,
}: {
  type: string;
  tourneyId: string;
  committeeId: number;
  delegateId: string;
}) => {
  // PDF state
  const [paperLink, setPaperLink] = useState<string>("");

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      onSuccess={async (result, { widget }) => {
        // @ts-ignore
        const url = result?.info?.secure_url;

        setPaperLink(url);

        if (type === "position-paper") {
          addPositionPaper(url, tourneyId, committeeId, delegateId);
        }
        if (type === "bg-guide") {
          setBgGuide(url, tourneyId, committeeId);
        }
        if (type === "delegate-resources") {
          // @ts-ignore
          const name = result?.info?.original_filename;

          addDelegateResource(url, name, tourneyId);
        }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
      options={{
        cloudName,
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <>
            {!paperLink && type !== "delegate-resources" && (
              <Button
                variant="ghost"
                onClick={() => open()}
                className="h-auto w-full cursor-pointer hover:opacity-70 transition border-dashed border-2 p-6 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
              >
                <ScrollText size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
              </Button>
            )}
            {!paperLink && type === "delegate-resources" && (
              <Button
              variant="ghost"
              onClick={() => open()}
              className="h-auto w-full cursor-pointer hover:opacity-70 transition border-dashed border-2 p-2 mt-4 border-neutral-300 flex flex-row justify-center items-center gap-4 text-slate-700"
              >
                <Plus size={20} />
                <div className="font-semibold text-lg">Click to upload</div>
              </Button>
            )}
            {paperLink && <p>Paper submitted!</p>}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadButton;
