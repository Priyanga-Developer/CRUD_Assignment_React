import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { useUsers } from "../hooks/useUsers";
import { Box } from "@mui/material";

export default function Home() {

  const { users, deleteUser } = useUsers();

  return (

    <Box display="flex" flexDirection="column" alignItems="center">

      <UserForm />

    <UserList
  users={users.data}
  deleteMutation={deleteUser}
/>


    </Box>

  );
}
