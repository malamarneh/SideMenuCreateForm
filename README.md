# Slide Menu Form

This project was bootstrapped with [Vite](https://vitejs.dev/) using the React + TypeScript template.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Serves the production build locally.

## Project Info

A reusable side menu form component that slides in from the right. It supports different input types, including text, textarea, and file upload (dropzone). It is ideal for editing or creating entities without leaving the current page.

## Props
| Prop        | Type                                                                                                                              | Required | Description                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `isOpen`    | `boolean`                                                                                                                         | ✅ Yes    | Controls whether the side menu is open or closed.                                          |
| `setIsOpen` | `React.Dispatch<React.SetStateAction<boolean>>`                                                                                   | ✅ Yes    | Function to update the `isOpen` state (e.g., toggling the menu).                           |
| `fields`    | `Array<{ name: string; label: string; type: string; value: any; onChange: (e: any) => void; dropzone?: any; preview?: string; }>` | ✅ Yes    | Array of field objects defining form inputs. Supports `text`, `textarea`, `dropzone`, etc. |
| `errors`    | `Record<string, any>`                                                                                                             | ❌ No     | Object containing validation errors keyed by field names.                                  |
| `onSave`    | `() => void`                                                                                                                      | ✅ Yes    | Callback triggered when the user clicks the “Save” button.                                 |

## Example usage
```tsx
import { useState } from "react";
import SideMenuForm from "./SideMenuForm";
import { useDropzone } from "react-dropzone";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const dropzone = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    multiple: false,
  });

  const fields = [
    { name: "name", label: "Name", type: "text", value: name, onChange: (e: any) => setName(e.target.value) },
    { name: "description", label: "Description", type: "textarea", value: description, onChange: (e: any) => setDescription(e.target.value) },
    { name: "logo", label: "Logo", type: "dropzone", dropzone, preview: file ? URL.createObjectURL(file) : null },
  ];

  const errors = {};

  const handleSave = () => {
    console.log({ name, description, file });
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      <SideMenuForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fields={fields}
        errors={errors}
        onSave={handleSave}
      />
    </div>
  );
}
