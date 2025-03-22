"use client";

export function ReceiptStyles() {
  return (
    <style jsx global>{`
      .receipt-content {
        font-family: monospace;
        white-space: pre;
        line-height: 1.2;
      }
      .receipt-content p {
        margin: 0;
        padding: 0;
      }
      .receipt-content h1, 
      .receipt-content h2, 
      .receipt-content h3 {
        text-align: center;
        margin: 0.5em 0;
        font-size: 1em;
        font-weight: normal;
      }
    `}</style>
  );
}