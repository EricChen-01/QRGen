import {
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";

type FileExtension = "png" | "svg" | "jpeg" | "webp";

interface DownloadButtonsProps {
  onDownload: (ext: FileExtension) => void;
  disabled?: boolean;
}

const FORMATS: FileExtension[] = ["png", "svg", "jpeg", "webp"];

export default function DownloadButtons({ onDownload,  disabled = false, }: DownloadButtonsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box display="flex">
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        disabled={disabled}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Download
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {FORMATS.map(ext => (
          <MenuItem
            key={ext}
            onClick={() => {
              onDownload(ext);
              setAnchorEl(null);
            }}
          >
            {ext.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
