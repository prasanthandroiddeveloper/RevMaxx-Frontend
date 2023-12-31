import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from '../../constants/Layout';
import {COLORS, FONT} from '../../themes/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputBoxProps {
  placeholder: string;
  value: string;
  isPassword?: boolean;
  error?: string;
  onChangeText: (text: string) => void;
}

const InputBox = ({
  placeholder,
  value,
  isPassword,
  error,
  onChangeText,
}: InputBoxProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputContainer}
        placeholderTextColor={COLORS.placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !isPasswordVisible}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {isPassword && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.eyeIconContainer}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={COLORS.lightGrey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(16),
  },
  inputContainer: {
    borderWidth: 1,
    padding: scale(15),
    borderRadius: scale(8),
    fontFamily: FONT.regular,
    borderColor: COLORS.borderColor,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: scale(10),
    top: scale(15),
  },
  error: {
    color: COLORS.red,
    marginTop: scale(5),
    fontSize: scale(10),
    fontFamily: FONT.regular,
    fontWeight: '500',
  },
});
