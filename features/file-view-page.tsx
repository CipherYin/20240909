import { Loader2, ZoomIn, ZoomOut } from "lucide-react"
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useUploadStatus } from "./hooks/use-upload-status";
import { pdfjs } from 'react-pdf';
import { Hint } from "@/components/hint";
import { degrees, PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver'; 
type FileViewPageProps = {
    file: File | null,
}
export const FileViewPage = ({
    file
}: FileViewPageProps
) => { 
    console.log("file: ")
    console.log(file)
    
    const { uploadStatus, onUploaded,onUploadIdle} = useUploadStatus();
    const [scale, setScale] = useState(1); 
    const maxScale = 2; 
    const minScale = 0.5;
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageRotations, setPageRotations] = useState<number[]>([]);


    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        console.log(`//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`)
    }, []);
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageRotations(new Array(numPages).fill(0)); 
        onUploaded();
    };

    const rotatePage = (index:number) => {
        setPageRotations((prevRotations) =>
          prevRotations.map((rotation, i) =>
            i === index ? (rotation + 90) % 360 : rotation
          )
        );
      };
    const rotateAllPages = () => {
        setPageRotations((prevRotations) =>
        prevRotations.map((rotation) => (rotation + 90) % 360)
        );
    };
    const handleRemovePDF = () => {
        onUploadIdle()
    }

    const handleZoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + 0.1, maxScale));
    };

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.1, minScale));
    };
   

    const downloadRotatedPdf = async () => {
        if(file){
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
                pdfDoc.getPages().forEach((page, index) => {
              const rotationAngle = pageRotations[index];
              if (rotationAngle) {
                page.setRotation(degrees(rotationAngle));
            }
            });
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const originalFileName = file.name.split('.').slice(0, -1).join('.'); // 移除文件扩展名
            const fileName = `${originalFileName}(pdf.ai-rotated).pdf`
            saveAs(blob, fileName);
        }
        
      };
    
    return (
        <div className="flex w-full flex-col justify-center items-center"> 
                {uploadStatus === "uploading" && (
                        <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin text-gray-500"/>
                        </div>
                        )
                }
                {uploadStatus === "uploaded" && (
                    <div className="flex space-x-3">
                        <button className="bg-[rgb(255,97,47)] px-3 py-2 text-white rounded-md cursor-pointer" onClick={rotateAllPages}> Rotate all</button>
                        <Hint 
                            lable="Remove this PDF and select a new one" 
                            side="top" 
                            sideOffset={10}>
                            <button className="bg-[#1f2937] px-3 py-2 text-white rounded-md cursor-pointer" onClick={handleRemovePDF}>Remove PDF</button>
                        </Hint>
                        <Hint 
                            lable="Zoom in" 
                            side="top" 
                            sideOffset={10}>
                            <button  className="bg-[#ffffff] p-2 rounded-full cursor-pointer hover:scale-105 shadow-lg" onClick={handleZoomIn}>
                                <ZoomIn className="h-5 w-5"/>
                            </button>
                        </Hint>
                        <Hint 
                            lable="Zoom out" 
                            side="top" 
                            sideOffset={10}>
                            <button className="bg-[#ffffff] p-2 rounded-full cursor-pointer hover:scale-110 shadow-lg" onClick={handleZoomOut}>
                            <ZoomOut className="h-5 w-5"/>
                        </button>
                        </Hint>
                        
                    </div>
                )}
                

                <div className="my-8 w-full">
                    <Document
                            className="display-none"
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<div></div>} 
                    >
                            <div className="w-full flex flex-wrap justify-center px-20">
                                {Array.from(new Array(numPages), (el, index) => (
                                    <>
                                        <button
                                                style={{ width: `${220 * scale}px`, height: `${310 * scale}px` }}
                                                key={`page_${index + 1}`} 
                                                className="relative bg-[#ffffff] px-4 hover:bg-gray-50 shadow-md m-3 max-w-[500px] flex-shrink-0 grow-0" 
                                                onClick={() => rotatePage(index)}>
                                                <button className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white">
                                                    <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z">
                                                        </path>
                                                    </svg>
                                                </button>
                                                <div className="flex justify-center items-center p-2">
                                                    <Page
                                                        width={200*scale}
                                                        height={300*scale}
                                                        rotate={pageRotations[index]}
                                                        pageNumber={index + 1}
                                                        renderTextLayer={false}
                                                        renderAnnotationLayer={false} 
                                                    />
                                                </div>
                                            
                                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 italic text-xs">
                                                    {index + 1}
                                                </div>
                                            
                                        </button>
                                        
                                    </>
                                    
                                ))}
                            </div>
                    </Document>
                </div>
                {
                    uploadStatus === "uploaded" && (
                        <div>
                            <button onClick={downloadRotatedPdf}  className="bg-[rgb(255,97,47)] px-3 py-2 text-white rounded-md cursor-pointer">Download</button>
                        </div> 
                    )
                }
                
        </div>
        
    )
}