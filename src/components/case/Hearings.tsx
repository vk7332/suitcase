const Hearings = ({ caseId }) => {
    const [hearings, setHearings] = useState([]);

    useEffect(() => {
        axios.get(`/api/case/hearings/${caseId}`).then(res => {
            setHearings(res.data);
        });
    }, []);

    return (
        <div>
            <h3>⚖️ Hearings</h3>
            {hearings.map((h: any) => (
                <div key={h.id}>
                    {h.hearing_date} - {h.status}
                    <p>{h.notes}</p>
                </div>
            ))}
        </div>
    );
};