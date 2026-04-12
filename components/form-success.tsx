import { BsCheck } from "react-icons/bs";

interface FormSuccessProps {
    messege?: string
}

export const FormSuccess = ({
    messege,
}: FormSuccessProps)=>{
    if(!messege) return null;
    return (
        <div className="bg-emerald-500/15 rounded-md p-3 flex items-center gap-x-2 text-sm text-emerald-500">
            <BsCheck className="w-4 h-4"/>
            <p>{messege}</p>
        </div>
    );
};