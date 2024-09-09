import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

  export interface HintProps {
    lable: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
  }


  export const Hint = ({
    lable,
    children,
    side,
    align,
    sideOffset,
    alignOffset
  }:HintProps) =>{
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent 
                    className="text-white font-roboto bg-slate-700 border-slate-800 px-2 py-1"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    >
                    <p className="font-normal text-sm capitalize">{lable}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
  }