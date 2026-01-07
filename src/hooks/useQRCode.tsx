import React, { useEffect, useRef, useState, useMemo } from "react";
import QRCodeStyling, { type FileExtension, type Options, type ShapeType } from "qr-code-styling";
import ReactDOMServer from "react-dom/server";
import type { SvgIconComponent } from "@mui/icons-material";

interface UseQRCodeWithProps {
  url?:string;
  IconComponent?: SvgIconComponent;
  imageUrl?: string; 
}

const qrCode: QRCodeStyling | null = new QRCodeStyling();

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
  const [iconComponentColor, setIconComponentColor] = useState<string | undefined>()

  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  // Create a stable blob URL for the active IconComponent (if any).
  useEffect(() => {
    if (!iconComponent) {
      setIconBlobUrl(undefined);
      return;
    }

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color: ${iconComponentColor ?? dotsOptionsColor};">
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
  }, [iconComponent, dotsOptionsColor, iconComponentColor]);

  // Append the QR code to the container and update it when inputs change.
  useEffect(() => {
    const container = qrContainerRef.current;
    if (!container){
      console.log("QR Container ref is null");
      return;
    }

    // Clear previous contents to avoid duplicated nodes
    container.innerHTML = "";

    // If there's no URL, leave container empty
    if (!url || url.trim() === "") {
      console.log("URL is empty, not rendering QR code");
      return;
    }

    try {
      const options: Partial<Options> | null = {
        width,
        height,
        data: url,
        type: "svg",
        shape,
        image: iconBlobUrl ?? imageUrl ?? undefined,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0,
          hideBackgroundDots: true,
          imageSize: embedSize,
        },
        dotsOptions: {
          color: dotsOptionsColor,
        },
      };

      // Update the existing instance (works even if created without options)
      console.log("Updating QR code with options:", options);
      qrCode?.update(options);

      if (!container.hasChildNodes()) {
        console.log("Initializing QR Code instance.");
        const container = qrContainerRef.current;
        // Append the rendered QR element into the container
        qrCode?.append(container!);
      }
    } catch (err) {
      console.error("Failed to render/update QR code", err);
    }

    // Cleanup: clear container when this effect is torn down
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [qrContainerRef, url, width, height, shape, imageUrl, iconBlobUrl, embedSize, dotsOptionsColor, iconComponentColor]);

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

  const onDownloadClick = (fileExtension: string) => {
    console.log("Current QR Code Opotions before download:", qrCode?._options);
    try {
      if (fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "webp"){
        // Setting back to canvas because download can't handle svg type for some reason.
        const options: Partial<Options> | null = {
          type: "canvas",
        };
        qrCode?.update(options);
      }
      // Download 
      qrCode?.download({ name: fileExtension, extension: fileExtension as FileExtension });
    } catch (err) {
      console.error("qr.download failed", err);
    }
  }

  const isUrlEmpty = useMemo(() => url.trim() === "", [url]);

  return {
    url,
    size: width,
    shape,
    qrContainerRef,
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
    iconComponentColor,
    setIconComponentColor,
  };
}

