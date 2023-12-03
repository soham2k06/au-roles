"use client";

import { Grid, capitalize } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { GlassButton, Section } from "@/components";
import { roles } from "@/utils";

type RoleType = "crewmate" | "neutral" | "impostor" | "add-on";

interface MyComponentProps {
  roleType: RoleType;
}

function Roles({ roleType }: MyComponentProps) {
  useEffect(() => {
    document.title = capitalize(`${roleType} roles`);
  }, []);
  return (
    <Section>
      <Section.Title>{roleType} roles</Section.Title>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {roles
          .filter((role) => role.team === roleType)
          .map(({ name }, i) => (
            <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
              <Link href={`/${roleType}/[slug]`} as={`/${roleType}/${name}`}>
                <GlassButton>{name.replace("-", " ")}</GlassButton>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Section>
  );
}

export default Roles;
