import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LaCasitaHeader() {
    const router = useRouter();
    const userImg = null;

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Abrir menú')}>
                <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>
            <Image source={require("../assets/images/logo_casita.png")} style={styles.logo} />
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/perfil")}>
                {userImg ? (
                    <Image source={{ uri: userImg }} style={styles.avatar} />
                ) : (
                    <Ionicons name="person-circle-outline" size={32} color="#333" />
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 50, // para no chocar con status bar
        paddingBottom: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    iconButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#fff",
        marginRight: 10
    },
    logo: {
        width: 70,
        height: 50,
        resizeMode: "contain",
    },
    userImg: {
        width: 70,
        height: 40,
        borderRadius: 20,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    }
});