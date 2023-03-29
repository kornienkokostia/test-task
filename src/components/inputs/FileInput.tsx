import React, { useState } from 'react';
import './fileInput.scss';

interface InputProps {
  inputVal: File | undefined;
  setInput: React.Dispatch<React.SetStateAction<File | undefined>>;
  btnText: string;
  placeholder: string;
  errorText: string;
  errorHandler: (file: File | undefined) => boolean;
}

export const FileInput = (props: InputProps) => {
  const [filedValid, setFieldValid] = useState<boolean>(true);

  return (
    <div className="registration-file-upload">
      <label
        htmlFor="file"
        className={`registration-file-upload-btn ${
          !filedValid ? 'error' : ''
        }`}>
        {props.btnText}
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg"
        className="registration-file-upload-input"
        id="file"
        onChange={e => {
          const file = e.currentTarget.files![0];
          props.setInput(file);
          if (props.errorHandler(file)) {
            setFieldValid(true);
          } else {
            setFieldValid(false);
          }
        }}
      />
      <div
        className={`registration-file-upload-text-wrapper ${
          !filedValid ? 'error' : ''
        }`}>
        <div className="registration-file-upload-text">
          <p>{!props.inputVal ? props.placeholder : props.inputVal.name}</p>
        </div>
      </div>
      {!filedValid && (
        <div className="registration-input-error">{props.errorText}</div>
      )}
    </div>
  );
};
