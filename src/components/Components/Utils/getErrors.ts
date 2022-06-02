import { ValidationError } from "yup";

export default function GetErros(erros:ValidationError){
    const validatedErros  = {} as any;
  
    erros.inner.forEach((err: any)=>{
       validatedErros[err.path] = err.message;
    })
  
    return validatedErros ;
}