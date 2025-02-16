import { ReactNode } from "react";
import SideNavigation from "@/components/SideNavigation/SideNavigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen w-screen">
            <SideNavigation/>
            <main className="flex-1 bg-background p-6">{children}</main>
        </div>
    );
}