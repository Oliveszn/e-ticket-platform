// Helper function to convert File to base64
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper to convert base64 back to File
export const base64ToFile = (
  base64: string,
  filename: string,
  mimeType: string
): File => {
  const arr = base64.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mimeType });
};

export const hasNestedError = (obj: any): boolean => {
  if (!obj) return false;
  if (typeof obj === "string") return true;
  if (typeof obj === "object") {
    return Object.values(obj).some((value) => hasNestedError(value));
  }
  return false;
};

export const markTouched = (fields: any): any => {
  if (typeof fields === "string" || typeof fields === "number") {
    return true;
  }
  if (Array.isArray(fields)) {
    return fields.map((item) => markTouched(item));
  }
  if (typeof fields === "object" && fields !== null) {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key] = markTouched(fields[key]);
      return acc;
    }, {} as any);
  }
  return true;
};

export const formatDateForInput = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};

export const prepareImageForRedux = async (image: File | string | null) => {
  if (image instanceof File) {
    const base64 = await convertFileToBase64(image);
    return {
      base64,
      name: image.name,
      type: image.type,
      size: image.size,
    };
  }
  return image;
};

export const parseImageFromRedux = (image: any): File | string | null => {
  if (image?.base64) {
    return base64ToFile(image.base64, image.name, image.type);
  }
  if (typeof image === "string" && image.length > 0) {
    return image;
  }
  return null;
};
