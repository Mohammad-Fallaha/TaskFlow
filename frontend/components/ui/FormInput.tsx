import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import {
  Controller,
  Control,
  FieldValues,
} from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  name: string;
  control: Control<T>;
  label?: string;
  rules?: any;
} & TextInputProps;

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name as any}
      rules={rules}
      render={({
        field: {
          onChange,
          onBlur,
          value,
        },

        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && (
            <Text style={styles.label}>
              {label}
            </Text>
          )}

          <TextInput
            style={[
              styles.input,
              error && styles.errorInput,
              props.multiline && styles.multiline,
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#9CA3AF"
            {...props}
          />

          {error && (
            <Text style={styles.errorText}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 16,

    paddingHorizontal: 16,
    paddingVertical: 14,

    fontSize: 15,
    color: '#111827',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,
    shadowRadius: 6,

    elevation: 1,
  },

  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },

  errorInput: {
    borderColor: '#EF4444',
  },

  errorText: {
    marginTop: 6,
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
});