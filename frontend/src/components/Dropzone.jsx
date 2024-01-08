import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
  });

  return (
    <form>
      <div
        {...getRootProps()}
        className={
          "border-[2px] border-white border-dashed rounded-md h-[200px] flex justify-center items-center cursor-pointer"
        }
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-white">Drop your resume here ...</p>
        ) : (
          <p className="text-white">
            Drag and drop your file here, or click to select file (.docx, .pdf)
          </p>
        )}
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.name} className={"text-white"}>
            {file.name}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Dropzone;
