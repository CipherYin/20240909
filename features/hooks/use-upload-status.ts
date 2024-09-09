import {create} from "zustand";

type UploadStatus = {
    uploadStatus: string,
    onUploaded: () => void;
    onUploading: () => void;
    onUploadIdle: () => void;
}

export const useUploadStatus = create<UploadStatus>((set) => ({
    uploadStatus: "idle",
    onUploaded: () => {
        console.log("onUploaded called");
        set({ uploadStatus: "uploaded" });
      },
    onUploading: () => set({uploadStatus: "uploading"}),
    onUploadIdle: () => set({uploadStatus: "idle"})
}))