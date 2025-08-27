interface SideMenuFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fields: any;
  errors: any;
  onSave: () => void;
}

export default function sideMenuForm({
  isOpen,
  setIsOpen,
  fields,
  errors,
  onSave,
}: SideMenuFormProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4">Edit Info</h2>

          {fields.map((field: any) => (
            <div key={field.name} className="mb-4">
              <label className="block mb-1 font-medium">{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 resize-none scroll-smooth"
                />
              ) : field.type === "dropzone" ? (
                <div
                  {...field.dropzone.getRootProps()}
                  className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
      border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <input {...field.dropzone.getInputProps()} />

                  {field.preview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={field.preview}
                        alt="Logo preview"
                        className="max-h-32 mb-2 object-contain"
                      />
                      <p className="text-gray-500">
                        Click or drag to change the logo
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Drag & drop files here, or click to select
                    </p>
                  )}
                </div>
              ) : (
                <input
                  type={field.type}
                  value={field.value}
                  onChange={field.onChange}
                  className={`w-full border rounded px-2 py-1 ${
                    errors[field.name]
                      ? "border-red-500 pr-10"
                      : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}

          <button
            onClick={onSave}
            className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
