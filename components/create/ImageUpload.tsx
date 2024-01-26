import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

export default function ImageUpload() {
  const [urlImage, seturlImage] = useState<string>(null!);
  const previewImageRef = useRef<HTMLImageElement>(null!);
  function getImageForPreview(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      const dataUrl = URL.createObjectURL(file);
      seturlImage(dataUrl);
    }
  }
  return (
    <div className="h-64 w-72">
      <label
        htmlFor="image"
        className="bg-gray-200 border border-gray-300 rounded-sm h-full w-full flex justify-center items-center"
      >
        {urlImage ? (
          <Image
            height={100}
            width={100}
            alt="preview image "
            src={urlImage}
            ref={previewImageRef}
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-gray-600">Upload an Image for preview</p>
        )}

        <input
          type="file"
          name="image"
          id="image"
          className="hidden"
          onChange={getImageForPreview}
          required
        />
      </label>
    </div>
  );
}