import React, { useState } from "react";
import { Tabs, Redirect } from "expo-router";
import LaCasitaHeader from "@/components/LaCasitaHeader";
import BottomNavigation from "@/components/BottomNavigation";
import AnimatedSideMenu from "@/components/AnimatedSideMenu";

export default function InternasLayout() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <LaCasitaHeader onMenuPress={() => setShowMenu(true)} />
            {showMenu && <AnimatedSideMenu onClose={() => setShowMenu(false)} />}

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