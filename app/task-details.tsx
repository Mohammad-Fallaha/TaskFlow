import { View, Text, Pressable, StyleSheet, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTodos, Todo, updateTodo, deleteTodo } from "../services/todoApi";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const qc = useQueryClient();

  const { data } = useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
  staleTime: Infinity,
  gcTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

  const todo = data?.find((t) => t.id === Number(id));

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodo(id, { completed }),
    onSuccess: (updatedTodo) => {
      const todos = qc.getQueryData<Todo[]>(["todos"]) || [];
      const updatedTodos = todos.map((t) =>
        t.id === updatedTodo.id ? { ...t, ...updatedTodo } : t
      );
      qc.setQueryData<Todo[]>(["todos"], updatedTodos);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, deletedId) => {
      const todos = qc.getQueryData<Todo[]>(["todos"]) || [];
      const updatedTodos = todos.filter((t) => t.id !== deletedId);
      qc.setQueryData<Todo[]>(["todos"], updatedTodos);
      router.back();
    },
  });

  if (!todo) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Task not found</Text>
      </SafeAreaView>
    );
  }

  const toggleStatus = () => {
    if (toggleMutation.isPending || deleteMutation.isPending) return;

    toggleMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const doDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  const handleDelete = () => {
    if (toggleMutation.isPending || deleteMutation.isPending) return;

    if (Platform.OS === "web") {
      const ok = window.confirm("Are you sure you want to delete this task?");
      if (ok) doDelete();
      return;
    }

    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: doDelete },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Task</Text>
        <Text style={[styles.task, todo.completed && styles.doneText]}>
          {todo.todo}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Status</Text>
        <Text
          style={[
            styles.status,
            todo.completed ? styles.completed : styles.pending,
          ]}
        >
          {todo.completed ? "Completed" : "Pending"}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>ID</Text>
        <Text style={styles.info}>{todo.id}</Text>
      </View>

      <Pressable
        onPress={toggleStatus}
        disabled={toggleMutation.isPending || deleteMutation.isPending}
        style={[
          styles.statusBtn,
          todo.completed ? styles.doneBtn : styles.pendingBtn,
        ]}
      >
        <Text style={styles.btnText}>
          {toggleMutation.isPending
            ? "Updating..."
            : todo.completed
            ? "Mark as Pending"
            : "Mark as Completed"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.editBtn}
        onPress={() => router.push(`/edit-task?id=${todo.id}`)}
        disabled={toggleMutation.isPending || deleteMutation.isPending}
      >
        <Text style={styles.btnText}>Edit Task</Text>
      </Pressable>

      <Pressable
        style={styles.deleteBtn}
        onPress={handleDelete}
        disabled={toggleMutation.isPending || deleteMutation.isPending}
      >
        <Text style={styles.btnText}>
          {deleteMutation.isPending ? "Deleting..." : "Delete Task"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.backBtn}
        onPress={() => router.back()}
        disabled={toggleMutation.isPending || deleteMutation.isPending}
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
  statusBtn: {
    marginTop: 15,
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#2563EB",
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
  deleteBtn: {
    marginTop: 10,
    backgroundColor: "#DC2626",
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