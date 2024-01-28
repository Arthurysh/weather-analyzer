import {Loader2} from "lucide-react";

interface PropsSpinner {
    className?: string;
}

const Spinner = ({className}: PropsSpinner) => {
    return (
        <Loader2 className={`animate-spin text-[#064FF0] ${className}`}/>
    );
};

export default Spinner;