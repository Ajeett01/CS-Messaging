import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "theme.palette.primary.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const DropDown = ({ label, menuItems, selectedId, setSelectedId }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedId(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200, marginTop: 2, }}>
      <StyledFormControl fullWidth>
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={selectedId}
          label={label}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
                '& .MuiMenuItem-root': {
                  padding: 2,
                },
              },
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
};

export default DropDown;

