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

// Library
import Cookies from "js-cookie";

// Interface
import { FormValuesLogin } from "../../../../interface/auth/login/login";

// Auth API | React tanstack
import { useApiAuth } from "../../../../api/auth/auth";
import { useEffect } from "react";

// Utitl
import { saveTokenToCookies } from "../../../../util/dev/cookies";

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
  const form: UseFormReturnType<FormValuesLogin> = useForm<FormValuesLogin>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value: string) =>
        value.length >= 8 ? null : "Password must be at least 8 characters",
    },
  });

  const handleSubmit = (values: FormValuesLogin): void => {
    console.log("Form Submitted:", values);
    mutateAuth({
      payload: values || {},
      api: "auth/login",
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

      if (dataAuth?.token && dataAuth?.token_expire_at) {
        saveTokenToCookies({
          token: dataAuth.token,
          token_expire_at: dataAuth.token_expire_at,
        });
      }
      resetAuth;
      form.reset();
      window.location.href = "/product";
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

            {/* Register Link */}
            <div className="my-4 text-right text-sm">
              <Link to="/register">Don't have an account? Register</Link>
            </div>

            <Button
              color="blue"
              fullWidth
              type="submit"
              loading={isLoadingAuth}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default Form;
