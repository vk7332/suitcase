export const createAuditLog = async (log) => {
    const { data: lastLog } = await supabaseAdmin
        .from("audit_logs")
        .select("hash")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    const prevHash = lastLog?.hash || "GENESIS";

    const hash = generateHash(log, prevHash);

    await supabaseAdmin.from("audit_logs").insert({
        ...log,
        prev_hash: prevHash,
        hash,
    });
};