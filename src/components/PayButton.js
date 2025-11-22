import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const PayButton = ({ onPress, disabled = false }) => {
  return (
    <Animatable.View
      animation="pulse"
      iterationCount="infinite"
      duration={2000}
    >
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <MaterialIcons name="qr-code-scanner" size={28} color={colors.secondary} />
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    gap: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PayButton;

