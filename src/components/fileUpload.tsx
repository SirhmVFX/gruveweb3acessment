"use client";
import Image from "next/image";
import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const data = await file.text();

      // Replace the URL and API key with your Arweave endpoint and credentials
      const response = await fetch("https://api.akord.com/files", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Api-Key": process.env.NEXT_PUBLIC_ARWEAVE_API_KEY,
          "Content-Type": "text/plain",
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setImageId(result.id); // Store the URL of the uploaded file
        setSuccess(true);
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-2 p-2 bg-white text-black rounded"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {success ? (
        <p>
          Your image has been uploaded successfully and is being processed by
          Arweave
        </p>
      ) : (
        ""
      )}
      {imageId && (
        <p>
          {" "}
          here is your image chain Id{" "}
          <span className="text-yellow-500 font-bold">{imageId}</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
