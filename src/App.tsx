import "./App.css";
import SlideMenu from "./components/ui/side-menu-form";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setLogoPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // 👈 only images allowed
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, //5 mb
  });

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value: name,
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value),
    },
    {
      name: "description",
      label: "Descrioption",
      type: "textarea",
      value: description,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value),
    },
    {
      type: "dropzone",
      label: "Logo",
      name: "logo",
      dropzone: { getRootProps, getInputProps },
      preview: logoPreview,
    },
  ];

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);
  const handleSave = () => {
    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    for (let field of fields) {
      if (field.required && !field.value) {
        newErrors[field.name] = true;
        hasError = true;
      } else {
        newErrors[field.name] = false;
      }
    }

    setErrors(newErrors);

    if (hasError) return;

    // save logic...
    alert("Save logic to be implemented");
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="app-container">
            <h1 className="text-5xl">Welcome to Slide Menu Form!</h1>
            <p>
              This is a shared component that provides a side menu with a
              form-saving feature.
            </p>
            <div>
              Please click{" "}
              <button onClick={() => setMenuOpen(true)} className="text-5xl">
                {" "}
                +{" "}
              </button>{" "}
              to show the side menu form
            </div>

            <SlideMenu
              isOpen={menuOpen}
              setIsOpen={setMenuOpen}
              fields={fields}
              errors={errors}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
