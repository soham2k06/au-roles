"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Category,
  CheckBox,
  Circle,
  Comment,
  Groups2,
  Star,
  TipsAndUpdates,
} from "@mui/icons-material";
import { Box, Divider, Stack, capitalize } from "@mui/material";

import { roles } from "@/utils";
import {
  AUButton,
  ContainerBox,
  RoleDetails,
  RoleInfo,
  Section,
} from "@/components";

function Role({ role }: { role: string }) {
  const navigation = useRouter();
  const curRole = roles.find(({ name }) => name === role);
  useEffect(() => {
    document.title = capitalize(role);
  }, []);
  return (
    <Section>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Section.Title gutterBottom={false}>
          {role.replace("-", " ")}
        </Section.Title>

        <AUButton
          onClick={() => navigation.back()}
          sx={{ width: "fit-content" }}
        >
          back
        </AUButton>
      </Box>
      <Divider sx={{ my: 3, display: { xs: "none", md: "inline" } }} />
      <ContainerBox>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={{ xs: 1, md: 2 }}
        >
          <RoleInfo icon={<Groups2 fontSize="small" />}>
            {curRole?.team}
          </RoleInfo>
          {/* <RoleInfo icon={<CheckBox fontSize="small" />}>
            {curRole?.isActive ? "Active" : "Inactive"}
          </RoleInfo> */}
          <RoleInfo icon={<Category fontSize="small" />}>
            {curRole?.ability}
          </RoleInfo>
        </Box>
        <Divider sx={{ my: { xs: 1, md: 2 } }} flexItem>
          <Star fontSize="small" />
        </Divider>
        <Stack spacing={2}>
          <RoleDetails>
            <RoleDetails.Title>
              <Comment fontSize="small" /> Description
            </RoleDetails.Title>
            <RoleDetails.Body>{curRole?.desc}</RoleDetails.Body>
          </RoleDetails>
          {!!curRole?.tips?.length && (
            <RoleDetails>
              <RoleDetails.Title>
                <TipsAndUpdates fontSize="small" /> Tips
              </RoleDetails.Title>
              <RoleDetails.Body>
                {curRole.tips.map((tip: string, i) => (
                  <Box
                    key={i}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                    sx={{ ":last-child": { mb: 0 } }}
                  >
                    <Circle sx={{ fontSize: "10px" }} /> {tip}
                  </Box>
                ))}
              </RoleDetails.Body>
            </RoleDetails>
          )}
        </Stack>
      </ContainerBox>
    </Section>
  );
}

export default Role;
