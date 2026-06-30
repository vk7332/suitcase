export type ProfileCompletionProfile = {
    full_name?: string | null;
    phone?: string | null;
    chamber_name?: string | null;
    website?: string | null;
    professional_title?: string | null;
    avatar_url?: string | null;
    signature_url?: string | null;
    bio?: string | null;
    address?: string | null;
    practice_areas?: string | null;
    bar_council?: string | null;
};

export function calculateProfileCompletion(
    profile?: ProfileCompletionProfile | null
): number {
    if (!profile) return 0;

    const fields = [
        profile.full_name,
        profile.phone,
        profile.chamber_name,
        profile.website,
        profile.professional_title,
        profile.avatar_url,
        profile.signature_url,
        profile.bio,
        profile.address,
        profile.practice_areas,
        profile.bar_council,
    ];

    const completed = fields.filter(
        (field) =>
            field !== null &&
            field !== undefined &&
            String(field).trim() !== ""
    ).length;

    return Math.round((completed / fields.length) * 100);
}

export function isProfileComplete(
    profile?: ProfileCompletionProfile | null
): boolean {
    return calculateProfileCompletion(profile) >= 80;
}