"use client"

import dynamic from "next/dynamic";

// Dynamically import PdfViewerComponent with SSR disabled
const UploadComponent = dynamic(() => import("@/features/upload-page"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full mx-auto py-20 space-y-5 bg-[#f7f5ee]">
       <div className="flex flex-col text-center !mb-10 space-y-5">
          <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
          <p className="mt-2 text-gray-600 max-w-lg mx-auto">Simply click on a page to rotate it. You can then download your modified PDF.</p>
       </div>
     
       <UploadComponent/>
       <div className="flex flex-wrap justify-center"></div>
    </div>
  );
}
