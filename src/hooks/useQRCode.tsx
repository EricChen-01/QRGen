import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import QRCodeStyling, { type ShapeType } from "qr-code-styling";
import ReactDOMServer from "react-dom/server";
import type { SvgIconComponent } from "@mui/icons-material";

interface UseQRCodeWithProps {
  IconComponent?: SvgIconComponent; // optional MUI icon component
  imageUrl?: string; // optional image URL
}

export default function useQRCode({ IconComponent: initialIconComponent, imageUrl: initialImageUrl }: UseQRCodeWithProps = {}) {
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [shape, setShape] = useState<ShapeType>("square");
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const [iconComponent, setIconComponent] = useState<SvgIconComponent | undefined>(initialIconComponent);
  const [iconBlobUrl, setIconBlobUrl] = useState<string | undefined>(undefined);

  const qrContainerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  // Initialize QR code once and append its element to the container.
  useEffect(() => {
    console.log("Initializing QR Code");
    qrCodeRef.current = new QRCodeStyling({
      width,
      height,
      shape,
      data: " ", // placeholder to avoid empty render
      dotsOptions: {
        color: "#000000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    const qr = qrCodeRef.current;
    const container = qrContainerRef.current;

    if (qr) {
      // Ensure appended if styling is sufficiently initialized
      console.log("Appending QR Code to container");
      qr.append(container!);
    }

    return () => {
    //   try {
    //     if (container) container.innerHTML = "";
    //   } catch (err) {
    //     // ignore cleanup errors
    //   }
    //   qrCodeRef.current = null;
    };
    // only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update QR code when relevant state changes.
  useEffect(() => {
    const qr = qrCodeRef.current;
    const container = qrContainerRef.current;
    if (!qr || !container) {
        console.log("QR or container not ready");
        return;
    }

    if (url.trim() === "") {
      console.log("URL is empty, clearing container");
      // Clear the container if URL is empty
      container.innerHTML = "";
      // keep a placeholder data to avoid library errors
      qr.update({ data: " " });
      return;
    }

    const finalImageUrl = imageUrl ?? iconBlobUrl;

    // Ensure the QR element has been appended to the container before updating.
    if (!container.hasChildNodes()) {
      try {
        qr.append(container);
      } catch (err) {
        // ignore append errors, will try to update anyway
      }
    }
    
    let updated = {
      width: width,
      height: height,
      data: url || " ",
      shape,
      image: finalImageUrl,
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
    };

    console.log("Updating QR Code with", updated);
    qr.update(updated);
  }, [url, width, height, shape, imageUrl, iconBlobUrl]);

  // Create a stable blob URL for the active IconComponent (if any).
  useEffect(() => {
    if (!iconComponent) {
      setIconBlobUrl(undefined);
      return;
    }

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        ${ReactDOMServer.renderToStaticMarkup(React.createElement(iconComponent))}
      </svg>
    `;

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    setIconBlobUrl(url);

    return () => {
      try {
        URL.revokeObjectURL(url);
      } catch (err) {
        // ignore revoke errors
      }
      setIconBlobUrl(undefined);
    };
  }, [iconComponent]);

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("URL changed:", event.target.value);
    setUrl(event.target.value);
  };

  const onShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShape(event.target.value as ShapeType);
  };

  const onSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(event.target.value, 10) || 0;
    setHeight(parsed);
    setWidth(parsed);
  };

  const isUrlEmpty = useMemo(() => url.trim() === "", [url]);

  return {
    url,
    size: width,
    shape,
    qrContainerRef,
    qrCodeRef,
    onSizeChange,
    onShapeChange,
    onUrlChange,
    isUrlEmpty,
    imageUrl,
    setImageUrl,
    iconComponent,
    setIconComponent,
  };
}

