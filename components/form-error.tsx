import { BsExclamationTriangle } from "react-icons/bs";

interface FormErroProps {
    messege?: string
}

export const FormError = ({
    messege,
}: FormErroProps)=>{
    if(!messege) return null;
    return (
        <div className="bg-destructive/15 rounded-md p-3 flex items-center gap-x-2 text-sm text-destructive">
            <BsExclamationTriangle className="w-4 h-4"/>
            <p >{messege}</p>
        </div>
    );
};