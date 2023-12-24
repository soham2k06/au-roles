"use client";

import {
  Box,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  capitalize,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FullPageLoader, GlassButton, Section } from "@/components";

import { getHomeHref, getShortForm, replaceDash } from "@/utils";
import { useRoles } from "./useRoles";
import { RoleProps } from "@/types";

import { CloudOff } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const tabProps = (index: number) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

const tabs = [
  {
    id: 0,
    label: "Town Of Host Enhanced",
  },
  {
    id: 1,
    label: "Town Of Host",
  },
];

function Roles({
  roleTeam,
}: {
  roleTeam: "crewmate" | "neutral" | "impostor" | "add-on";
}) {
  const [value, setValue] = useState<number>(0);

  const {
    roles,
    isFetching: isLoading,
  }: { roles: RoleProps[]; isFetching: boolean } = useRoles(
    { team: roleTeam },
    ["name", "mod", "isActive"]
  );

  const handleChange = (_: any, newValue: number) => setValue(newValue);

  useEffect(() => {
    document.title = capitalize(`${roleTeam} roles`);
  }, []);

  if (isLoading) return <FullPageLoader />;

  const rolesByMod: RoleProps[] = roles.filter((role) => {
    return role.mod === tabs.find((tab) => tab.id === value)?.label;
  });

  return (
    <Section>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Section.Title gutterBottom={false}>{roleTeam} roles</Section.Title>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <Box width="fit-content">
          <Tabs
            sx={{
              bgcolor: "#151920cc",
              backdropFilter: "blur(0.5px)",
              border: 1,
              borderColor: "#2f343b",
              borderRadius: 2,
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                label={getShortForm(tab.label)}
                sx={{ fontSize: { xs: 20, sm: 28 } }}
                {...tabProps(tab.id)}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />

      {tabs.map((tab) => (
        <CustomTabPanel key={tab.id} value={value} index={tab.id}>
          {rolesByMod.length ? (
            <>
              <RolesGrid
                filteredRoles={rolesByMod.filter((role) => role.isActive)}
                gridName="active"
                roleTeam={roleTeam}
              />
              <Divider
                sx={{ my: 2 }}
                hidden={!rolesByMod.some((role) => !role.isActive)}
              />
              <RolesGrid
                filteredRoles={rolesByMod.filter((role) => !role.isActive)}
                gridName="inactive"
                roleTeam={roleTeam}
              />
            </>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              zIndex={-1}
              left={0}
              top={0}
              height="100%"
              width="100%"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <CloudOff sx={{ width: 100, height: 100 }} />
                <Typography>No Data to Show</Typography>
              </Box>
            </Box>
          )}
        </CustomTabPanel>
      ))}
    </Section>
  );
}

function RolesGrid({
  filteredRoles,
  roleTeam,
  gridName,
}: {
  filteredRoles: RoleProps[];
  roleTeam: string;
  gridName: string;
}) {
  const homeHref = getHomeHref(status);
  if (!filteredRoles.length) return;
  return (
    <Box key={gridName}>
      <Typography sx={{ mb: 2 }}>{gridName} Roles</Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} mb={3}>
        {filteredRoles.map(({ name }, i: number) => (
          <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
            <Link
              href={`${homeHref + roleTeam}/[slug]`}
              as={`${homeHref + roleTeam}/${name}`}
            >
              <GlassButton
                sx={{
                  filter: gridName === "inactive" ? "brightness(0.8)" : "",
                }}
              >
                {replaceDash(name)}
              </GlassButton>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Roles;
