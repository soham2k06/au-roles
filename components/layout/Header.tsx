"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Avatar,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  MenuList,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { GlassButton } from "..";
import { appBarItems, getHomeHref } from "@/utils";
import { useSessionContext } from "@/contexts";

function Header() {
  const {
    session: { status },
    isAuthenticated,
  } = useSessionContext();
  const pathName = usePathname();

  const homeHref = getHomeHref(status);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (pathName.includes("signin")) return;
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "0",
        bgcolor: "#00040dcc",
        backdropFilter: "blur(8px)",
        justifyContent: "center",
        height: 64,
        boxShadow: "0px 4px 10px black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          {/* PC logo */}
          <Avatar
            variant="rounded"
            sx={{
              mr: 2,
              display: { xs: "none", md: "block" },
              cursor: "pointer",
            }}
          >
            <Link href={homeHref}>
              <Image src="/logo.png" width={40} height={40} alt="logo" />
            </Link>
          </Avatar>

          {/* Mobile logo */}
          <Box display={{ xs: "flex", md: "none" }}>
            <Avatar
              variant="rounded"
              sx={{
                display: "block",
                width: 32,
                height: 32,
              }}
            >
              <Link href={homeHref}>
                <Image src="/logo.png" width={32} height={32} alt="logo" />
              </Link>
            </Avatar>
          </Box>

          {/* Mobile menu button */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <IconButton
              color="inherit"
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuList>
                {appBarItems.map((item) => (
                  <MenuItem key={item} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href={homeHref + item}>{item}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>

          {/* PC items */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
            }}
          >
            {appBarItems.map((item) => (
              <Link key={item} href={homeHref + item}>
                <Button
                  color="inherit"
                  key={item}
                  onClick={handleCloseNavMenu}
                  sx={{
                    display: "block",
                    letterSpacing: "2px",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </Box>

          <Box display="flex">
            {status === "loading" ? (
              <Skeleton width={120} height={64} animation="wave"></Skeleton>
            ) : !isAuthenticated ? (
              <Link href="https://discord.gg/8reVZ4WC6Q" target="_blank">
                <Button
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    outline: "none",
                    cursor: "pointer",
                    borderRadius: "3px",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    lineHeight: "16px",
                    padding: "2px 16px",
                    height: "38px",
                    minWidth: "96px",
                    minHeight: "38px",
                    border: "none",
                    color: "#fff",
                    bgcolor: "rgb(88, 101, 242)",
                    transition: "background-color .17s ease,color .17s ease",
                    ":hover": {
                      bgcolor: "rgb(71, 82, 196)",
                    },
                  }}
                >
                  <Image
                    src="/discord.png"
                    alt="discord"
                    width={24}
                    height={20}
                  />
                  Server
                </Button>
              </Link>
            ) : (
              <GlassButton
                sx={{ height: { xs: 36, md: 40 } }}
                onClick={() => signOut()}
              >
                Sign out
              </GlassButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
