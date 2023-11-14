import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { RenderDrawer, Sidebar } from "./Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./common.css";
import {
  AccountBalance,
  AttachMoney,
  Contacts,
  Description,
  Notifications,
  Person,
  Dashboard as DI,
  MenuOutlined,
} from "@mui/icons-material";
import CustomTable from "../components/CustomTable";
import CustomSelect from "../components/CustomSelect";
import LineChart from "../components/LineChart";
import BarChartSection from "../components/BarChartSection";
import StackedBar from "../components/StackedBar";
import { ModalSearch, RenderSearch } from "../components/ModalSearch";
import Toggle from "../components/Toggle";
import { useThemeContext } from "../ThemeContext";

const navItems = [
  { name: "Dashboard", route: "/", icon: <DI /> },
  {
    name: "Accounts",
    route: "/accounts",
    icon: <AccountBalance />,
  },
  { name: "Payroll", route: "/payroll", icon: <AttachMoney /> },
  { name: "Reports", route: "/reports", icon: <Description /> },
  { name: "Advisor", route: "/advisor", icon: <Person /> },
  { name: "Contacts", route: "/contacts", icon: <Contacts /> },
];

const Main = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.primary.bgcolor, 0.4),
  marginLeft: 0,
  width: "100%",
}));

const StyledIcon = styled(IconButton)(() => ({
  p: 0,
  cursor: "pointer",
  ":active": {
    border: "none",
    outline: "none",
  },
  ":focus": {
    border: "none",
    outline: "none",
  },
}));

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const accountOptions = ["Manage", "Auto"];

export default function Dashboard() {
  const { isDarkMode } = useThemeContext();

  const matchesLarge = useMediaQuery("(max-width:1024px)");

  const matches = useMediaQuery("(max-width:760px)");

  const mobileMatch = useMediaQuery("(max-width:640px)");

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [isOpenSideBar, setIsOpenSideBar] = React.useState(false);

  const [searchOpen, setSearchOpen] = React.useState(false);

  const [selectedAccount, setSelectedAccount] = React.useState(
    accountOptions[0]
  );

  const [selectedMonth, setSelectedMonth] = React.useState(monthOptions[0]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: isDarkMode && "#213547",
          }}
        >
          <Box
            aria-label="open drawer"
            sx={{ mr: 2, display: "flex", alignItems: "center" }}
          >
            <img
              className="brand-logo"
              src="../../assets/logo.jpg"
              alt="brand-logo"
              width="500"
              height="200"
            />
          </Box>
          <Stack flexDirection={"row"} alignItems={"center"} sx={{ gap: 3 }}>
            {!mobileMatch && <RenderSearch />}

            {mobileMatch && (
              <>
                <SearchIcon
                  onClick={() => setSearchOpen(true)}
                  sx={{ color: isDarkMode && "white" }}
                />
                <ModalSearch
                  open={searchOpen}
                  onClose={() => setSearchOpen(false)}
                />
              </>
            )}
            <Badge
              variant="dot"
              color="success"
              sx={{
                ".css-17614jb-MuiBadge-badge": {
                  right: 6,
                  top: 2,
                  cursor: "pointer",
                },
              }}
            >
              <Notifications
                color="action"
                sx={{ color: isDarkMode && "white" }}
              />
            </Badge>
            <Toggle />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <StyledIcon onClick={handleOpenUserMenu}>
                  <Avatar alt="Remy Sharp" src="../../assets/avataaars.svg" />
                  <ArrowDropDownOutlinedIcon
                    sx={{ color: isDarkMode && "white" }}
                  />
                </StyledIcon>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {matches && (
              <Box display="flex" onClick={() => setIsOpenSideBar(true)}>
                <MenuOutlined
                  color="action"
                  sx={{ color: isDarkMode && "white" }}
                />
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box>
        <Grid container rowSpacing={2}>
          {matches && (
            <RenderDrawer
              navItems={navItems}
              open={isOpenSideBar}
              onCloseDrawer={() => setIsOpenSideBar(false)}
            />
          )}
          {!matches && (
            <Grid item xs={2} sx={{ p: 0 }}>
              <Sidebar navItems={navItems} />
            </Grid>
          )}
          <Grid item xs={matches ? 12 : 10} sx={{ height: "100%" }}>
            <Main sx={{ p: 3, pb: 0 }}>
              <Grid
                container
                columnSpacing={matchesLarge && !matches ? 1 : 3}
                rowSpacing={3}
              >
                <Grid item xs={12} md={6} sx={{ m: 0 }}>
                  <Box sx={{ bgcolor: "white" }}>
                    <Box
                      display={"flex"}
                      style={{ padding: 15 }}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <h3>Checking account</h3>
                      <Box display={"flex"} gap={2}>
                        <CustomSelect
                          label={"Select account..."}
                          options={accountOptions}
                          value={selectedAccount}
                          onChange={setSelectedAccount}
                        />
                        <CustomSelect
                          label={"Select month..."}
                          options={monthOptions}
                          value={selectedMonth}
                          onChange={setSelectedMonth}
                        />
                      </Box>
                    </Box>
                    <hr />
                    <LineChart
                      selectedAccount={selectedAccount}
                      selectedMonth={selectedMonth}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ m: 0 }}>
                  <BarChartSection />
                </Grid>
                <Grid item xs={12} md={6} sx={{ m: 0, minHeight: 200 }}>
                  <StackedBar />
                </Grid>
                <Grid item xs={12} md={6} sx={{ m: 0 }}>
                  <Box sx={{ bgcolor: "white" }}>
                    <h3 style={{ padding: 15 }}>Account watchlist</h3>
                    <hr />
                    <CustomTable />
                  </Box>
                </Grid>
              </Grid>
            </Main>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
