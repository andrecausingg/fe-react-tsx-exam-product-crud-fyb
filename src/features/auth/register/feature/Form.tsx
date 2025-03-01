// Mantine
import { useForm, UseFormReturnType } from "@mantine/form";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";

// Interface
import { FormValuesRegister } from "../../../../interface/auth/register/register";

// Auth API | React tanstack
import { useApiAuth } from "../../../../api/auth/auth";
import { useEffect } from "react";

const Form: React.FC = () => {
  // Account API | React tanstack
  const {
    mutateAuth,
    isLoadingAuth,
    isErrorAuth,
    isSuccessAuth,
    errorAuth,
    dataAuth,
    resetAuth,
  } = useApiAuth();

  // Use Mantine useForm with TypeScript
  const form: UseFormReturnType<FormValuesRegister> =
    useForm<FormValuesRegister>({
      initialValues: {
        email: "",
        password: "",
        password_confirmation: "",
      },

      validate: {
        email: (value: string) =>
          /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
        password: (value: string) =>
          value.length >= 8 ? null : "Password must be at least 8 characters",
        password_confirmation: (value: string, values: FormValuesRegister) =>
          value !== values.password ? "Passwords do not match" : null,
      },
    });

  const handleSubmit = (values: FormValuesRegister): void => {
    console.log("Form Submitted:", values);
    mutateAuth({
      payload: values || {},
      api: "auth/register",
      method: "POST",
    });
  };

  // Success | Notification
  useEffect(() => {
    // Success
    if (isSuccessAuth) {
      notifications.show({
        title: dataAuth?.title_message || "Success",
        message: dataAuth?.message || "Success",
        color: "green",
      });

      resetAuth;
      form.reset();
    }
  }, [isSuccessAuth]);

  // Error handling and notification
  useEffect(() => {
    if (isErrorAuth) {
      notifications.show({
        title: errorAuth?.title_message || "Error",
        message: errorAuth?.message || "Something went wrong!",
        color: "red",
      });

      if (errorAuth?.errors) {
        const formattedErrors = Object.keys(errorAuth.errors).reduce(
          (item: any, field) => {
            item[field] = errorAuth.errors[field];
            return item;
          },
          {}
        );
        form.setErrors(formattedErrors);
      }
    }
  }, [isErrorAuth]);

  return (
    <Container
      size={420}
      className="my-auto h-full flex justify-center items-center"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <div className="text-2xl text-center font-bold mb-4">
            <h1>Sign up</h1>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            {/* Email Input */}
            <TextInput
              label="Email"
              placeholder="you@example.com"
              {...form.getInputProps("email")}
              error={form.errors.email}
            />

            {/* Password Input */}
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
              error={form.errors.password}
            />

            {/* Password Confirmation Input */}
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              mt="md"
              {...form.getInputProps("password_confirmation")}
              error={form.errors.password_confirmation}
            />

            {/* Login Link */}
            <div className="my-4 text-right text-sm">
              <Link to="/">Already have an account? Login</Link>
            </div>
            
            <Button color="red" fullWidth type="submit" loading={isLoadingAuth}>
              Sign up
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default Form;
