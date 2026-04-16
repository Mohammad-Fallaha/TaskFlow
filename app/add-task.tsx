import { useState } from "react";
import { TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, Todo } from "../services/todoApi";

export default function AddTask() {
  const [text, setText] = useState("");
  const qc = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTodo,

    onSuccess: (newTodo: Todo) => {
      const oldTodos = qc.getQueryData<Todo[]>(["todos"]) || [];

      qc.setQueryData<Todo[]>(["todos"], [newTodo, ...oldTodos]);

      setText("");
      router.back();
    },

    onError: () => {
      Alert.alert("Error", "Failed to add task");
    },
  });

  const handleAdd = () => {
    const trimmed = text.trim();

    if (!trimmed) {
      Alert.alert("Warning", "Please enter a task");
      return;
    }

    addMutation.mutate(trimmed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter task"
        style={styles.input}
        editable={!addMutation.isPending}
      />

      <Pressable
        style={[
          styles.button,
          addMutation.isPending && styles.disabledButton,
        ]}
        onPress={handleAdd}
        disabled={addMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {addMutation.isPending ? "Adding..." : "Add"}
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
    backgroundColor: "#6D5DF6",
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
});