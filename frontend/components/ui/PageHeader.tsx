import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({
  title,
  subtitle,
}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
});