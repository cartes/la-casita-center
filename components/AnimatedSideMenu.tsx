import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { runOnJS } from "react-native-reanimated";


const { width } = Dimensions.get("window");

export default function AnimatedSideMenu({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const translateX = useSharedValue(-260);

    // Animar entrada
    useEffect(() => {
        translateX.value = withTiming(0, { duration: 300 });
    }, []);

    const menuStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const handleClose = () => {
        translateX.value = withTiming(-260, { duration: 200 }, () => {
            runOnJS(onClose)();
        });
    };

    const navigate = (path: string) => {
        router.push(path);
        handleClose();
    };

    return (
        <View style={styles.overlay}>
            {/* backdrop */}
            <Animated.View style={[styles.menu, { width: 260 }, menuStyle]}>
                <View style={styles.menuHeader}>
                    <Text style={styles.title}>Menú</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.item} onPress={() => navigate("/home")}>
                    <Ionicons name="home-outline" size={26} color="#333" />
                    <Text style={styles.text}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => navigate("/videos")}>
                    <Ionicons name="logo-youtube" size={26} color="#333" />
                    <Text style={styles.text}>Videos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => navigate("/(internas)/eventos")}>
                    <Ionicons name="calendar-outline" size={26} color="#333" />
                    <Text style={styles.text}>Eventos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => navigate("/contacto")}>
                    <Ionicons name="call-outline" size={26} color="#333" />
                    <Text style={styles.text}>Contacto</Text>
                </TouchableOpacity>

                <View style={styles.flexEnd}>
                    <TouchableOpacity
                        style={styles.logout}
                        onPress={() => {
                            router.replace("/"); // Cerrar sesión
                            handleClose();
                        }}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#fff" />
                        <Text style={styles.logoutText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <TouchableOpacity style={styles.backdrop} onPress={handleClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        zIndex: 100,
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    menu: {
        width: 260,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 30,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
        elevation: 10,
        zIndex: 101,
    },
    menuHeader: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
    },
    flexEnd: {
        marginTop: "auto",
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e63946",
        padding: 10,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
});
