import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";

type QRKey = "wifi" | "vcard" | "url" | "text" | "event";

const qrSamples: Record<
  QRKey,
  { label: string; description: string; preview: string; value: string }
> = {
  wifi: {
    label: "Wi-Fi",
    description: "Lets users join a network instantly.",
    preview: "WIFI:T:WPA;S:<SSID>;P:<PASSWORD>;;",
    value: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;",
  },
  vcard: {
    label: "vCard",
    description: "Share contact details in one scan.",
    preview: "BEGIN:VCARD\nFN:<Name>\nTEL:<Phone>\nEND:VCARD",
    value: `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Example Inc.
TEL:+1234567890
EMAIL:john@example.com
END:VCARD`,
  },
  url: {
    label: "URL",
    description: "Open a website or link.",
    preview: "https://example.com",
    value: "https://example.com",
  },
  text: {
    label: "Text",
    description: "Display plain text or a short message.",
    preview: "Hello world!",
    value: "Hello! This is a sample QR code text.",
  },
  event: {
    label: "Event",
    description: "Add an event to a calendar.",
    preview: "SUMMARY:<Title>\nDTSTART:<Start>\nDTEND:<End>",
    value: `BEGIN:VEVENT
SUMMARY:Meeting
LOCATION:Office
DTSTART:20260109T100000
DTEND:20260109T110000
END:VEVENT`,
  },
};

export default function QRTipsCard() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.default",
        minHeight: 360,
      }}
    >
      <Stack spacing={1.5}>
        {/* Header */}
        <Box>
          <Typography variant="subtitle1" fontWeight={500}>
            QR Code Tips
          </Typography>
          <Typography
            variant="caption"
            align="center"
            color="text.secondary"
            sx={{ mt: 0.25 }}
          >
            Common formats and what to edit
          </Typography>
        </Box>

        <Divider />

        {/* Tips */}
        {Object.entries(qrSamples).map(([key, item], index, arr) => (
          <Box key={key}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{item.label}</Typography>

              <Button
                size="small"
                variant="text"
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  px: 0.5,
                }}
                onClick={() => handleCopy(item.value)}
              >
                Copy
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              {item.description}
            </Typography>

            <Box
              sx={{
                mt: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                backgroundColor: "action.hover",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "text.secondary",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.preview}
            </Box>

            {index < arr.length - 1 && (
              <Divider sx={{ mt: 1.25, opacity: 0.4 }} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
