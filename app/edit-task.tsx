import { useState } from "react";
import { TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo, updateTodo } from "../services/todoApi";

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const qc = useQueryClient();

  const todos = qc.getQueryData<Todo[]>(["todos"]) || [];
  const todo = todos.find((t) => t.id === Number(id));

  const [text, setText] = useState(todo?.todo || "");

  const editMutation = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      updateTodo(id, { todo: text }),

    onSuccess: (updatedTodo) => {
      const oldTodos = qc.getQueryData<Todo[]>(["todos"]) || [];

      const updatedTodos = oldTodos.map((t) =>
        t.id === updatedTodo.id ? { ...t, ...updatedTodo } : t
      );

      qc.setQueryData<Todo[]>(["todos"], updatedTodos);
      router.back();
    },

    onError: () => {
      Alert.alert("Error", "Failed to update task");
    },
  });

  if (!todo) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Task not found</Text>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      Alert.alert("Warning", "Task cannot be empty");
      return;
    }

    editMutation.mutate({ id: todo.id, text: trimmedText });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        editable={!editMutation.isPending}
      />

      <Pressable
        style={[
          styles.button,
          editMutation.isPending && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={editMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {editMutation.isPending ? "Saving..." : "Save"}
        </Text>
      </Pressable>
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
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});