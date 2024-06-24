import React, { RefCallback } from "react"

export default function Button({text, className, onClick} : { text : string, className? : string, onClick? : React.MouseEventHandler<HTMLDivElement> | undefined }){
    return <div onClick={onClick} className={`shadow-sm hover:shadow-md ${className} duration-200 text-center`}>
        {text}
    </div>
}