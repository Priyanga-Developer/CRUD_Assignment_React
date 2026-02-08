import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="contained" type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save User"}
    </Button>
  );
}
