import { Box, Grid, Typography, TextField, Stack } from "@mui/material";
import useQRCode from "../hooks/useQRCode";
import useSizeInput from "../hooks/useSizeInput";
import EmbedSelector from "./EmbedSelector";
import ShapeSelector from "./ShapeSelector";
import ColorPicker from "./ColorPicker";
import DownloadButtons from "./DownloadButtons";

const sizeMax = 600;
const sizeMin = 60;

const exampleUrl = "https://www.example.com";

export function QRCode() {
  const {
    url,
    size,
    iconComponentColor,
    setIconComponentColor,
    shape,
    embedSize,
    qrContainerRef,
    imageUrl,
    setImageUrl,
    iconComponent,
    setIconComponent,
    dotsOptionsColor,
    setDotsOptionsColor,
    isUrlEmpty,
    onUrlChange,
    onSizeChange,
    onShapeChange,
    onEmbedSizeChange,
    onDownloadClick,
  } = useQRCode({ url: exampleUrl, qrCodeSize: 350});
  const { input, error, handleChange } = useSizeInput(size, sizeMin, sizeMax, (val) => {
    onSizeChange({ target: { value: val } } as any);
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      <Box
        display="flex"
        alignItems="baseline"
        gap={1}
        mb={3}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          letterSpacing={-0.5}
        >
          QRGen
        </Typography>

        <Typography color="text.secondary">
          Customizable QR codes
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid size={{xs: 12, sm: 12, md:6}} order={{xs: 2, sm: 2, md: 1}}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ textTransform: "uppercase", letterSpacing: 1, mb: 1 }}
            >
              Customize
            </Typography>
            <Stack gap={2}>
              <TextField sx={{width:'60%'}} label="Data" value={url} onChange={onUrlChange} />
              <TextField sx={{width:'120px'}} type="text" inputMode="numeric" label="Size (Pixels)" value={input} onChange={handleChange} error={error} helperText={error ? `Size must be between ${sizeMin} and ${sizeMax}` : ""} />
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
                alignItems="flex-start"
              >
                <ShapeSelector shape={shape} onShapeChange={onShapeChange} />
                <ColorPicker title="QR Code Color" color={dotsOptionsColor} onColorChange={setDotsOptionsColor} />
                <EmbedSelector
                  iconComponentColor={iconComponentColor ?? dotsOptionsColor}
                  setIconComponentColor={setIconComponentColor}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  iconComponent={iconComponent}
                  setIconComponent={setIconComponent}
                  embedSize={embedSize}
                  setEmbedSize={onEmbedSizeChange}
                />

                <DownloadButtons
                  disabled={isUrlEmpty}
                  onDownload={onDownloadClick}
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid size={{xs: 12, sm: 12, md:6}} order={{xs: 1, sm: 1, md:2}}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 360,
            }}
          >
            {
            isUrlEmpty ? (
              <Typography color="text.secondary">
                Enter a URL to generate a QR code
              </Typography>
            ) : (
                <Box 
                  id="qr-code-container" 
                  ref={qrContainerRef} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
