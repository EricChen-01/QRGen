import { Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, IconButton, Stack } from "@mui/material";
import { AddToHomeScreen, Upload, type SvgIconComponent } from "@mui/icons-material";
import { useState } from "react";


const testImageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

interface EmbedSelectorProps {
  imageUrl: string | undefined;
  setImageUrl: (url: string | undefined) => void;
  iconComponent: React.ElementType | undefined;
  setIconComponent: (icon: SvgIconComponent | undefined) => void;
}

type EmbedMode = "none" | "image" | "icon";

export default function EmbedSelector({ imageUrl, setImageUrl, iconComponent, setIconComponent }: EmbedSelectorProps) {
  const [mode, setMode] = useState<EmbedMode>("none");
  const [urlInput, setUrlInput] = useState();

  const handleEmbedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as EmbedMode;
    setMode(val);
    
    if (val === "image") {
      // select image mode; keep existing imageUrl or set a default
      setIconComponent(undefined);
      if (!imageUrl) setImageUrl(testImageUrl);
    } else if (val === "icon") {
      // select icon mode; clear explicit image so iconBlob is used
      setImageUrl(undefined);
      if (!iconComponent) setIconComponent(AddToHomeScreen);
    } else {
      // none
      setImageUrl(undefined);
      setIconComponent(undefined);
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value as any);
    setImageUrl(e.target.value);
  }

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  
  return (
    <FormControl>
      <FormLabel>Embed</FormLabel>
      <RadioGroup
        row
        value={mode}
        onChange={handleEmbedChange}
      >
        <FormControlLabel value="none" control={<Radio />} label="None" />
        <FormControlLabel value="image" control={<Radio />} label="Image" />
        <FormControlLabel value="icon" control={<Radio />} label="Icon" />
      </RadioGroup>
      {mode === "image" && (
        <Stack spacing={1.5} mt={1}>
          <TextField
            label="Image URL"
            size="small"
            value={urlInput}
            onChange={handleUrlInputChange}
            placeholder="https://example.com/logo.svg"
            fullWidth
          />

          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Box flex={1} height="1px" bgcolor="divider" />
            <Typography variant="caption" color="text.secondary">
              OR
            </Typography>
            <Box flex={1} height="1px" bgcolor="divider" />
          </Box>

          <Button
            variant="outlined"
            component="label"
            startIcon={<Upload />}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </Button>
        </Stack>
      )}

      {/* ICON MODE (placeholder for now) */}
      {mode === "icon" && (
        <Box mt={1} color="text.secondary">
          Icon selected
        </Box>
      )}
    </FormControl>
  );
}
