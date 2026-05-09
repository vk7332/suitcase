import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCases, createCase } from "../api/case.api";
import { uploadDocument } from "../api/document.api";

export const useUploadDocument = () => {
    return useMutation({
        mutationFn: ({ file, caseId }: any) =>
            uploadDocument(file, caseId),
    });
};
export const useCases = () => {
    return useQuery({
        queryKey: ["cases"],
        queryFn: fetchCases,
    });
};

export const useCreateCase = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createCase,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["cases"] });
        },
    });
};