"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ScrollText } from "lucide-react";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { Button } from "./ui/button";

// Cloudinary
declare global {
  var cloudinary: any;
}

const cloudName = "dxsogumfq";
const uploadPreset = "Default";

// react-pdf config
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

const PaperUpload = () => {
  // PDF URL state
  const [paperLink, setPaperLink] = useState<any>();

  // PDF display states
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      onSuccess={(result, { widget }) => {
        // @ts-ignore
        setPaperLink(result?.info?.secure_url);
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
            <Button
              variant="ghost"
              onClick={() => open()}
              className="relative h-auto cursor-pointer hover:opacity-70 transition border-dashed border-2 p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            >
              <ScrollText size={50} />
              <div className="font-semibold text-lg">{paperLink ? "Upload another paper" : "Click to upload"}</div>
            </Button>
            {paperLink && (
              <div
                ref={setContainerRef}
                className="inset-0 w-full h-full"
              >
                <Document
                  file={paperLink}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={options}
                >
                  {Array.from(new Array(numPages), (_el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={
                        containerWidth
                          ? Math.min(containerWidth, maxWidth)
                          : maxWidth
                      }
                    />
                  ))}
                </Document>
              </div>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default PaperUpload;
