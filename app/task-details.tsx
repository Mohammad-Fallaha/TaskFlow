import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, Todo } from "../services/todoApi";

export default function TaskDetailsScreen() {
    const { id } = useLocalSearchParams();
    const qc = useQueryClient();

    const { data } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    const todo = data?.find((t) => t.id === Number(id));

    if (!todo) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Task not found</Text>
            </SafeAreaView>
        );
    }

    // 🔥 Toggle Status Button Logic
    const toggleStatus = () => {
        const todos = qc.getQueryData<Todo[]>(["todos"]) || [];

        const updated = todos.map((t) =>
            t.id === todo.id
                ? { ...t, completed: !t.completed }
                : t
        );

        qc.setQueryData(["todos"], updated);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Task Details</Text>

            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.label}>Task</Text>
                <Text
                    style={[
                        styles.task,
                        todo.completed && styles.doneText,
                    ]}
                >
                    {todo.todo}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Status</Text>
                <Text
                    style={[
                        styles.status,
                        todo.completed
                            ? styles.completed
                            : styles.pending,
                    ]}
                >
                    {todo.completed ? "Completed" : "Pending"}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>ID</Text>
                <Text style={styles.info}>{todo.id}</Text>
            </View>

            {/* 🔥 CHANGE STATUS BUTTON (IMPORTANT) */}
            <Pressable
                onPress={toggleStatus}
                style={[
                    styles.statusBtn,
                    todo.completed
                        ? styles.doneBtn
                        : styles.pendingBtn,
                ]}
            >
                <Text style={styles.btnText}>
                    {todo.completed
                        ? "Mark as Pending"
                        : "Mark as Completed"}
                </Text>
            </Pressable>

            {/* Edit */}
            <Pressable
                style={styles.editBtn}
                onPress={() =>
                    router.push(`/edit-task?id=${todo.id}`)
                }
            >
                <Text style={styles.btnText}>Edit Task</Text>
            </Pressable>

            {/* Back */}
            <Pressable
                style={styles.backBtn}
                onPress={() => router.back()}
            >
                <Text style={styles.btnText}>Back</Text>
            </Pressable>
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
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    label: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 6,
        fontWeight: "600",
    },

    task: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
    },

    doneText: {
        textDecorationLine: "line-through",
        color: "#9CA3AF",
    },

    status: {
        fontSize: 14,
        fontWeight: "800",
    },

    completed: {
        color: "#16A34A",
    },

    pending: {
        color: "#2563EB",
    },

    info: {
        fontSize: 15,
        fontWeight: "600",
        color: "#374151",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
    },

    // 🔥 IMPORTANT BUTTON
    statusBtn: {
        marginTop: 15,
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
    },

    doneBtn: {
        backgroundColor: "#16A34A",
    },

    pendingBtn: {
        backgroundColor: "#2563EB",
    },

    editBtn: {
        marginTop: 10,
        backgroundColor: "#111827",
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
    },

    backBtn: {
        marginTop: 10,
        backgroundColor: "#6B7280",
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "800",
    },
});