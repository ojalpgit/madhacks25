import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

const LoginScreen = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    // At least 6 characters
    return password.length >= 6;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      const result = login(email, password);
      if (!result.success) {
        Alert.alert('Login Failed', result.error);
      }
    } else {
      const result = signup(email, password, name);
      if (!result.success) {
        Alert.alert('Signup Failed', result.error);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo/Header */}
          <Animatable.View
            animation="fadeInDown"
            duration={1000}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <MaterialIcons name="account-balance-wallet" size={64} color={colors.accent} />
            </View>
            <Text style={styles.title}>Bitcoin Payment</Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </Text>
          </Animatable.View>

          {/* Form */}
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            delay={200}
            style={styles.form}
          >
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={errors.name ? colors.error : colors.textLight}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.textLight}
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    autoCapitalize="words"
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color={errors.email ? colors.error : colors.textLight}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textLight}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={errors.password ? colors.error : colors.textLight}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textLight}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={colors.textLight}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {isLogin ? 'Login' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Demo Credentials */}
            {isLogin && (
              <View style={styles.demoContainer}>
                <Text style={styles.demoTitle}>Demo Credentials:</Text>
                <Text style={styles.demoText}>Email: demo@bitcoin.com</Text>
                <Text style={styles.demoText}>Password: demo123</Text>
              </View>
            )}

            {/* Toggle Login/Signup */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text style={styles.toggleLink}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  toggleText: {
    fontSize: 14,
    color: colors.textLight,
  },
  toggleLink: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
});

export default LoginScreen;

