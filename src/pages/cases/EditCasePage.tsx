import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCaseById, updateCase } from "@/services/case-service";

export default function EditCasePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        case_title: "",
        case_number: "",
        court_name: "",
        status: "active",
        case_type: "",
        case_stage: "",
        filing_number: "",
        registration_number: "",
        cnr_number: "",
        first_hearing_date: "",
        next_hearing_date: "",
        judge_name: "",
        petitioner_name: "",
        petitioner_advocate: "",
        respondent_name: "",
        respondent_advocate: "",
        under_acts: "",
        under_sections: "",
        client_side: "Plaintiff",
        party_type: "Plaintiff",
        description: "",
        notes: "",
        priority: "normal",
    });

    useEffect(() => {
        loadCase();
    }, [id]);

    const loadCase = async () => {
        try {
            if (!id) return;

            const data = await getCaseById(id);

            if (!data) {
                alert("Case not found");
                navigate("/advocate/cases");
                return;
            }

            setForm({
                case_title: data.case_title || "",
                case_number: data.case_number || "",
                court_name: data.court_name || "",
                status: data.status || "active",

                case_type: data.case_type || "",
                case_stage: data.case_stage || "",
                filing_number: data.filing_number || "",
                registration_number: data.registration_number || "",
                cnr_number: data.cnr_number || "",

                first_hearing_date:
                    data.first_hearing_date?.slice(0, 10) || "",

                next_hearing_date:
                    (data.next_hearing_date || data.next_date)?.slice(0, 10) || "",

                judge_name: data.judge_name || "",

                petitioner_name: data.petitioner_name || "",
                petitioner_advocate: data.petitioner_advocate || "",

                respondent_name: data.respondent_name || "",
                respondent_advocate: data.respondent_advocate || "",

                under_acts: data.under_acts || "",
                under_sections: data.under_sections || "",
    client_side: data.client_side || "",
    party_type: data.party_type || "",
    priority: data.priority || "normal",
    notes: data.notes || "",
    description: data.description || "",
});

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (!id) return;

            setSaving(true);

            await updateCase(id!, {
                ...form,
                first_hearing_date:
                    form.first_hearing_date || null,
                next_hearing_date:
                    form.next_hearing_date || null,
            });

            alert("Case updated successfully");

            navigate(`/advocate/cases/${id}`);
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to update case");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-10">
                    Loading case...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between mb-8">
                    <h1 className="text-3xl font-bold">
                        Edit Case
                    </h1>

                    <button
                        onClick={() =>
                            navigate(`/advocate/cases/${id}`)
                        }
                        className="px-5 py-3 rounded-xl border"
                    >
                        Cancel
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            value={form.case_title}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    case_title: e.target.value,
                                })
                            }
                            placeholder="Case Title"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.case_type}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    case_type: e.target.value,
                                })
                            }
                            placeholder="Case Type"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.case_stage}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    case_stage: e.target.value,
                                })
                            }
                            placeholder="Case Stage"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.filing_number}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    filing_number: e.target.value,
                                })
                            }
                            placeholder="Filing Number"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.registration_number}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    registration_number: e.target.value,
                                })
                            }
                            placeholder="Registration Number"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.cnr_number}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    cnr_number: e.target.value,
                                })
                            }
                            placeholder="CNR Number"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.court_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    court_name: e.target.value,
                                })
                            }
                            placeholder="Court Name"
                            className="border rounded-xl p-3"
                        />

                                                <input
                            value={form.judge_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    judge_name: e.target.value,
                                })
                            }
                            placeholder="Judge Name"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.first_hearing_date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    first_hearing_date: e.target.value,
                                })
                            }
                            placeholder="First Hearing Date"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.next_hearing_date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    next_hearing_date: e.target.value,
                                })
                            }
                            placeholder="Next Hearing Date"
                            className="border rounded-xl p-3"
                        />

                                                <input
                            value={form.petitioner_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    petitioner_name: e.target.value,
                                })
                            }
                            placeholder="Petitioner Name"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.respondent_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    respondent_name: e.target.value,
                                })
                            }
                            placeholder="Respondent Name"
                            className="border rounded-xl p-3"
                        />
                        <input
                            value={form.petitioner_advocate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    petitioner_advocate: e.target.value,
                                })
                            }
                            placeholder="Petitioner Advocate Name"
                            className="border rounded-xl p-3"
                        />

                                                <input
                            value={form.respondent_advocate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    respondent_advocate: e.target.value,
                                })
                            }
                            placeholder="Respondent Advocate Name"
                            className="border rounded-xl p-3"
                        />

                        <input
                            value={form.under_acts}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    under_acts: e.target.value,
                                })
                            }
                            placeholder="Under Acts"
                            className="border rounded-xl p-3"
                        />

                                                <input
                            value={form.under_sections}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    under_sections: e.target.value,
                                })
                            }
                            placeholder="Under Sections"
                            className="border rounded-xl p-3"
                        />

                        <select
    value={form.client_side}
    onChange={(e) =>
        setForm({
            ...form,
            client_side: e.target.value,
        })
    }
    className="w-full border rounded-xl p-3"
>
    <option value="">Select Client Side</option>
    <option value="Plaintiff">Plaintiff</option>
    <option value="Defendant">Defendant</option>
    <option value="Petitioner">Petitioner</option>
    <option value="Respondent">Respondent</option>
    <option value="Appellant">Appellant</option>
    <option value="Applicant">Applicant</option>
    <option value="Complainant">Complainant</option>
    <option value="Accused">Accused</option>
</select>

<select
    value={form.party_type}
    onChange={(e) =>
        setForm({
            ...form,
            party_type: e.target.value,
        })
    }
    className="w-full border rounded-xl p-3"
>
    <option value="">Select Party Type</option>

    <option value="Individual">
        Individual
    </option>

    <option value="Company">
        Company
    </option>

    <option value="Government">
        Government
    </option>

    <option value="Partnership">
        Partnership
    </option>

    <option value="Society">
        Society
    </option>

</select>

<select
    value={form.priority}
    onChange={(e) =>
        setForm({
            ...form,
            priority: e.target.value,
        })
    }
    className="w-full border rounded-xl p-3"
>
    <option value="low">Low</option>
    <option value="normal">Normal</option>
    <option value="high">High</option>
    <option value="urgent">Urgent</option>
</select>

<textarea
    value={form.description}
    onChange={(e) =>
        setForm({
            ...form,
            description: e.target.value,
        })
    }
    rows={4}
    placeholder="Case Description"
    className="w-full border rounded-xl p-3"
/>

<textarea
    value={form.notes}
    onChange={(e) =>
        setForm({
            ...form,
            notes: e.target.value,
        })
    }
    rows={4}
    placeholder="Internal Notes"
    className="w-full border rounded-xl p-3"
/>

                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[#089CCE] text-white px-6 py-3 rounded-xl"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}