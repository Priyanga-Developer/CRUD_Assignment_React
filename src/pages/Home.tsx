import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { useUsers } from "../hooks/useUsers";
import { Box } from "@mui/material";

export default function Home() {
  const { users, deleteUser } = useUsers();

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
      gap={4}
      mt={5}
    >
      <Box>
        <UserForm />
      </Box>

      <Box minWidth={300}>
        <UserList users={users.data ?? []} deleteMutation={deleteUser} />
      </Box>
    </Box>
  );
}
