import { Box, Grid, Typography, TextField, Stack } from "@mui/material";
import useQRCode from "../hooks/useQRCode";
import useSizeInput from "../hooks/useSizeInput";
import EmbedSelector from "./EmbedSelector";
import ShapeSelector from "./ShapeSelector";

const sizeMax = 600;
const sizeMin = 50;

const exampleUrl = "https://www.example.com";

export function QRCode() {
  const { url, size, shape, embedSize, qrContainerRef, imageUrl, setImageUrl, iconComponent, setIconComponent, isUrlEmpty, onUrlChange, onSizeChange, onShapeChange, onEmbedSizeChange} = useQRCode({url: exampleUrl});
  const { input, error, handleChange } = useSizeInput(size, sizeMin, sizeMax, (val) => {
    onSizeChange({ target: { value: val } } as any);
  });

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid size={6}>
          <Stack spacing={2}>
            <TextField label="URL" value={url} onChange={onUrlChange} />
            <TextField type="text" inputMode="numeric" label="Size (Pixels)" value={input} onChange={handleChange} error={error} helperText={error ? "Size must be between 50 and 600" : ""} />
            <ShapeSelector shape={shape} onShapeChange={onShapeChange}/>
            <EmbedSelector imageUrl={imageUrl} setImageUrl={setImageUrl} iconComponent={iconComponent} setIconComponent={setIconComponent} embedSize={embedSize} setEmbedSize={onEmbedSizeChange}/>
          </Stack>
        </Grid>
        <Grid size={6}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
