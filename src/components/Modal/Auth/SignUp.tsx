import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={!!formError}>
        <FormLabel>Email</FormLabel>
        <Input
          required
          name="email"
          placeholder="email"
          type="email"
          mb={2}
          onChange={onChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
          required
          name="password"
          placeholder="password"
          type="password"
          mb={2}
          onChange={onChange}
        />
        <FormLabel>Confirm Password</FormLabel>
        <Input
          required
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
          mb={2}
          onChange={onChange}
        />
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        {error && (
          <FormErrorMessage>
            {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
          </FormErrorMessage>
        )}
      </FormControl>
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
