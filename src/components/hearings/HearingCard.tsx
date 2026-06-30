import HearingStatusBadge from "./HearingStatusBadge";
import { Hearing } from "@/types/hearing";

type Props = {
    hearing: Hearing;
    onEdit?: (
        hearing: Hearing
    ) => void;

    onDelete?: (
        id: string
    ) => void;
};

export default function HearingCard({
    hearing,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

            <div className="flex justify-between items-start gap-4">

                <div className="flex-1">

                    <div className="flex items-center gap-3 flex-wrap">

                        <h3 className="font-bold text-lg">

                            {new Date(
                                hearing.hearing_date
                            ).toLocaleDateString()}

                        </h3>

                        <HearingStatusBadge
                            status={hearing.status}
                        />

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Stage
                            </p>

                            <p className="font-semibold">
                                {hearing.stage || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Created
                            </p>

                            <p className="font-semibold">
                                {hearing.created_at
                                    ? new Date(
                                          hearing.created_at
                                      ).toLocaleDateString()
                                    : "-"}
                            </p>
                        </div>

                    </div>

                    {hearing.notes && (
                        <div className="mt-4 pt-4 border-t">

                            <p className="text-sm text-gray-500 mb-1">
                                Notes
                            </p>

                            <p className="whitespace-pre-wrap">
                                {hearing.notes}
                            </p>

                        </div>
                    )}

                </div>

                <div className="flex gap-2">

                    {onEdit && (
                        <button
                            onClick={() =>
                                onEdit(hearing)
                            }
                            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600"
                        >
                            Edit
                        </button>
                    )}

                    {onDelete && (
                        <button
                            onClick={() =>
                                onDelete(
                                    hearing.id
                                )
                            }
                            className="px-4 py-2 rounded-xl bg-red-50 text-red-600"
                        >
                            Delete
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}