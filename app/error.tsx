

"use client"; 

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "1rem",
        }}
      >
        Something went wrong!
      </h2>
      <p style={{ marginBottom: "2rem", color: "#6b7280" }}>
        {error.message || "An unexpected error occurred."}
      </p>
      
      {/* Use the primary button style from your global.css */}
      <button
        className="food-form-btn primary"
        onClick={
          // Attempt to recover by re-rendering the route
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}