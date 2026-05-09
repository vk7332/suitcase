const Documents = ({ caseId }) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        axios.get(`/api/case/documents/${caseId}`).then(res => {
            setDocs(res.data);
        });
    }, []);

    return (
        <div>
            <h3>📎 Documents</h3>
            {docs.map((d: any) => (
                <div key={d.id}>
                    <a href={d.file_url} target="_blank">
                        {d.name}
                    </a>
                </div>
            ))}
        </div>
    );
};