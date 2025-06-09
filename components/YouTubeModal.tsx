import React from "react";
import { Modal, View, StyleSheet, Pressable, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function YouTubeModal({ visible, onClose, videoUrl }: {
  visible: boolean;
  onClose: () => void;
  videoUrl: string | null;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>✕</Text>
          </Pressable>
          {videoUrl && (
            <WebView source={{ uri: videoUrl }} style={styles.webview} />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  closeButton: {
    padding: 10,
    alignItems: "flex-end",
    backgroundColor: "#f1f1f1",
  },
  webview: {
    flex: 1,
  },
});
