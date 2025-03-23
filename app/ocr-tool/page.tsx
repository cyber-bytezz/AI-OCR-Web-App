"use client";

import { useState } from "react";
import { OCROptions } from "@/types/ocr";
import { Toaster } from "sonner";
import { FileUpload } from "@/components/file-upload";
import { OCRResults } from "@/components/ocr-results";
import { Header } from "@/components/header";
import { Container } from "@/components/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function OCRToolPage() {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileSelect = async (file: File, options: OCROptions) => {
    if (!file) return;

    setLoading(true);
    setMarkdown("");
    setProgress(10);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl);
      setProgress(20);

      // 1) Upload the file
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("File upload failed");
      }

      const { filePath } = await uploadRes.json();
      setProgress(50);

      // 2) Pass filePath and options to OCR
      const ocrRes = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, options }),
      });

      if (!ocrRes.ok) {
        throw new Error("OCR request failed");
      }

      setProgress(90);
      const { markdown } = await ocrRes.json();
      setMarkdown(markdown);
      setProgress(100);
    } catch (err: unknown) {
      console.error(err);
      setMarkdown(`Error: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Header />
      <Container>
        <div className="grid gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Upload an image of a document to extract text using OCR technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload onFileSelect={handleFileSelect} isLoading={loading} />
              {loading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Processing your document...</p>
                    <span className="text-xs font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {markdown && <OCRResults markdown={markdown} imageSrc={imageSrc} />}
        </div>
      </Container>
    </>
  );
}