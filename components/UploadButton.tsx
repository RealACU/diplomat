"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ScrollText, Plus, FileUp, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import setBgGuide from "@/actions/setBgGuide";
import addPositionPaper from "@/actions/addPositionPaper";
import addDelegateResource from "@/actions/addDelegateResource";
import { getBgGuideLink } from "@/actions/getBgGuide";
import { getPositionPaperLink } from "@/actions/getPositionPaper";
import { useUser } from "@clerk/clerk-react";

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
  text = "Click to upload",
  textAfterUpload = "Upload",
  size = 6,
  ml = "auto",
  onUploadComplete,
}: {
  type: string;
  tourneyId: string;
  committeeId: number;
  delegateId: string;
  text?: string;
  textAfterUpload?: string;
  size?: number;
  ml?: string;
  onUploadComplete?: () => void; 
}) => {
  // PDF state
  const [paperLink, setPaperLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useUser();

  if (!user) {
    console.error("Please Sign in");
    return <div>Please sign in to upload files.</div>;
  }

  useEffect(() => {
    const loadLink = async () => {
      try {
        let link: string | undefined;
        if (type === "bg-guide") {
          link = await getBgGuideLink(committeeId, tourneyId);
        } else if (type === "position-paper") {
          link = await getPositionPaperLink(committeeId, tourneyId, user.id);
        }

        if (link) {
          setPaperLink(link);
        }
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${type} link:`, error);
        setLoading(false);
      }
    };

    loadLink();
  }, [type, committeeId, tourneyId]); 

  useEffect(() => {
    // Notify the parent if paperLink is already set on load
    if (paperLink !== "" && paperLink !== null && onUploadComplete) {
      onUploadComplete();
    }
  }, [paperLink, onUploadComplete]);

  const handleUploadSuccess = async (result: any) => {
    const url = result?.info?.secure_url;
    setPaperLink(url);

    if (onUploadComplete) {
      onUploadComplete();
    }

    if (type === "position-paper") {
      addPositionPaper(url, tourneyId, committeeId, delegateId);
    } else if (type === "bg-guide") {
      setBgGuide(url, tourneyId, committeeId);
    } else if (type === "delegate-resources") {
      const name = result?.info?.original_filename;
      addDelegateResource(url, name, tourneyId);
    }
  };

  const handleDeleteLink = async () => {
    setPaperLink("");
    
    try {
      if (type === "position-paper") {
        await addPositionPaper("", tourneyId, committeeId, delegateId);
      } else if (type === "bg-guide") {
        await setBgGuide("", tourneyId, committeeId);
      }
  
      if (onUploadComplete) {
        onUploadComplete(); 
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }  
  };

  const handleOpenLink = () => {
    if (paperLink) {
      window.open(paperLink, "_blank");
    }
  };

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      onSuccess={handleUploadSuccess}
      options={{
        cloudName,
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <>
            {paperLink === "" && type !== "delegate-resources" && (
              <Button
                variant="ghost"
                onClick={() => open()}
                className={`h-auto flex-grow flex justify-center items-center border-[1px] duration-200 text-center py-2 -my-2 rounded-sm shadow-sm px-3 cursor-pointer transition-all ${
                  loading 
                  ? "bg-slate-300 hover:bg-slate-350 border-slate-350 opacity-25" 
                  : "bg-[#c67171] hover:bg-[#ad5454] border-[#ad5454]"
                }`}
              >
                <div className="font-medium text-base break-words">{text}</div>
                <FileUp className={`w-${size} h-${size} ml-${ml}`} />
              </Button>
            )}
            {paperLink === "" && type === "delegate-resources" && (
              <Button
              variant="ghost"
              onClick={() => open()}
              className="h-auto w-full cursor-pointer hover:opacity-70 border-dashed border-2 p-2 mt-4 border-neutral-300 flex flex-row justify-center items-center gap-4 text-slate-700 transition-all duration-200"
              >
                <Plus size={20} />
                <div className="font-semibold text-lg">Upload Resources</div>
              </Button>
            )}
            {paperLink !== "" && paperLink !== null && type !== "delegate-resources" && (
              <div className="h-auto flex-grow flex items-center">
                <div 
                  className="h-full p-[9px] rounded-sm mr-1 border-[1px] border-periwinkle-200 bg-periwinkle-50 hover:bg-periwinkle-200 aspect-square items-center justify-center duration-200 cursor-pointer"
                  onClick={handleOpenLink}
                >
                  <Eye className={`w-${size} h-${size} ml-auto`}/>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => open()}
                  className={`w-full justify-center items-center border-[1px] duration-200 text-center py-2 -my-2 rounded-sm shadow-sm px-3 cursor-pointer transition-all ${
                    loading 
                    ? "bg-slate-300 hover:bg-slate-350 border-slate-350 opacity-25" 
                    : "bg-[#8CB97A] hover:bg-[#6DA058] border-[#6DA058]"
                  }`}
                >
                  <div className="font-medium text-base break-words">{textAfterUpload}</div>
                  <FileUp className={`w-${size} h-${size} ml-${ml}`} />
                </Button>
                <div 
                  className="h-full p-[9px] rounded-sm ml-1 border-[1px] border-[#ad5454] bg-[#c67171] hover:bg-[#ad5454] aspect-square items-center justify-center duration-200 cursor-pointer"
                  onClick={handleDeleteLink} 
                >
                  <Trash2 className={`w-${size} h-${size} ml-auto`}/>
                </div>
              </div>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadButton;
