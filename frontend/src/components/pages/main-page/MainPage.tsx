import Sidebar from "@/components/pages/main-page/sidebar/Sidebar.tsx";
import MainBlock from "@/components/pages/main-page/main-block/MainBlock.tsx";

function MainPage () {
    return (
        <div className={"w-full h-screen flex bg-main-page-bg"}>
            <MainBlock />
            <Sidebar />
        </div>
    )
}

export default MainPage;