import imageResize from 'image-resize';
const resizeImage = async (file, size, filename) => {
  const resizedImg = await imageResize(file, {
    format: 'png',
    width: size,
    height: size,
  });
  return base64ToFile(resizedImg, filename);
};

const base64ToFile = (base64String, filename) => {
  // Split the base64 string to get the MIME type and data
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const binaryString = atob(arr[1]); // Decode the base64 string
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);

  // Convert the binary string to a byte array
  for (let i = 0; i < len; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Create a new File object
  return new File([uint8Array], filename, { type: mime });
};
export { base64ToFile, resizeImage };
//   // Usage
//   const base64String = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...";
//   const file = base64ToFile(base64String, 'image.png');
//   console.log(file);
