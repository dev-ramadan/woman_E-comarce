import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Aside";
import DashbordHeader from "../components/DashbotdHeader";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabasae/createclient";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const {  profile } = useSelector(state => state.auth)
    useEffect(() => {
            if (profile !== null  &&  profile.role !== 'admin') {
                navigate('/')
            }else if (profile === null) {
                navigate('/login')
            }
            setIsChecking(false)
    }, []);

    if (isChecking) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
    }

    return (
        <div className="flex h-screen relative">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashbordHeader />
                <div className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
