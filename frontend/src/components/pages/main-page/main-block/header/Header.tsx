import moment from "moment";
import {useEffect, useState} from "react";

function Header() {
    const [currentDateTime, setCurrentDateTime] = useState(moment());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(moment());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <header className={"bg-header-mountain-logo bg-cover bg-center bg-no-repeat w-full rounded-[10px] relative"}>
            <div
                className={"flex justify-between bg-[#0C1A47] opacity-[80%] w-full h-full rounded-[10px] items-center px-[20px] py-[10px] text-main-white-color text-[30px] font-semibold"}>
                <h4>Good morning</h4>
                <div className={"flex flex-col items-end"}>
                    <p>{currentDateTime.format('h.mm A')}</p>
                    <p className={"text-[20px]"}>{currentDateTime.format('dddd, MMMM D')}</p>
                </div>
            </div>
        </header>
    )
}

export default Header;