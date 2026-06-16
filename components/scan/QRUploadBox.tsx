"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { extractQrFromImage } from "@/lib/qr/extractQrFromImage";
import {
  UploadCloud,
  X,
  AlertCircle,
  ScanLine,
} from "lucide-react";
import { clsx } from "clsx";
import { useAppSettings } from "@/context/AppSettingsContext";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  onQrExtracted: (url: string) => void;
};

export default function QRUploadBox({ onQrExtracted }: Props) {
  const { t } = useAppSettings();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError(t("scanImageInvalid"));
      return;
    }

    setError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);

    try {
      const qrData = await extractQrFromImage(file);

      if (!qrData) {
        setError(t("scanQrNotDetected"));
        return;
      }

      onQrExtracted(qrData);
    } catch {
      setError(t("scanQrFailed"));
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <motion.div
        onClick={() => !preview && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={cn(
          "relative flex items-center justify-center h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all",
          isDragging
            ? "border-emerald-400 bg-emerald-500/10"
            : "border-white/10 bg-black/20 hover:border-emerald-500/50",
          error && "border-red-500/50 bg-red-500/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <UploadCloud className="w-8 h-8 mx-auto mb-2 text-zinc-400" />
              <p className="text-sm text-zinc-300">
                {t("scanUploadText")}
              </p>
              <p className="text-xs text-zinc-500">
                {t("scanUploadHint")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={preview}
                alt="QR Preview"
                fill
                unoptimized
                className="object-contain p-4 opacity-80"
              />

              {!error && (
                <motion.div
                  animate={{ top: ["0%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                  className="absolute left-0 right-0 h-0.5 bg-emerald-400"
                />
              )}

              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-red-500"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {!error && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-xs text-emerald-300">
                  <ScanLine className="w-3 h-3" />
                  {t("scanScanning")}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400 bg-red-500/5 p-2 rounded-md text-xs">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
