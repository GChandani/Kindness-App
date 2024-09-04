import React, { useEffect, useReducer } from 'react';
import { StyleSheet, TextInput, View, Text, Platform } from "react-native";
import inputReducer from "../../store/reducers/inputReducer";
import loginReducer from "../../store/reducers/loginReducer";
import { INPUT_BLUR, INPUT_CHANGE } from "../../store/actions/types";
import { Constants } from "../../constants/Constants";
import { useDispatch } from 'react-redux';

const Input = props => {
  const dispatch = useDispatch();
  const { onInputChange, id } = props;

  // const [inputState, dispatch] = useReducer(inputReducer, {
  //   value: props.initialValue ? props.initialValue : '',
  //   isValid: true,
  //   touched: false
  // });

  // useEffect(() => {
  //   // if (inputState.touched) {
  //     onInputChange(id, inputState.value, inputState.isValid);
  //   // }
  // }, [ inputState,onInputChange, id]);

  const textChangeHandler = text => {

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    onInputChange(id, text, isValid);
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (

    <View style={styles.textInputView}>

      <TextInput  {...props} onChangeText={textChangeHandler} underlineColorAndroid='transparent' selectionColor={Constants.colors.black} placeholderTextColor={Constants.colors.lightGrey} style={[styles.textInput, { ...props.style }]} onBlur={lostFocusHandler}></TextInput>
      {/* value={inputState.value}  */}
      {/* {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )} */}
    </View>)
};

const styles = StyleSheet.create({
  textInputView: {
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === "ios" ? 10 : 0,
  },
  textInput: {
    paddingBottom: 5,
    marginLeft: 25,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    margin: 5,
    marginRight: 25,
    marginBottom: 10,
  },
  errorContainer: {
    marginVertical: 5,
    marginLeft: 25,
    marginRight: 25,
  },
  errorText: {
    color: Constants.colors.errorColor,
    fontSize: Constants.colors.erroFontSize
  }
});

export default Input;