import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Videos() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Videos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    }
});