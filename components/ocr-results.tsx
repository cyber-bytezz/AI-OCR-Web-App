"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Copy, Download, Check } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { ReceiptStyles } from "./ocr/receipt-styles";
import Image from "next/image";

interface OCRResultsProps {
  markdown: string;
  imageSrc: string | null;
}

export function OCRResults({ markdown, imageSrc }: OCRResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ocr-result.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded OCR results");
  };

  return (
    <Card className="w-full mt-6 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>OCR Results</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Tabs defaultValue="side-by-side" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
            <TabsTrigger value="text-only">Text Only</TabsTrigger>
            <TabsTrigger value="image-only">Image Only</TabsTrigger>
          </TabsList>
          <TabsContent value="side-by-side" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageSrc && (
                <div className="border rounded-md p-2 h-[400px] overflow-hidden relative">
                  <Image
                    src={imageSrc}
                    alt="Uploaded document"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="border rounded-md p-4 h-[400px] overflow-auto bg-muted/20">
                <div className="prose prose-sm max-w-none dark:prose-invert receipt-content">
                  <ReceiptStyles />
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="text-only">
            <div className="border rounded-md p-4 min-h-[400px] overflow-auto bg-muted/20">
              <div className="text-sm prose prose-sm max-w-none receipt-content">
                <ReceiptStyles />
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="image-only">
            {imageSrc && (
              <div className="border rounded-md p-2 h-[400px] overflow-hidden relative">
                <Image
                  src={imageSrc}
                  alt="Uploaded document"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}