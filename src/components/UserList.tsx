import { Paper, Typography, Button, Stack } from "@mui/material";
import { useToast } from "../context/ToastContext";
import type { User } from "../types/users";
import type { UseMutationResult } from "@tanstack/react-query";

type Props = {
  users: User[];
  deleteMutation: UseMutationResult<void, Error, number>;
};

export default function UserList({ users, deleteMutation }: Props) {
  const { showToast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);

      showToast("User deleted successfully", "error");
    } catch {
      showToast("Failed to delete user", "error");
    }
  };

  // If no users
  if (!users || users.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography align="center">No users found</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2} mt={3}>
      {users.map((user) => (
        <Paper
          key={user.id}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>

          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(user.id)}
          >
            DELETE
          </Button>
        </Paper>
      ))}
    </Stack>
  );
}
