import { Box, Popover, FormLabel} from "@mui/material";
import { ChromePicker, type ColorResult } from "react-color";
import { useState, useEffect } from "react";

interface ColorPickerProps {
  title?: string;
  color: string;
  onColorChange: (newColor: string) => void;
}

export default function ColorPicker({ title="Color Picker", color, onColorChange }: ColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [draftColor, setDraftColor] = useState(color);

  useEffect(() => {
    // Sync draftColor with parent color when parent changes externally
    setDraftColor(color);
  }, [color]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <FormLabel>{title}</FormLabel>
      <Box
        onClick={handleClick}
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1,
          backgroundColor: draftColor,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ChromePicker
          color={draftColor}
          disableAlpha
          onChange={(updatedColor: ColorResult) => setDraftColor(updatedColor.hex)}
          
          // FINAL update only on release
          onChangeComplete={(updatedColor: ColorResult) => onColorChange(updatedColor.hex)}
        />
      </Popover>
    </Box>
  );
}
