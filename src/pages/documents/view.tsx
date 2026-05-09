const downloadBundle = async () => {
    const res = await api.get(`/bundle/${documentId}`, {
        responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const a = document.createElement("a");
    a.href = url;
    a.download = "court-bundle.pdf";
    a.click();
};