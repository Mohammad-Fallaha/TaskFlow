import { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getTodos, Todo } from "../services/todoApi";
import TaskCard from "../components/TaskCard";
import { router } from "expo-router";

type FilterType = "all" | "completed" | "pending";

export default function HomeScreen() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const todos = data ?? [];

  const totalTasks = todos.length;
  const completedTasks = todos.filter((item) => item.completed).length;
  const pendingTasks = todos.filter((item) => !item.completed).length;

  const filteredTasks = useMemo(() => {
    let result = todos;

    if (filter === "completed") {
      result = result.filter((item) => item.completed);
    } else if (filter === "pending") {
      result = result.filter((item) => !item.completed);
    }

    if (search.trim()) {
      result = result.filter((item) =>
        item.todo.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    return result;
  }, [filter, search, todos]);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return Number(a.completed) - Number(b.completed);
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.message}>Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.message}>Error loading tasks</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task Dashboard</Text>
      <Text style={styles.subtitle}>
        Manage your tasks in a simple and smart way
      </Text>

      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        <Pressable
          style={[
            styles.filterButton,
            filter === "all" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === "completed" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "completed" && styles.activeFilterText,
            ]}
          >
            Completed
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === "pending" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("pending")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "pending" && styles.activeFilterText,
            ]}
          >
            Pending
          </Text>
        </Pressable>
      </View>

      <View style={styles.listWrapper}>
        {sortedTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptyText}>
              Try another keyword or change the selected filter
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedTasks}
            keyExtractor={(item: Todo) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskCard
                item={item}
                onPress={() => router.push(`/task-details?id=${item.id}`)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-task")}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 22,
  },
  statsCard: {
    backgroundColor: "#6D5DF6",
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    shadowColor: "#6D5DF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 42,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    color: "#E9E7FF",
    fontSize: 13,
    marginTop: 5,
    fontWeight: "600",
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeFilterButton: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 13,
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  listWrapper: {
    flex: 1,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 10,
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  emptyIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#6D5DF6",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#6D5DF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  message: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
  },
});