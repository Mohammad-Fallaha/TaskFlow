import { View, Text, StyleSheet, Pressable } from "react-native";
import { Todo } from "../services/todoApi";

type Props = {
  item: Todo;
  onPress?: () => void;
};

export default function TaskCard({ item, onPress }: Props) {
  return (
    <Pressable
      style={[
        styles.card,
        !item.completed && styles.pendingCard,
        item.completed && styles.completedCard,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      {!item.completed && <View style={styles.dot} />}

      <View style={styles.topRow}>
        <Text style={[styles.task, item.completed && styles.completedTask]}>
          {item.todo}
        </Text>

        <View
          style={[
            styles.statusBadge,
            item.completed ? styles.completedBadge : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.completed ? styles.completedText : styles.pendingText,
            ]}
          >
            {item.completed ? "Completed" : "Pending"}
          </Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsHint}>Tap to view details</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    position: "relative",
  },
  pendingCard: {
    borderLeftWidth: 5,
    borderLeftColor: "#6D5DF6",
  },
  completedCard: {
    opacity: 0.88,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
    position: "absolute",
    top: 14,
    right: 14,
  },
  topRow: {
    gap: 10,
    paddingRight: 18,
  },
  task: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
    lineHeight: 22,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  completedBadge: {
    backgroundColor: "#DCFCE7",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },
  completedText: {
    color: "#15803D",
  },
  pendingText: {
    color: "#B45309",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  detailsHint: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  arrow: {
    fontSize: 22,
    color: "#9CA3AF",
    fontWeight: "700",
  },
});