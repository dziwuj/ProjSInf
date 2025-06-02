/**
 * Opens a file picker dialog and returns the selected file as base64
 * @param options Configuration options for the file picker
 * @returns Promise that resolves with the base64 string
 */
export const openFilePicker = async (options: {
  accept?: string;
  capture?: "environment" | "user";
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a temporary input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = options.accept || "image/*";

    if (options.capture) {
      input.setAttribute("capture", options.capture);
    }

    input.style.display = "none";
    document.body.appendChild(input);

    // Setup the file change handler
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        document.body.removeChild(input);
        reject(new Error("No file selected"));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        document.body.removeChild(input);
        resolve(base64);
      };

      reader.onerror = () => {
        document.body.removeChild(input);
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    };

    // Handle cancel
    input.onabort = () => {
      document.body.removeChild(input);
      reject(new Error("File selection aborted"));
    };

    // Trigger the file picker
    input.click();
  });
};
