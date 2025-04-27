import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Redirect } from "expo-router";
import axios from "axios";

interface Alerta {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
            media_details?: {
                sizes?: {
                    thumbnail?: {
                        source_url: string;
                    };
                    medium?: {
                        source_url: string;
                    };
                    full?: {
                        source_url: string;
                    };
                };
            };
        }>;
    };
}

export default function Home() {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Redirect href="/" />;
    }
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const url = `${process.env.EXPO_PUBLIC_API_URL}/wp/v2/posts?categories=4`;

    useEffect(() => {
        const getAlertas = async () => {
            const today = new Date().toISOString().split("T")[0];
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/wp/v2/posts?categories=4&_embed`, {
                headers: {
                    "content-type": "application/json",
                }
            });
            const data = response.data;
            setAlertas(data);
        };

        getAlertas();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/wp/v2/posts?categories=4&_embed`, {
                    headers: {
                        "content-type": "application/json",
                    }
                })
                const newData = response.data;
                if (JSON.stringify(newData) !== JSON.stringify(alertas)) {
                    setAlertas(newData);
                }

            } catch (error) {
                console.error("Error fetching alertas:", error);
            }
        }, 30000);
    }, [alertas]);

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "column" }}>
            <View style={styles.contentTop}>
                <Image style={styles.image} source={require("../../assets/images/imagne_bienvenida.png")} />
                <Text style={styles.titleTop}>BIENVENIDXS</Text>
                <View style={styles.containerBienvenida}>
                    <Text style={[styles.bienvenidaParagraph, { marginBottom: 10 }]}>
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
            <View style={styles.contentAlertas}>
                <Text style={styles.titleAlertas}>Alertas</Text>
                <FlatList<Alerta>
                    data={alertas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const imageUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url;

                        return (
                            <View style={styles.card}>
                                {imageUrl && (
                                    <Image
                                        source={{ uri: imageUrl }}
                                        style={styles.imageCard}
                                    />
                                )}
                                <View style={{ paddingHorizontal: 10, width: "75%" }}>
                                    <Text style={{ fontSize: 13 }}>{item.title.rendered}</Text>
                                </View>
                            </View>
                        );
                    }}
                    ListEmptyComponent={
                        <Text style={{ textAlign: "center", color: "#999" }}>
                            No hay alertas disponibles.
                        </Text>
                    }
                />
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
    contentAlertas: {
        flex: 1,
        paddingTop: 120,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    titleAlertas: {
        color: "#162D40",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
        textTransform: "uppercase",
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
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    imageCard: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    titleCard: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    }
})