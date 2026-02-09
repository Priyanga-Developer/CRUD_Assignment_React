import { useActionState, useState } from "react";
import { userFormSchema } from "../config/formSchema";
import { TextField, Stack, Paper } from "@mui/material";
import SubmitButton from "./SubmitButton";
import { useUsers } from "../hooks/useUsers";
import { useToast } from "../context/ToastContext";
import type { CreateUserInput } from "../types/users";

export default function UserForm() {
  const { createUser } = useUsers();
  const { showToast } = useToast();

  const [errors, setErrors] = useState<Record<string, string>>({});

  // validation
  const validateField = (name: string, value: string) => {
    if (!value) return "Required";

    if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
      return "Phone must be 10 digits";
    }

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      return "Invalid email address";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorMessage = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  // submit
  const submitUser = async (_prevState: any, formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as CreateUserInput;

      // Validate all fields before submit
      const newErrors: Record<string, string> = {};

      Object.entries(data).forEach(([key, value]) => {
        const errorMessage = validateField(key, String(value));

        if (errorMessage) {
          newErrors[key] = errorMessage;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      await createUser.mutateAsync(data);

      showToast("User created successfully", "success");

      return { success: true };
    } catch {
      showToast("Failed to create user", "error");

      return { error: "Failed to create user" };
    }
  };

  const [, formAction] = useActionState(submitUser, null);

  return (
    <Paper sx={{ padding: 3 }}>
      <form action={formAction}>
        <Stack spacing={2}>
          {userFormSchema.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              required={field.required}
              fullWidth
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
            />
          ))}

          <SubmitButton />
        </Stack>
      </form>
    </Paper>
  );
}
