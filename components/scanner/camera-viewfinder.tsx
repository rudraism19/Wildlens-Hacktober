"use client";

import * as React from "react";
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
  Zap,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface CameraViewfinderProps {
  onCapture: (base64Image: string) => void;
  isAnalyzing: boolean;
  analyzingStepText?: string;
  onOpenGallery?: () => void;
}

export function CameraViewfinder({
  onCapture,
  isAnalyzing,
  analyzingStepText = "Scanning botanical features...",
  onOpenGallery,
}: CameraViewfinderProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const [facingMode, setFacingMode] = React.useState<"environment" | "user">(
    "environment"
  );
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [hasCamera, setHasCamera] = React.useState<boolean | null>(null);

  // Initialize camera stream
  const startCamera = React.useCallback(async (mode: "environment" | "user") => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setHasCamera(false);
      setCameraError("Camera API is not supported in this browser or environment.");
      return;
    }

    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(newStream);
      setHasCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.warn("Camera access denied or failed:", err);
      setHasCamera(false);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError(
          "Camera permission was denied. You can still upload nature photos or try Demo Discoveries."
        );
      } else {
        setCameraError("Camera unavailable. You can upload an image from your device.");
      }
    }
  }, [stream]);

  React.useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const flipCamera = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture current video frame
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    onCapture(dataUrl);
  };

  // Handle file uploads (click or drag-drop)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file (JPEG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onCapture(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Viewfinder Frame */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`relative w-full aspect-[3/4] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-forest-950 border-2 transition-all duration-300 shadow-2xl flex flex-col items-center justify-center ${
          isDragOver
            ? "border-emerald-400 bg-forest-900/90 scale-[1.01]"
            : "border-forest-800/90"
        }`}
      >
        {/* Video feed */}
        {hasCamera !== false ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-forest-900 border border-forest-750 flex items-center justify-center text-emerald-400 mb-4 shadow-lg">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Live Camera Not Active
            </h3>
            <p className="text-xs text-forest-300 leading-relaxed mb-5">
              {cameraError || "Drag & drop a nature photo here, or upload directly from your gallery."}
            </p>
            <Button
              variant="emerald"
              size="md"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1" />
              Upload Nature Photo
            </Button>
          </div>
        )}

        {/* Viewfinder Target Reticle / Organic Corners */}
        <div className="absolute inset-8 pointer-events-none border border-emerald-500/20 rounded-2xl flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <div className="w-6 h-6 border-t-2 border-l-2 border-emerald-400/70 rounded-tl-lg" />
            <div className="w-6 h-6 border-t-2 border-r-2 border-emerald-400/70 rounded-tr-lg" />
          </div>
          <div className="flex justify-between">
            <div className="w-6 h-6 border-b-2 border-l-2 border-emerald-400/70 rounded-bl-lg" />
            <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400/70 rounded-br-lg" />
          </div>
        </div>

        {/* Center Crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-emerald-400/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
        </div>

        {/* Top Controls Overlay */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
          <div className="px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md border border-forest-800 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE VIEWFINDER
          </div>

          {hasCamera && (
            <button
              onClick={flipCamera}
              className="p-2.5 rounded-full bg-forest-950/80 backdrop-blur-md border border-forest-800 text-forest-200 hover:text-white transition-colors"
              title="Flip camera"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Analyzing / Scanning Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-forest-950/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
            {/* Elegant laser scan line animation */}
            <div className="relative w-28 h-28 rounded-3xl bg-forest-900 border border-emerald-500/50 flex items-center justify-center mb-6 overflow-hidden shadow-2xl">
              <Sparkles className="w-10 h-10 text-emerald-400 animate-pulse" />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scanner-sweep" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-1">
              ANALYZING...
            </span>

            <p className="text-sm font-medium text-white max-w-xs text-center">
              {analyzingStepText}
            </p>

            <p className="text-xs text-forest-400 mt-3 font-mono">
              Extracting botanical & ecological markers
            </p>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar according to Section 11:
          [ Gallery ]       [ SCAN ]       [ Passport ]
      */}
      <div className="w-full mt-6 px-4 flex items-center justify-between max-w-md">
        {/* Gallery Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-forest-900/80 hover:bg-forest-850 border border-forest-800 text-forest-200 hover:text-white transition-all active:scale-95 disabled:opacity-50"
          title="Upload or pick from gallery"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-emerald-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">Gallery</span>
        </button>

        {/* Center SCAN Shutter Button */}
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => {
              if (hasCamera) {
                takeSnapshot();
              } else {
                fileInputRef.current?.click();
              }
            }}
            disabled={isAnalyzing}
            className="w-20 h-20 rounded-full bg-forest-950 p-1.5 border-4 border-emerald-500/80 shadow-2xl shadow-emerald-950/80 active:scale-95 transition-transform disabled:opacity-50 group focus:outline-none"
            title="Scan Nature Object"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 group-hover:from-emerald-500 group-hover:to-teal-400 flex items-center justify-center text-white shadow-inner">
              <Camera className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </div>
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mt-2 font-mono">
            SCAN
          </span>
        </div>

        {/* Passport Link Button */}
        <Link
          href="/passport"
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-forest-900/80 hover:bg-forest-850 border border-forest-800 text-forest-200 hover:text-white transition-all active:scale-95"
          title="View Nature Passport"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">Passport</span>
        </Link>
      </div>
    </div>
  );
}
