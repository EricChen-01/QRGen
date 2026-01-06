import { Box, Typography} from "@mui/material";
import { ChromePicker, type ColorResult } from "react-color";

interface ColorPickerProps {
    color: string;
    onColorChange: (newColor: string) => void;
}

export default function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  return (
    <Box mt={2}>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Color Picker
      </Typography>
      
      <ChromePicker
        color={color}
        onChange={(updatedColor: ColorResult) => onColorChange(updatedColor.hex)}
        disableAlpha
      />
    </Box>
  );
}
