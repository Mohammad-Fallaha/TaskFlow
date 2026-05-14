import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function TaskDetales() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>My First Task</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          This is a simple description for the task.
        </Text>

        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>High</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>2026-05-06</Text>
      </View>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#fff',
  },
    title: {    
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
    card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },    
    label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
    value: {
    fontSize: 16,
    marginTop: 5,
  },
});
