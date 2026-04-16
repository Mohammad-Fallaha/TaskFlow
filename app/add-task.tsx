import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Todo } from "../services/todoApi";

export default function AddTask() {
  const [text, setText] = useState("");
  const qc = useQueryClient();

  const handleAdd = () => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      todo: text,
      completed: false,
      userId: 1,
    };

    const old = qc.getQueryData<Todo[]>(["todos"]) || [];

    qc.setQueryData(["todos"], [newTodo, ...old]); // 🔥 أهم سطر

    setText("");
    router.back();
  };

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Add Task</Text>

        <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Enter task"
            style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
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
    backgroundColor: "#6D5DF6",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "800" },
});