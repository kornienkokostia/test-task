import React, { useState } from 'react';
import './registration.scss';
import { TextInput } from '../inputs/TextInput';
import { Positions } from '../inputs/Positions';
import { FileInput } from '../inputs/FileInput';
import successImg from './../../assets/success-image.svg';
import ApiService from '../../services/ApiService';

interface Props {
  updateUsers: (page?: number) => Promise<void>;
}

export const Registration = (props: Props) => {
  const [nameInput, setNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [file, setFile] = useState<File>();
  const [filedsFocused, setFiledsFocused] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const nameValid = (str: string) => {
    const isValid = str.length >= 2 && str.length <= 60;
    return isValid;
  };

  const checkEmail = (str: string) =>
    /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
      str,
    );

  const emailValid = (str: string) => {
    const isValid = checkEmail(str);
    return isValid;
  };

  const checkPhone = (str: string) => /^[\+]{0,1}380([0-9]{9})$/.test(str);

  const phoneValid = (str: string) => {
    const isValid = checkPhone(str);
    return isValid;
  };

  const fileValid = (file: File | undefined) => {
    const isValid = file !== undefined && file.size / (1024 * 1024) <= 5;
    return isValid;
  };

  const checkAllFields = () =>
    nameValid(nameInput) &&
    emailValid(emailInput) &&
    phoneValid(phoneInput) &&
    fileValid(file) &&
    !filedsFocused;

  const resetFields = () => {
    setNameInput('');
    setEmailInput('');
    setPhoneInput('');
    setFile(undefined);
    setCurrentPosition(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('position_id', `${currentPosition}`);
    formData.append('name', `${nameInput}`);
    formData.append('email', `${emailInput}`);
    formData.append('phone', `${phoneInput}`);
    formData.append('photo', file as Blob);
    const token = (await ApiService().getToken()).token;
    await ApiService().addUser(formData, token);
    setShowSuccessPopup(true);

    props.updateUsers();
    resetFields();
    setTimeout(() => setShowSuccessPopup(false), 4000);
  };

  return (
    <section className="registration-container section" id="registration">
      <div className="registration">
        <h1 className="registration-title">Working with POST request</h1>
        <div
          className={`registration-success-container ${
            showSuccessPopup ? 'active' : ''
          }`}>
          <div className="registration-success">
            <h1 className="registration-success-title">
              User successfully registered
            </h1>
            <img src={successImg} className="registration-success-img"></img>
          </div>
        </div>
        <form onSubmit={e => handleSubmit(e)} className="registration-form">
          <TextInput
            inputVal={nameInput}
            setInput={setNameInput}
            placeholder="Your name"
            type="text"
            errorText="Please enter a valid name"
            errorHandler={nameValid}
            setFiledsFocused={setFiledsFocused}
          />
          <TextInput
            inputVal={emailInput}
            setInput={setEmailInput}
            placeholder="Email"
            type="text"
            errorText="Please enter a valid email"
            errorHandler={emailValid}
            setFiledsFocused={setFiledsFocused}
          />
          <TextInput
            inputVal={phoneInput}
            setInput={setPhoneInput}
            placeholder="Phone"
            type="tel"
            errorText="Please enter a valid phone number"
            helperText="+38 (XXX) XXX - XX - XX"
            errorHandler={phoneValid}
            setFiledsFocused={setFiledsFocused}
          />
          <Positions
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
          />
          <FileInput
            inputVal={file}
            setInput={setFile}
            btnText="Upload"
            placeholder="Upload your photo"
            errorText="Please select a valid file"
            errorHandler={fileValid}
          />
          <button
            className="btn"
            type="submit"
            disabled={checkAllFields() ? false : true}>
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};
