import Image from "next/image";
import { useState } from "react";
import { FileViewPage } from "./file-view-page";
import { useUploadStatus } from "./hooks/use-upload-status";
 
const UploadPage = () => {
    const {uploadStatus,onUploading}  = useUploadStatus()
    const [file, setFile] = useState<File | null>(null);
   

    const fileInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            onUploading()
            setFile(uploadedFile);
        }
    }
    return (
        <div className="flex w-full items-center justify-center">
            {
                (uploadStatus === "uploading" || uploadStatus==="uploaded")&& (
                    <FileViewPage
                        file={file}
                    />
                )
            }
          
            {uploadStatus ==="idle" &&    (
                <div style={{ width: "275px", height: "350px"}} className="relative text-center">
                    <input className="cursor-pointer hidden" type="file" id="input-file-upload" accept=".pdf" onChange={fileInfoChange}></input>
                    <label style={{border: "1px dashed #d1d5db", backgroundColor: "white", borderRadius: "0.375rem",height: '100%' }} className="flex items-center justify-center transition-all"  htmlFor="input-file-upload">
                        <div className="cursor-pointer flex flex-col items-center space-y-3">
                        <Image src="/cloud.svg" height={30} width={30} alt="upload"/>
                        <p style={{marginTop: '10px'}} className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">Click to upload or drag and drop</p>
                    </div>
                
                </label>
            </div>  
                )
            }
                
        </div>
    );
};

export default UploadPage;
