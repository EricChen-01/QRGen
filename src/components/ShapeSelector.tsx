import { Radio, RadioGroup, FormControlLabel, FormLabel, Box} from "@mui/material";

interface ShapeSelectorProps {
  shape: string;
  onShapeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ShapeSelector({ shape, onShapeChange }: ShapeSelectorProps) {
  return (
    <Box>
        <FormLabel id="demo-row-radio-buttons-group-label">QR Code Shape</FormLabel>
        <RadioGroup
        row
        defaultValue="square"
        value={shape}
        onChange={onShapeChange}
        >
          <FormControlLabel value="square" control={<Radio />} label="Square" />
          <FormControlLabel value="circle" control={<Radio />} label="Circle" />
        </RadioGroup>
    </Box>
  );
}
