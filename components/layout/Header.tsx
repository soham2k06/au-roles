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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { appBarItems } from "@/utils";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* PC logo */}
          <Avatar
            variant="rounded"
            sx={{
              mr: 2,
              display: { xs: "none", md: "block" },
              cursor: "pointer",
            }}
          >
            <Link href="/">
              <Image src="/logo.png" width={40} height={40} alt="logo" />
            </Link>
          </Avatar>

          {/* Mobile logo */}
          <Avatar
            variant="rounded"
            sx={{
              display: { xs: "block", md: "none" },
              width: 32,
              height: 32,
            }}
          >
            <Link href="/">
              <Image src="/logo.png" width={32} height={32} alt="logo" />
            </Link>
          </Avatar>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                      <Link href={"/" + item}>{item}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>

          {/* PC items */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {appBarItems.map((item) => (
              <Link key={item} href={"/" + item}>
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

          {/* <Box display="flex" justifyContent="end" width="100%">
            <SearchBar />
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
