import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Tooltip,
  FormLabel,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { useState } from "react";

type FileExtension = "png" | "svg" | "jpeg" | "webp";

interface DownloadButtonsProps {
  onDownload: (ext: FileExtension) => void;
  disabled?: boolean;
}

const FORMATS: FileExtension[] = ["png", "svg", "jpeg", "webp"];

export default function DownloadButtons({
  onDownload,
  disabled = false,
}: DownloadButtonsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box>
      <FormLabel>Download</FormLabel>
      <Box display="flex" alignItems="center">
        <Tooltip title="Download QR code">
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            disabled={disabled}
            sx={{
              color: "primary.main",
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.16)",
              },
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 140,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {FORMATS.map((ext) => (
            <MenuItem
              key={ext}
              onClick={() => {
                onDownload(ext);
                setAnchorEl(null);
              }}
              sx={{
                py: 1,
                px: 2,
                borderRadius: 1,
                "&:hover": { backgroundColor: "primary.light" },
              }}
            >
              <ListItemIcon>
                <FilePresentIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" fontWeight={500}>
                {ext.toUpperCase()}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
