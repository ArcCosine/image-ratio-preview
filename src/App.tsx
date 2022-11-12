import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {

    const [state, updateState] = useState("wide");

    const renderImage = (reader: any, filename: string) => {
        if (reader.result) {
            const div = document.createElement("div") as HTMLElement;
            div.classList.add("figure", "mr-4", "mb-4");

            const img = div.appendChild(
                document.createElement("img")
            ) as HTMLImageElement;
            img.src = reader.result;
            img.alt = filename;
            img.classList.add(state);
            const preview = document.getElementById("preview") as HTMLElement;
            preview.appendChild(div);
        }
    };
    const onDrop = useCallback((acceptedFiles: any) => {
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

    const onChange = (eve: any) => {
        const value = eve.target.value;
        updateState(value);
        const images = document.querySelectorAll('img');
        for( let i=0, iz = images.length; i<iz; i++ ){
            const image = images[i];
            image.classList.remove(...image.classList);
            image.classList.add(value);
        };
    };

    const aspectRatio = [{
        name: "wide",
        value:"16/9"
        },{
        name: "standard",
        value:"4/3"
        }, {
        name: "square",
        value:"1"
        }];

    return (
        <div className="p-8">
            <h1 className="p-8 text-3xl font-bold">Image Ratio Preview</h1>
            <div className="px-8 flex mb-4">
            {aspectRatio.map((item, index) => {
                return (
                    <div className="flex items-center mr-4" key={index}>
                        <input
                            checked={item.name === state}
                            type="radio"
                            id={item.name}
                            value={item.name}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            name="ratio-radio"
                            onChange={onChange}
                        />
                        <label
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor={item.name}
                        >
                            aspect-ratio {item.value}
                        </label>
                    </div>
                );
            })}
            </div>

            <div id="drop-zone" {...getRootProps()} className="p-8 border-2 border-indigo-500 border-dashed w-full">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="p-4">Drop the file here ... </p>
                ) : (
                    <p className="p-4">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            <div id="preview" className="flex p-8 flex-wrap"></div>
        </div>
    );
}

export default App;
