import React, { useEffect, useRef, useState, useMemo } from "react";
import QRCodeStyling, { type DotType, type ShapeType } from "qr-code-styling";
import ReactDOMServer from "react-dom/server";
import type { SvgIconComponent } from "@mui/icons-material";

interface UseQRCodeWithProps {
  url?:string;
  IconComponent?: SvgIconComponent; // optional MUI icon component
  imageUrl?: string; // optional image URL
}

export default function useQRCode({ url: initialUrl, IconComponent: initialIconComponent, imageUrl: initialImageUrl }: UseQRCodeWithProps = {}) {
  const [url, setUrl] = useState(initialUrl || "");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [shape, setShape] = useState<ShapeType>("square");
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const [embedSize, setEmbedSize] = useState(0.35);
  const [iconComponent, setIconComponent] = useState<SvgIconComponent | undefined>(initialIconComponent);
  const [iconBlobUrl, setIconBlobUrl] = useState<string | undefined>(undefined);
  const [dotsOptionsColor, setDotsOptionsColor] = useState<string>("#000000");

  const qrContainerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  // Initialize QR code once and append its element to the container.
  useEffect(() => {
    console.log("Initializing QR Code for the first time.");
    qrCodeRef.current = new QRCodeStyling({
      width,
      height,
      type: "svg",
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
      },
    });

    if (qrCodeRef.current) {
      // Ensure appended if styling is sufficiently initialized
      console.log("Appending QR Code to container on init.");
      qrCodeRef.current.append(qrContainerRef.current!);
    }
  }, []);

  // Update QR code when relevant state changes.
  useEffect(() => {
    if (!qrCodeRef.current || !qrContainerRef.current) {
        console.log("QR or container not ready");
        return;
    }

    const finalImageUrl = imageUrl ?? iconBlobUrl;

    // Ensure the QR element has been appended to the container before updating.
    if (!qrContainerRef.current.hasChildNodes()) {
      try {
        console.log("There is no container ref for the QR code yet, appending.");
        qrCodeRef.current.append(qrContainerRef.current);
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
      imageOptions: { crossOrigin: "anonymous", margin: 0, imageSize: embedSize},
      dotsOptions: { color: dotsOptionsColor, type: "rounded" as DotType},
    };

    console.log("Updating QR Code with", updated);
    qrCodeRef.current.update(updated);
  }, [url, width, height, shape, imageUrl, iconBlobUrl, embedSize, dotsOptionsColor]);

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

  const onEmbedSizeChange = (sizeFraction: number) => {
    setEmbedSize(sizeFraction);
  }

  const onDownloadClick = () => {
    const qrCode = qrCodeRef.current;
    console.log("Downloading QR Code: ", qrCode?._options);

    qrCode?.download({
      extension: "png"
    });
  }

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
    onEmbedSizeChange,
    isUrlEmpty,
    imageUrl,
    setImageUrl,
    iconComponent,
    setIconComponent,
    embedSize,
    setEmbedSize,
    dotsOptionsColor,
    setDotsOptionsColor,
    onDownloadClick,
  };
}

