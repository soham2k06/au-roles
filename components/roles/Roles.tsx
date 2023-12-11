"use client";

import { Grid, capitalize } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { FullPageLoader, GlassButton, Section } from "@/components";

import { useSession } from "next-auth/react";
import { getHomeHref, replaceDash } from "@/utils";
import { useRoles } from "./useRoles";
import { RoleProps } from "@/types";

function Roles({
  roleTeam,
}: {
  roleTeam: "crewmate" | "neutral" | "impostor" | "add-on";
}) {
  const {
    roles,
    isFetching: isLoading,
  }: { roles: RoleProps[]; isFetching: boolean } = useRoles(
    { team: roleTeam },
    "name"
  );

  const { status } = useSession();
  const homeHref = getHomeHref(status);

  useEffect(() => {
    document.title = capitalize(`${roleTeam} roles`);
  }, []);

  if (isLoading) return <FullPageLoader />;
  return (
    <Section>
      <Section.Title>{roleTeam} roles</Section.Title>
      <Grid container spacing={{ xs: 1, md: 2 }} mb={3}>
        {roles.map(({ name }, i: number) => (
          <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
            <Link
              href={`${homeHref + roleTeam}/[slug]`}
              as={`${homeHref + roleTeam}/${name}`}
            >
              <GlassButton>{replaceDash(name)}</GlassButton>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

export default Roles;
