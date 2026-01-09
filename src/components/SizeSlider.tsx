import { Box, Slider } from "@mui/material";
import { useState, type ChangeEvent } from "react";

interface ColorPickerProps {
  step?: number;
  sizeMin: number;
  sizeMax: number;
  sliderValue: number;
  onQrCodeSizeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorPicker({
  step: step = 25,
  sizeMin: sizeMin,
  sizeMax: sizeMax,
  sliderValue: sliderValue,
  onQrCodeSizeChange: onSizeChange
}: ColorPickerProps) {
  const sizeMid = (sizeMax + sizeMin) / 2;
  const sizeMinMid_Mid = (sizeMid + sizeMin) / 2;
  const sizeMidMax_Mid = (sizeMax + sizeMid) / 2;

  const sizeLabels = [
    {
      value: sizeMin,
      label: `${sizeMin}px`,
    },
    {
      value: sizeMinMid_Mid,
      label: `${sizeMinMid_Mid}px`,
    },
    {
      value: sizeMid,
      label: `${sizeMid}px`,
    },
    {
      value: sizeMidMax_Mid,
      label: `${sizeMidMax_Mid}px`,
    },
    {
      value: sizeMax,
      label: `${sizeMax}px`,
    },
  ];
  
  const sizePresets = [sizeMin, sizeMid, sizeMax]; // your low, medium, high values
  const snapThreshold = 100; // how close the slider needs to be to snap

  const handleOnSliderValueChange = (_: Event, newValue: number) => {
    // Check if we're close to a preset
    const snapped = sizePresets.find(p => Math.abs(p - newValue) <= snapThreshold);
    const finalValue = snapped ?? newValue; // snap if close, otherwise keep continuous
    onSizeChange({ target: { value: finalValue } } as any);
  };

  return (
    <Box ml={2}>
      <Slider
        marks={sizeLabels}
        step={step}
        value={sliderValue}
        valueLabelDisplay="auto"
        min={sizeMin}
        max={sizeMax}
        onChange={handleOnSliderValueChange}
      />
    </Box>
  );
}
