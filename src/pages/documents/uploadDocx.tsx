import { useState } from "react";
import axios from "axios";

const UploadDocx = () => {
    const [file, setFile] = useState<any>(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
            "/docx/convert",
            formData,
            { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([res.data]));

        const a = document.createElement("a");
        a.href = url;
        a.download = "pleading.pdf";
        a.click();
    };

    return (
        <div>
            <input
                type="file"
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0])}
            />

            <button onClick={handleUpload}>
                Convert to Pleading PDF
            </button>
        </div>
    );
};

export default UploadDocx;