import { CredentialsForm } from "@/components";
import { authConfig } from "@/utils/authConfig";

import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authConfig);
  if (session) redirect("/admin");

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      mt="-64px"
      alignItems="center"
    >
      <CredentialsForm />
    </Box>
  );
}

export default page;
