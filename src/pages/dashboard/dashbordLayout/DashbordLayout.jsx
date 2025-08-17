import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Aside";
import DashbordHeader from "../components/DashbotdHeader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabasae/createclient";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            const {data : {user}} = await supabase.auth.getUser();
            const {data : role} = await supabase.from('profiles')
            .select('role')
            .eq('id' , user.id)
            .single();

            if(role.role !== 'admin' || role === null){
                navigate('/')
            }
            setIsChecking(false)
        }
        getProfile()
    }, []);

    if (isChecking) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
    }

    return (
        <div className="flex h-screen">
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
