import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Todo } from "../services/todoApi";
import { useState, useEffect } from "react";

const PRIMARY = "#2563EB";

export default function TaskDetailsScreen() {
    const { id } = useLocalSearchParams();
    const queryClient = useQueryClient();

    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        const todos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
        const found = todos.find((item) => item.id === Number(id));
        setTodo(found || null);
    }, [id]);

    if (!todo) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Task not found</Text>
            </SafeAreaView>
        );
    }

    const toggleStatus = () => {
        const todos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

        const updated = todos.map((item) =>
            item.id === todo.id
                ? { ...item, completed: !item.completed }
                : item
        );

        queryClient.setQueryData(["todos"], updated);

        setTodo((prev) =>
            prev ? { ...prev, completed: !prev.completed } : prev
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Task Details</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Task</Text>
                <Text style={[styles.taskText, todo.completed && styles.completedTask]}>
                    {todo.todo}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Status</Text>
                <Text
                    style={[
                        styles.status,
                        todo.completed ? styles.done : styles.pending,
                    ]}
                >
                    {todo.completed ? "Completed" : "Pending"}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Task ID</Text>
                <Text style={styles.info}>{todo.id}</Text>

                <Text style={styles.label}>User ID</Text>
                <Text style={styles.info}>{todo.userId}</Text>
            </View>

            <View style={styles.actions}>
                <Pressable
                    onPress={toggleStatus}
                    style={[
                        styles.toggleButton,
                        todo.completed ? styles.doneBtn : styles.pendingBtn,
                    ]}
                >
                    <Text style={styles.toggleText}>
                        {todo.completed
                            ? "✓ Mark as Pending"
                            : "○ Mark as Completed"}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.editButton}
                    onPress={() => router.push(`/edit-task?id=${todo.id}`)}
                >
                    <Text style={styles.editText}>Edit Task</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 20,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 20,
        color: "#111827",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    label: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 6,
        fontWeight: "600",
    },

    taskText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
    },

    completedTask: {
        textDecorationLine: "line-through",
        color: "#9CA3AF",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 14,
    },

    status: {
        fontSize: 14,
        fontWeight: "800",
    },

    done: {
        color: "#16A34A",
    },

    pending: {
        color: "#2563EB",
    },

    info: {
        fontSize: 15,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },

    actions: {
        marginTop: 20,
        gap: 12,
    },

    toggleButton: {
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    doneBtn: {
        backgroundColor: "#16A34A",
    },

    pendingBtn: {
        backgroundColor: "#2563EB",
    },

    toggleText: {
        color: "#FFFFFF",
        fontWeight: "800",
    },

    editButton: {
        backgroundColor: "#111827",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    editText: {
        color: "#FFFFFF",
        fontWeight: "800",
    },
}); 