export function validate(list:Array<any>){
    if(list.length>0) return true;
    return false;
}

export function patientExist(patientId: any){
    if(patientId) return true;
    return false;
} 