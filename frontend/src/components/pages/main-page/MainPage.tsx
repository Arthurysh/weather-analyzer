import Sidebar from "@/components/pages/main-page/sidebar/Sidebar.tsx";
import MainBlock from "@/components/pages/main-page/main-block/MainBlock.tsx";
import { motion } from "framer-motion"

function MainPage () {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ amount: 0.2, once: true }}
            className={"w-full h-screen flex bg-main-page-bg"}>
            <MainBlock />
            <Sidebar />
        </motion.div>
    )
}

export default MainPage;