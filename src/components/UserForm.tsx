import { useActionState } from "react";
import { userFormSchema } from "../config/formSchema";
import { TextField, Stack, Paper } from "@mui/material";
import SubmitButton from "./SubmitButton";
import { useUsers } from "../hooks/useUsers";
import { useToast } from "../context/ToastContext";

export default function UserForm() {
  const { createUser } = useUsers();
  const { showToast } = useToast();

  const submitUser = async (prevState: any, formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);

      await createUser.mutateAsync(data);

      showToast("User created successfully", "success");

      return { success: true };
    } catch {
      showToast("Failed to create user", "error");

      return { error: "Failed to create user" };
    }
  };

  const [state, formAction] = useActionState(submitUser, null);

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
            />
          ))}

          <SubmitButton />
        </Stack>
      </form>
    </Paper>
  );
}
