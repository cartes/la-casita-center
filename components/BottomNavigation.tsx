import React from "react";
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNavigation() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => router.push("/home")}>
                <Ionicons name="home-outline" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => console.log("Search")}>
                <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => console.log("Add")}>
                <Ionicons name="person-outline" size={26} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffb72d",
        paddingVertical: 20,
        paddingBottom: 40,
        zIndex: 200,
    }
});