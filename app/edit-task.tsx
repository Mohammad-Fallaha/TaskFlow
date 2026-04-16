import { useState } from "react";
import { TextInput, Pressable, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Todo } from "../services/todoApi";

export default function EditTask() {
    const { id } = useLocalSearchParams();
    const qc = useQueryClient();

    const todos = qc.getQueryData<Todo[]>(["todos"]) || [];
    const todo = todos.find((t) => t.id === Number(id));

    const [text, setText] = useState(todo?.todo || "");

    if (!todo) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Task not found</Text>
            </SafeAreaView>
        );
    }

    const handleSave = () => {
        const updated = todos.map((t) =>
            t.id === todo.id ? { ...t, todo: text } : t
        );

        qc.setQueryData(["todos"], updated); // 🔥 تحديث فوري

        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Edit Task</Text>

            <TextInput value={text} onChangeText={setText} style={styles.input} />

            <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F8FAFC" },
    title: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    button: {
        marginTop: 15,
        backgroundColor: "#111827",
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "800" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
});