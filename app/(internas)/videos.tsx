import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import YouTubeModal from "@/components/YouTubeModal";

interface Videos {
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

const extractYouTubeUrl = (html: string): string | null => {
    const match = html.match(/<iframe.*?src="(.*?)"/);
    return match ? match[1] : null;
};

export default function Videos() {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Redirect href="/" />;
    }

    const [videos, setVideos] = useState<Videos[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const getVideos = async () => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/wp/v2/posts?categories=2&_embed`, {
                headers: {
                    "content-type": "application/json",
                }
            });
            const data = await response.json();
            setVideos(data);
        };
        getVideos();
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/images/back_header.png")}
                style={{ width: "105%", height: 70, justifyContent: 'center', paddingVertical: 10, paddingLeft: 20 }}
                resizeMode="cover">
                <Text style={styles.title}>Videos</Text>
            </ImageBackground>

            <View style={styles.content}>
                <FlatList<Videos>
                    data={videos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const imageUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url;
                        const videoUrl = extractYouTubeUrl(item.content.rendered);

                        return (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => {
                                    if (videoUrl) {
                                        setCurrentVideoUrl(videoUrl);
                                        setModalVisible(true);
                                    }
                                }}
                            >
                                {imageUrl && (
                                    <Image
                                        source={{ uri: imageUrl }}
                                        style={styles.imageCard}
                                    />
                                )}
                                <View style={{ paddingHorizontal: 10, width: "75%" }}>
                                    <Text style={{ fontSize: 16 }}>{item.title.rendered}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            <YouTubeModal
                visible={modalVisible}
                videoUrl={currentVideoUrl}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        height: 100,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#7f7f7f",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    imageCard: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    content: {
        flex: 1,
        minHeight: 1200,
        paddingTop: 120,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    container: {
        flexDirection: "column",
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 12,
        fontWeight: "300",
        textTransform: "uppercase",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#325aa6",
        color: '#162d40',
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'column',
        width: 120,
        justifyContent: 'flex-end',
    }
});