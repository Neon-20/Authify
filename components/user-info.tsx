import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps{
    user?:ExtendedUser
    label:string
}

const UserInfo = ({
    user,
    label,
}:UserInfoProps) => {
    return ( 
        <Card className="w-[390px] md:w-[600px] shadow-md backdrop-blur-sm bg-black border ">
        <CardHeader>
            <p className="text-white text-2xl font-semibold">
                {label}
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between
            border p-3 shadow-sm rounded-lg">
            <Badge>UserID</Badge>
            <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.id}</p>
            </div>
            <div className="flex flex-row items-center justify-between
            border p-3 shadow-sm rounded-lg">
            <Badge>Name</Badge>
            <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.name}</p>
            </div>
            <div className="flex flex-row items-center justify-between
             border p-3 shadow-sm rounded-lg">
            <Badge>Role</Badge>
            <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.role}</p>
            </div>
            <div className="flex flex-row items-center justify-between
             border p-3 shadow-sm rounded-lg">
            <Badge>Email</Badge>
            <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.email}</p>
            </div>
            <div className="flex flex-row items-center justify-between
            border p-3 shadow-sm rounded-lg">
            <Badge>2FA Enabled</Badge> 
            <p className="truncate text-xs max-w-[200px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">
                {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </p>
            </div>
        </CardContent>
        </Card>
    );
}

export default UserInfo;