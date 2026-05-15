import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#6D5DF6',

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: 'center',

    shadowColor: '#6D5DF6',

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.2,
    shadowRadius: 14,

    elevation: 5,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});