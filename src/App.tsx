import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import './App.css'

function App() {
    const renderImage = (reader: any, filename:string) => {
        if (reader.result) {
            const div = document.createElement("div") as HTMLELement;
            div.classList.add('figure');

            const img = div.appendChild(document.createElement("img")) as HTMLImageElement;
            img.src = reader.result;
            img.alt = filename;
            img.classList.add('w-1/2');
            const preview = document.getElementById("preview") as HTMLELement;
            preview.appendChild(div);
        }
    };
    const onDrop = useCallback((acceptedFiles:any) => {
        for (let i = 0, iz = acceptedFiles.length; i < iz; i++) {
            const acceptedFile = acceptedFiles[i];
            const reader = new FileReader();
            reader.readAsDataURL(acceptedFile);
            reader.addEventListener(
                "loadend",
                () => {
                    renderImage(reader, acceptedFile.name);
                },
                false
            );
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    return (
        <div className="">
            <h1 className="text-3xl font-bold">Image Ratio Preview</h1>
            <div id="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="p-4">Drop the file here ... </p>
                ) : (
                    <p className="p-4">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            <div id="preview" className="flex"></div>
        </div>
    );
}

export default App;
