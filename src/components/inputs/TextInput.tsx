import React, { useState } from 'react';
import './textInput.scss';

interface InputProps {
  inputVal: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  type: 'text' | 'tel';
  helperText?: string;
  errorText: string;
  errorHandler: (str: string) => boolean;
  setFiledsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TextInput = (props: InputProps) => {
  const [filedValid, setFieldValid] = useState<boolean>(true);

  const checkFiled = (e: HTMLInputElement) => {
    if (props.errorHandler(e.value)) {
      setFieldValid(true);
    } else {
      setFieldValid(false);
    }
  };

  return (
    <div className="registration-input-container">
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`registration-input ${!filedValid ? 'error' : ''}`}
        value={props.inputVal}
        onInput={e => {
          if (props.type === 'tel') {
            props.setInput(
              e.currentTarget.value.replace(new RegExp(/[^\d\+]/, 'ig'), ''),
            );
          } else {
            props.setInput(e.currentTarget.value);
          }
          setFieldValid(true);
          if (props.inputVal.length === 0) {
            checkFiled(e.currentTarget);
          }
          props.setFiledsFocused(true);
        }}
        onBlur={e => {
          checkFiled(e.currentTarget);
          props.setFiledsFocused(false);
        }}
      />
      {props.helperText && filedValid && (
        <div className="registration-input-helper">{props.helperText}</div>
      )}
      {!filedValid && (
        <div className="registration-input-error">{props.errorText}</div>
      )}
    </div>
  );
};
