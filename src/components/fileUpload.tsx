"use client";
import Image from "next/image";
import { useState, ChangeEvent } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const data = await file.text();

      const response = await fetch("https://api.akord.com/files", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Api-Key": process.env.NEXT_PUBLIC_ARWEAVE_API_KEY!,
          "Content-Type": "text/plain",
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setImageId(result.id); // Store the ID of the uploaded file
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
      {success && (
        <p>
          Your image has been uploaded successfully and is being processed by
          Arweave.
        </p>
      )}
      {imageId && (
        <div>
          <p>
            Here is your image chain Id:{" "}
            <span className="text-yellow-500 font-bold">{imageId}</span>
          </p>
          <div className="mt-4">
            {/* Display the uploaded image */}
            <Image
              src={`https://api.akord.com/files/${imageId}`} // Adjust if needed based on actual URL
              alt="Uploaded Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
