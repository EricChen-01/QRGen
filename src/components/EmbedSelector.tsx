import { Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, IconButton, Stack} from "@mui/material";
import { Upload, GitHub, Instagram, Link, Facebook, LinkedIn, YouTube, type SvgIconComponent } from "@mui/icons-material";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

type EmbedSizePreset = "small" | "medium" | "large";

type EmbedMode = "none" | "image" | "icon";

const EMBED_SIZE_MAP: Record<EmbedSizePreset, number> = {
  small: 0.2,
  medium: 0.35,
  large: 0.5,
};

const NUMBER_TO_PRESET: Record<number, EmbedSizePreset> = {
  0.2: "small",
  0.35: "medium",
  0.5: "large",
};

const ICONS = [
  { key: "linkedin", component: LinkedIn },
  { key: "github", component: GitHub },
  { key: "instagram", component: Instagram },
  { key: "link", component: Link },
  { key: "facebook", component: Facebook },
  { key: "youtube", component: YouTube },
];

interface EmbedSelectorProps {
  imageUrl: string | undefined;
  setImageUrl: (url: string | undefined) => void;
  iconComponent: React.ElementType | undefined;
  setIconComponent: (icon: SvgIconComponent | undefined) => void;
  iconComponentColor: string;
  setIconComponentColor: (color: string) => void;
  embedSize: number;
  setEmbedSize: (sizeFraction: number) => void;
}

export default function EmbedSelector({ imageUrl, setImageUrl, iconComponent, setIconComponent, embedSize, setEmbedSize, iconComponentColor, setIconComponentColor}: EmbedSelectorProps) {
  const [mode, setMode] = useState<EmbedMode>("none");
  const [urlInput, setUrlInput] = useState<string>("");

  const handleEmbedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as EmbedMode;
    setMode(val);
    
    if (val === "image") {
      // select image mode; keep existing imageUrl or set a default
      setIconComponent(undefined);
      if (!imageUrl) setImageUrl(undefined);
    } else if (val === "icon") {
      // select icon mode; clear explicit image so iconBlob is used
      setImageUrl(undefined);
      if (!iconComponent) setIconComponent(undefined);
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

  const handleEmbedSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Embed size changed:", event.target.value);
    setEmbedSize(EMBED_SIZE_MAP[event.target.value as EmbedSizePreset]);
  };
  
  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  
  return (
    <FormControl focused={false}>
      <FormLabel>Logo</FormLabel>
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

      {mode === "icon" && (
        <Stack spacing={1.5} mt={1}>
          <FormLabel>Icon</FormLabel>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(48px, 1fr))"
            gap={1}
            maxWidth={320}
            >
              {ICONS.map(({ key, component: Icon }) => {
                const selected = iconComponent === Icon;
                return (
                  <IconButton
                    key={key}
                    size="large"
                    onClick={() => setIconComponent(Icon)}
                    sx={{
                      borderRadius: 2,
                      border: selected ? 2 : 1,
                      borderColor: selected ? "primary.main" : "divider",
                      backgroundColor: selected ? "action.selected" : "transparent",
                    }}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
          </Box>
          <Typography variant="caption" color="text.secondary">
            Select an icon to display in the center of the QR code
          </Typography>
          <Stack spacing={1.5} mt={1}>
            <ColorPicker title="Icon Color" color={iconComponentColor} onColorChange={setIconComponentColor}/>
            <Typography variant="caption" color="text.secondary">
              This controls the icon color only
            </Typography>
          </Stack>
        </Stack>
      )}

      {(mode === "image" || mode === "icon") && (
        <Box mt={2}>
          <FormLabel component="legend">Size</FormLabel>
          <RadioGroup
            row
            value={NUMBER_TO_PRESET[embedSize]}
            onChange={handleEmbedSizeChange}
          >
            <FormControlLabel
              value="small"
              control={<Radio size="small" />}
              label="Small"
            />
            <FormControlLabel
              value="medium"
              control={<Radio size="small" />}
              label="Medium"
            />
            <FormControlLabel
              value="large"
              control={<Radio size="small" />}
              label="Large"
            />
          </RadioGroup>
        </Box>
      )}
    </FormControl>
  );
}
