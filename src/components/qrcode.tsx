import { Box, Grid, Typography, TextField, Stack } from "@mui/material";
import useQRCode from "../hooks/useQRCode";
import useSizeInput from "../hooks/useSizeInput";
import EmbedSelector from "./EmbedSelector";
import ShapeSelector from "./ShapeSelector";
import ColorPicker from "./ColorPicker";

const sizeMax = 600;
const sizeMin = 50;

const exampleUrl = "https://www.example.com";

export function QRCode() {
  const { url, size, shape, embedSize, qrContainerRef, imageUrl, setImageUrl, iconComponent, setIconComponent, dotsOptionsColor, setDotsOptionsColor, isUrlEmpty, onUrlChange, onSizeChange, onShapeChange, onEmbedSizeChange} = useQRCode({url: exampleUrl});
  const { input, error, handleChange } = useSizeInput(size, sizeMin, sizeMax, (val) => {
    onSizeChange({ target: { value: val } } as any);
  });

  return (
    <Box>
      <Box
        display="flex"
        alignItems="baseline"
        gap={1.5}
        mb={3}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          letterSpacing={-0.5}
        >
          QRGen
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
        >
          QR Code Styler
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid size={{xs: 12, sm: 6}} order={{xs: 2, sm: 1}}>
          <Stack spacing={2}>
            <TextField label="Data" value={url} onChange={onUrlChange} />
            <TextField type="text" inputMode="numeric" label="Size (Pixels)" value={input} onChange={handleChange} error={error} helperText={error ? "Size must be between 50 and 600" : ""} />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems="flex-start"
            >
              <ShapeSelector shape={shape} onShapeChange={onShapeChange} />
              <EmbedSelector
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                iconComponent={iconComponent}
                setIconComponent={setIconComponent}
                embedSize={embedSize}
                setEmbedSize={onEmbedSizeChange}
              />
              <ColorPicker color={dotsOptionsColor} onColorChange={setDotsOptionsColor} />
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{xs: 12, sm: 6}} order={{xs: 1, sm: 2}}>
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
