import UserInfo from "@/components/user-info";
import { CurrentUser } from "@/lib/auth";

const ServerPage = async() => {
    //fetch current user
    const user = await CurrentUser(); 
    return ( 
        <div className="mt-4 items-center text-center justify-center">
        <UserInfo 
        label="Server Component 🖥️"
        user = {user}
        />
        </div>
    );
}

export default ServerPage;