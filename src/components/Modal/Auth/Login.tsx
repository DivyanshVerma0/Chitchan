import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { ModalView } from "../../../atoms/authModalAtom";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import InputItem from "../../Layout/InputItem";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginWithEmaiAndPassword } from "../../../firebase/authFunctions";

type LoginProps = {
  toggleView: (view: ModalView) => void;
};

const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    
    // Basic validation
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }
    if (form.password.length < 6) {
      return setFormError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await loginWithEmaiAndPassword(form.email, form.password);
      // If login is successful, the auth state will be updated automatically
    } catch (error: any) {
      setFormError(FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS] || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
        value={form.email}
      />
      <InputGroup size="md">
        <Input
          name="password"
          placeholder="password"
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          value={form.password}
          required
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
          mb={2}
        />
        <InputRightElement width="4.5rem" height="100%">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
            mr={-2}
          >
            <Icon as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError}
      </Text>
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>
    </form>
  );
};
export default Login;
