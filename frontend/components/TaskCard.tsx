import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type TaskCardProps = {
  task: string;
  status: string;
  onPress: () => void;
  onDelete: () => void;
};

export default function TaskCard({ task, status, onPress, onDelete }: TaskCardProps) {
  const isCompleted = status === 'completed';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, isCompleted ? styles.completedCard : styles.pendingCard]}
    >
      {!isCompleted && <View style={styles.dot} />}

      <View style={styles.topRow}>
        <Text style={[styles.task, isCompleted && styles.completedTask]}>
          {task}
        </Text>
        <View style={[styles.statusBadge, isCompleted ? styles.completedBadge : styles.pendingBadge]}>
          <Text style={[styles.statusText, isCompleted ? styles.completedText : styles.pendingText]}>
            {isCompleted ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsHint}>View details</Text>
        <Text style={styles.arrow}>→</Text>
      </View>

      <Pressable
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation?.();
          onDelete();
        }}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  pendingCard: { borderLeftWidth: 5, borderLeftColor: '#6D5DF6' },
  completedCard: { opacity: 0.88 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 14,
    right: 14,
  },
  topRow: { gap: 10, paddingRight: 18 },
  task: { fontSize: 16, color: '#111827', fontWeight: '700', lineHeight: 22 },
  completedTask: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  statusBadge: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  completedBadge: { backgroundColor: '#DCFCE7' },
  pendingBadge: { backgroundColor: '#FEF3C7' },
  statusText: { fontSize: 12, fontWeight: '800' },
  completedText: { color: '#15803D' },
  pendingText: { color: '#B45309' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  detailsHint: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  arrow: { fontSize: 22, color: '#9CA3AF', fontWeight: '700' },
  deleteButton: {
    marginTop: 14,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});