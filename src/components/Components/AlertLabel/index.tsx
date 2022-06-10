import React from "react"
import { LabelAlert } from "./styles"

interface AlertProps{
    menssage: string;
    options?: any;
}

const AlertLabel = ({menssage, options}: AlertProps)=>{
    return <LabelAlert fontColor={options.fontColor}>{menssage}</LabelAlert>
}

export default AlertLabel;