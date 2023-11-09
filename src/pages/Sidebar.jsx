import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.primary,
    color: theme.palette.common.white,
  },
  marginLeft: 0,
  width: "100%",
}));

function RenderList({ navItems, onCloseDrawer = () => {} }) {
  const navigate = useNavigate();

  const location = useLocation();

  console.log({ location });

  const [active, setActive] = useState(location.pathname || "/");

  const theme = useTheme();

  useEffect(() => {
    navigate(active);
  }, [active]);
  return (
    <List>
      {navItems.map((data, index) => (
        <ListItem
          key={data.name}
          disablePadding
          onClick={() => {
            setActive(data.route);
            onCloseDrawer();
          }}
          sx={{ mt: 1 }}
        >
          <StyledListItemButton
            sx={{
              backgroundColor:
                active === data.route && theme.palette.primary.primary,
              color: active === data.route && theme.palette.common.white,
              ":hover": {
                bgcolor: "secondary",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 20,
                mr: 2,
              }}
            >
              {data.icon}
            </ListItemIcon>
            <ListItemText
              primary={data.name}
              sx={{
                ".css-10hburv-MuiTypography-root": {
                  fontSize: "0.8rem !important",
                },
              }}
            />
          </StyledListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export function RenderDrawer({ navItems, open, onCloseDrawer }) {
  return (
    <Drawer anchor={"left"} open={open} onClose={onCloseDrawer}>
      <Sidebar navItems={navItems} onCloseDrawer={onCloseDrawer} />
    </Drawer>
  );
}

export function Sidebar({ navItems, onCloseDrawer }) {
  const matches = useMediaQuery("(max-width:760px)");
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: matches ? "40vw !important" : "100%",
        "& .MuiDrawer-paper": {
          maxWidth: matches ? "80vw !important" : 250,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <RenderList navItems={navItems} onCloseDrawer={onCloseDrawer} />
    </Box>
  );
}
