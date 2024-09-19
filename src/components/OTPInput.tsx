import React from 'react';
import {
  View,
  type ViewStyle,
  type StyleProp,
  TextInput,
  StyleSheet,
  type TextStyle,
} from 'react-native';

export interface OTPFormProps {
  length: number;
  onSubmit?: (value: string) => void;
  containerStyles?: StyleProp<ViewStyle>;
  containerInput?: StyleProp<ViewStyle>;
  input?: StyleProp<TextStyle>;
  inputRow?: boolean;
  type?: 'type1' | 'type2' | 'type3';
}

export const OTPForm = (props: OTPFormProps) => {
  const { inputRow = true } = props;
  const length = new Array(props.length).fill(0);
  const [otp, setOtp] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (otp.length === props.length) {
      props.onSubmit && props.onSubmit(otp.join(''));
    }
  }, [otp, props]);

  return (
    <View
      style={[
        style.container,
        props.containerStyles,
        { flexDirection: inputRow ? 'row' : 'column' },
      ]}
    >
      {length.map((_, index) => (
        <View
          key={index}
          style={[
            style.containerInput,
            style[props.type ?? 'type1'],
            props.containerInput,
          ]}
        >
          <TextInput
            inputMode="numeric"
            style={style.input}
            ref={(ref) => otp.length === index && ref?.focus()}
            value={otp[index]?.toString()}
            onChangeText={(text) => {
              text && setOtp((prev) => [...prev, parseInt(text)]);
            }}
            maxLength={1}
            onKeyPress={(e) => {
              e.nativeEvent.key === 'Backspace' &&
                setOtp((prev) => [...prev.slice(0, -1)]);
            }}
          />
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    fontSize: 24,
    fontWeight: '700',
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
  },
  containerInput: {
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  type1: {
    borderWidth: 1,
  },
  type2: {
    borderBottomWidth: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
    borderWidth: 0,
  },
  type3: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: 'gray',
    elevation: 10,
  },
});
