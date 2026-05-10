import { useCases } from "../../hooks/useCases";

const CaseList = () => {
    const { data, isLoading } = useCases();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Cases</h2>
            {data?.map((c) => (
                <div key={c.id}>
                    {c.case_title} - {c.case_number}
                </div>
            ))}
        </div>
    );
};

export default CaseList;
