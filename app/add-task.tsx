import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const PRIMARY = "#2563EB";

export default function AddTaskScreen() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleAdd = async () => {
    if (!task.trim()) return;

    setLoading(true);

    const newTodo = {
      id: Date.now(),
      todo: task,
      completed: false,
      userId: Math.floor(Math.random() * 10) + 1
    };

    queryClient.setQueryData(["todos"], (old: any = []) => [
      newTodo,
      ...old,
    ]);

    setLoading(false);
    setTask("");

    router.back();
  };

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>📝 Add New Task</Text>

        <View style={styles.card}>
          <TextInput
              placeholder="Write your task..."
              value={task}
              onChangeText={setTask}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
          />

          <Pressable
              style={[
                styles.button,
                (!task.trim() || loading) && styles.disabled,
              ]}
              onPress={handleAdd}
              disabled={!task.trim() || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Adding..." : "Add Task"}
            </Text>
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

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    color: "#111827",
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

  disabled: {
    opacity: 0.5,
  },
});