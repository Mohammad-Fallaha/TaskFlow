import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getTodos, Todo } from "../services/todoApi";

const PRIMARY = "#2563EB";

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const queryClient = useQueryClient();

    const { data } = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data && id) {
            const found = data.find((item) => item.id === Number(id));
            if (found) {
                setText(found.todo);
            }
        }
    }, [data, id]);

    const handleUpdate = async () => {
        if (!text.trim()) return;

        setLoading(true);

        queryClient.setQueryData<Todo[]>(["todos"], (prev = []) =>
            prev.map((item) =>
                item.id === Number(id)
                    ? { ...item, todo: text }
                    : item
            )
        );

        setLoading(false);
        router.push(`/task-details?id=${id}` as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Edit Task</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Task</Text>

                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Edit task..."
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            <View style={styles.actions}>
                <Pressable
                    style={[styles.button, (!text.trim() || loading) && styles.disabled]}
                    onPress={handleUpdate}
                    disabled={!text.trim() || loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Saving..." : "Update Task"}
                    </Text>
                </Pressable>

                <Pressable style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8FAFC",
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 20,
        color: "#111827",
    },

    card: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#6B7280",
        marginBottom: 8,
    },

    input: {
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        color: "#111827",
    },

    actions: {
        marginTop: 18,
        gap: 12,
    },

    button: {
        backgroundColor: PRIMARY,
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "800",
    },

    cancelButton: {
        backgroundColor: "#111827",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    cancelText: {
        color: "#FFFFFF",
        fontWeight: "800",
    },

    disabled: {
        opacity: 0.5,
    },
});