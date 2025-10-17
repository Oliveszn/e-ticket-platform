import { Label } from "../ui/label";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ImageUploadProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  uploadedImageUrl: string;
  setUploadedImageUrl: (url: string) => void;
  imageLoadingState: boolean;
  setImageLoadingState: (state: boolean) => void;
  isCustomStyling?: boolean;
}

const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,

  isCustomStyling = false,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // 🔹 Generate preview for either existing URL or uploaded File
  useEffect(() => {
    if (typeof imageFile === "string") {
      setPreviewUrl(imageFile); // existing image from backend
    } else if (imageFile instanceof File) {
      const fileUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    } else {
      setPreviewUrl("");
    }
  }, [imageFile]);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl("");
    setPreviewUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          accept=".jpg,.png,.jpeg,.gif"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {imageLoadingState ? (
          <Skeleton className="h-32 w-full bg-gray-100 rounded-md" />
        ) : previewUrl ? (
          <div className="relative w-full flex flex-col items-center">
            <img
              src={previewUrl}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-md shadow-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 rounded-full"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer text-gray-600"
          >
            <UploadCloudIcon className="w-10 h-10 mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        PNG, JPG, GIF, or WebP up to 5MB
      </p>
    </div>
  );
};

export default ImageUpload;
