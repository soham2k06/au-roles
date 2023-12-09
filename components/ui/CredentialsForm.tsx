"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

import { Box, Divider, TextField, Typography } from "@mui/material";
import { AUButton, FullPageLoader } from ".";
import { ContainerBox } from "..";
import { toast } from "sonner";
import Link from "next/link";

function CredentialsForm() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  const [name, setName] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      name,
      password,
      redirect: false,
    });

    if (!name || !password) {
      toast.error("Enter your details first.");
    } else if (res?.error) {
      toast.error("Invalid name or password");
    } else if (res?.url) router.replace("/admin");
  };

  if (sessionStatus === "loading") return <FullPageLoader />;

  return (
    <ContainerBox width={{ xs: "100%", sm: "unset" }} p={2}>
      <Typography variant="h5" textAlign="center">
        Sign in for admin page
      </Typography>
      <Divider sx={{ my: 2 }} />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} mb={2}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <AUButton type="submit" sx={{ width: "100%" }}>
          submit
        </AUButton>
      </form>
      <Divider sx={{ my: 2 }}>or</Divider>
      <Typography fontFamily="sans-serif" fontSize="16px" textAlign="center">
        Continue as normal?{" "}
        <Link href="/">
          <Box component="span" color="azure" sx={{ cursor: "pointer" }}>
            go back.
          </Box>
        </Link>
      </Typography>
    </ContainerBox>
  );
}

export default CredentialsForm;
