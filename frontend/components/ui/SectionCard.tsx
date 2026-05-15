import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

export default function SectionCard({
  children,
}: any) {

  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    padding: 18,

    marginBottom: 18,

    borderWidth: 1,
    borderColor: '#EEF2F7',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 2,
  },
});