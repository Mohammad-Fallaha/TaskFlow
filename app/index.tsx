import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Glow Shapes */}
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.glowThree} />

   

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PRODUCTIVITY REIMAGINED</Text>
        </View>

        <Text style={styles.title}>TaskFlow</Text>

        <Text style={styles.subtitle}>
          Plan smarter, work faster, and keep every task beautifully organized
          in one modern workspace.
        </Text>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroTitle}>Your day, under control</Text>

            <View style={styles.progressMini}>
              <Text style={styles.progressMiniText}>84%</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>
            A powerful task experience that helps you focus on what matters
            most.
          </Text>

          {/* Task Preview */}
          <View style={styles.previewTask}>
            <View style={[styles.statusDot, styles.statusDone]} />
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewTaskTitle}>Finish mobile UI</Text>
              <Text style={styles.previewTaskSub}>Completed</Text>
            </View>
          </View>

          <View style={styles.previewTask}>
            <View style={[styles.statusDot, styles.statusPending]} />
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewTaskTitle}>Review task details</Text>
              <Text style={styles.previewTaskSub}>Pending</Text>
            </View>
          </View>

          <View style={styles.previewTask}>
            <View style={[styles.statusDot, styles.statusPending]} />
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewTaskTitle}>Prepare presentation</Text>
              <Text style={styles.previewTaskSub}>In progress</Text>
            </View>
          </View>

          {/* Stats Boxes */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>08</Text>
              <Text style={styles.statLabel}>Done</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>04</Text>
              <Text style={styles.statLabel}>Left</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Designed to make productivity feel effortless
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    position: "relative",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    zIndex: 5,
  },

  glowOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#7C3AED",
    top: -40,
    right: -80,
    opacity: 0.28,
  },
  glowTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#2563EB",
    bottom: 120,
    left: -70,
    opacity: 0.22,
  },
  glowThree: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#EC4899",
    bottom: -120,
    right: -100,
    opacity: 0.18,
  },


  

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  badgeText: {
    color: "#E9D5FF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 12,
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 16,
    color: "#CBD5E1",
    lineHeight: 26,
    marginBottom: 24,
    maxWidth: "96%",
  },

  heroCard: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 8,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
    marginRight: 10,
  },
  progressMini: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  progressMiniText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  heroDescription: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 18,
  },

  previewTask: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusDone: {
    backgroundColor: "#22C55E",
  },
  statusPending: {
    backgroundColor: "#F59E0B",
  },
  previewTextContainer: {
    flex: 1,
  },
  previewTaskTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  previewTaskSub: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  statLabel: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    marginRight: 8,
    letterSpacing: 0.3,
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  footerText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
  },
});