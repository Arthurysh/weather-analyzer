import moment from "moment";
import {useEffect, useState} from "react";
import { motion } from "framer-motion"

function Header() {
    const [currentDateTime, setCurrentDateTime] = useState(moment());
    const [dayType, setDayType] = useState<string>("day");

    const headerBlockAnimation = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {delay: 0.2, duration: 0.8, linear: [0.67, 0.67, 0.67, 0.67]}
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(moment());
            dayTimeHandler(moment().hour());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function dayTimeHandler(time: number) {
        const dayType =
            time >= 6 && time < 12 ? "morning" :
                time >= 12 && time < 17 ? "day" :
                    time >= 17 && time < 22 ? "evening" :
                        "Night";
        setDayType(dayType);
    }

    return (
        <motion.header
            variants={headerBlockAnimation}
            className={"bg-header-mountain-logo bg-cover bg-center bg-no-repeat w-full rounded-[10px] relative"}>
            <div
                className={"flex justify-between bg-[#0C1A47] opacity-[80%] w-full h-full rounded-[10px] items-center px-[20px] py-[10px] text-main-white-color text-[30px] font-semibold"}>
                <h4>Good {dayType}</h4>
                <div className={"flex flex-col items-end"}>
                    <p>{currentDateTime.format('h:mm A')}</p>
                    <p className={"text-[20px]"}>{currentDateTime.format('dddd, MMMM D')}</p>
                </div>
            </div>
        </motion.header>
    )
}

export default Header;