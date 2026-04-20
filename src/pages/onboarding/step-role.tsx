export default function StepRole({ next }: any) {
    return (
        <div className="text-center">
            <h2 className="text-xl mb-4">Select Your Role</h2>

            <button
                onClick={() => next({ role: "advocate" })}
                className="border p-4 m-2"
            >
                Advocate
            </button>

            <button
                onClick={() => next({ role: "client" })}
                className="border p-4 m-2"
            >
                Client
            </button>
        </div>
    );
}