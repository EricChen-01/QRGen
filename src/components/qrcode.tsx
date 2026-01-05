import { Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, IconButton, Stack } from "@mui/material";
import useQRCode from "../hooks/useQRCode";
import useSizeInput from "../hooks/useSizeInput";
import EmbedSelector from "./EmbedSelector";

const sizeMax = 600;
const sizeMin = 50;

const testImageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

export function QRCode() {
  const { size, qrContainerRef, imageUrl, setImageUrl, iconComponent, setIconComponent, isUrlEmpty, onUrlChange, onSizeChange, onShapeChange} = useQRCode();
  const { input, error, handleChange } = useSizeInput(size, sizeMin, sizeMax, (val) => {
    onSizeChange({ target: { value: val } } as any);
  });

  return (
    <Box>
      <TextField
        label="URL"
        onChange={onUrlChange}
      />
      <TextField
      type="text"
      inputMode="numeric"
      label="Size (Pixels)"
      value={input}
      onChange={handleChange}
      error={error}
      helperText={error ? "Size must be between 50 and 600" : ""}
      />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">QR Code Shape</FormLabel>
        <RadioGroup
          row
          defaultValue="square"
          onChange={onShapeChange}
        >
          <FormControlLabel value="square" control={<Radio />} label="Square" />
          <FormControlLabel value="circle" control={<Radio />} label="Circle" />
        </RadioGroup>
      </FormControl>
      <EmbedSelector
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        iconComponent={iconComponent}
        setIconComponent={setIconComponent}
      />

      <Box mt={2}>
        {
        isUrlEmpty ? (
          <Typography color="text.secondary">
            Enter a URL to generate a QR code
          </Typography>
        ) : (
          <Box id="qr-code-container" ref={qrContainerRef}/>
        )}
      </Box>
    </Box>
  );
}
