import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMediaQuery } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 200,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function CustomSelect({ label, options, value, onChange }) {
  const matches = useMediaQuery("(max-width:1024px)");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <FormControl sx={{ minWidth: 100, maxWidth: 200 }}>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Name" notched={false} />}
        MenuProps={MenuProps}
        placeholder={label}
        sx={{
          padding: 0,
          fontSize: matches && "0.8rem",
          ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
            {
              padding: "10px !important",
              width: 100,
            },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
