import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, Text, Image, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function Home() {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Redirect href="/" />;
    }

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "column" }}>
            <View style={styles.contentTop}>
                <Image style={styles.image} source={require("../../assets/images/imagne_bienvenida.png")} />
                <Text style={styles.titleTop}>BIENVENIDXS</Text>
                <View style={styles.containerBienvenida}>
                    <Text style={[styles.bienvenidaParagraph, { marginBottom: 10}]}>
                        Somos una organización sin fines de lucro
                        con base en Louisville, Kentucky
                        acompañamos a las familias dentro de
                        la Comunidad latina.
                    </Text>
                    <Text style={styles.bienvenidaParagraph}>
                        Nuestra misión es empoderar a estas
                        familias, proporcionando una base para un cambio sistémico con efectos a largo plazo.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentTop: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 230,
        position: "relative",
        zIndex: 1
    },
    containerBienvenida: {
        width: "78%",
        backgroundColor: "#fff",
        borderColor: "#FCC24C",
        borderWidth: 3,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        zIndex: 110,
        position: "absolute",
        bottom: -100,
    },
    bienvenidaParagraph: {
        color: "#7F7F7F",
        fontSize: 14,
        textAlign: "center",
    },
    titleTop: {
        color: "#fff",
        textAlign: "center",
        fontSize: 30,
        fontWeight: 300,
        position: "absolute",
        bottom: 70,
        zIndex: 100,
    },
    image: {
        width: "101%",
        resizeMode: "contain",
    }
})