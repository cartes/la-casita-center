import { Tabs, Redirect } from "expo-router";
import LaCasitaHeader from "@/components/LaCasitaHeader";
import BottomNavigation from "@/components/BottomNavigation";

export default function InternasLayout() {
    return (
        <>
            <LaCasitaHeader />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            >
                <Tabs.Screen name="index" redirect={false} />
            </Tabs>
            <BottomNavigation />
        </>
    )   
}