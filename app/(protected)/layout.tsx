import { SparklesPreview2 } from "@/components/sparkles2";
import NavBar from "./_components/navbar";

const ProtectedLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    return (
        <div className="h-full w-full flex flex-col
        items-center justify-center gap-y-10 " suppressHydrationWarning>
    <SparklesPreview2>
        <NavBar/>
        {children}
    </SparklesPreview2>
    </div>
    );
}

export default ProtectedLayout;