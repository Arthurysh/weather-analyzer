function Header() {
    return (
        <header className={"bg-header-mountain-logo bg-cover bg-center bg-no-repeat w-full rounded-[10px] relative"}>
            <div className={"flex justify-between bg-[#0C1A47] opacity-[80%] w-full h-full rounded-[10px] items-center px-[20px] py-[10px] text-main-white-color text-[30px] font-semibold"}>
                <h4>Good morning</h4>
                <div className={"flex flex-col items-end"}>
                    <p>11.40 PM</p>
                    <p className={"text-[20px]"}>Tuesday, July 11</p>
                </div>
            </div>
        </header>
    )
}

export default Header;