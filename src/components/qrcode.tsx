import { Box, Grid, Typography, TextField, Stack, Slider } from "@mui/material";
import useQRCode from "../hooks/useQRCode";
import EmbedSelector from "./EmbedSelector";
import ShapeSelector from "./ShapeSelector";
import ColorPicker from "./ColorPicker";
import DownloadButtons from "./DownloadButtons";
import SizeSlider from "./SizeSlider";

const sizeMin = 200;
const sizeMax = 3000;
const sizeMid = (sizeMax + sizeMin) / 2
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
  } = useQRCode({ url: exampleUrl, qrCodeSize: sizeMid});

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
              {/* <TextField sx={{width:'120px'}} type="text" inputMode="numeric" label="Size (Pixels)" value={input} onChange={handleChange} error={error} helperText={error ? `Size must be between ${sizeMin} and ${sizeMax}` : ""} /> */}
              <SizeSlider
                sizeMin={sizeMin}
                sizeMax={sizeMax}
                sliderValue={size}
                onQrCodeSizeChange={onSizeChange}
              />
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
                  ref={qrContainerRef} 
                  sx={{
                    // width: "100%",
                    // maxWidth: "350px",
                    "& canvas": {
                      width: "300px !important",
                      height: "300px !important"
                      // width: "100% !important",
                      // height: "auto",
                      // display: "block",
                    }
                  }}
                />
            )}
          </Box>
        </Grid>
        <Grid size={{xs:12}} order={{xs: 3}}>
          
        </Grid>
      </Grid>
    </Box>
  );
}
