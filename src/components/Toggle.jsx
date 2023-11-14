import { Box, IconButton } from "@mui/material";
import { useThemeContext } from "../ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Toggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
      }}
    >
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? (
          <Brightness7Icon sx={{ color: "orange" }} />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}
