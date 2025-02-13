import { useState } from 'react';
import NavigationSidebar from '../components/navigation_sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '../components/appbar';

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col" style={{ maxWidth: '100vw', overflow: "auto" }}>
            <header className="h-[60px] w-full bg-primaryColor text-white flex items-center px-4 fixed top-0 left-0 shadow z-10">
                <button
                    className="lg:hidden text-white flex flex-1 flex-start"
                    onClick={toggleSidebar}
                >
                    <MenuIcon sx={{ fontSize: "44px" }} />
                </button>
                <div className='flex-1 hidden lg:block'>
                    <img src="/logo.svg" alt="yamm logo" width="60px" height="50px" />
                </div>

                <AppBar />
            </header>

            <div className="flex flex-1 pt-[60px]">
                <aside
                    className={`lg:w-[270px] w-full bg-secondaryColor text-white h-full p-2 shadow fixed top-[60px] left-0 transform transition-transform duration-300 z-10 
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
                >
                    <NavigationSidebar />
                </aside>
                <main className="flex-1 bg-[#ffffff] lg:ml-[270px] max-w-[100vw]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default NavigationLayout;