import {
    Scale,
    Users,
    Briefcase,
    UserCheck,
    FileText,
    Globe
} from "lucide-react";

type StepRoleProps = {
    next: (role: string) => void;
};

const roles = [
    {
        value: "advocate",
        title: "Advocate",
        description: "For legal practitioners and chamber owners",
        icon: Scale
    },
    {
        value: "junior advocates",
        title: "Junior Advocate",
        description: "For associate lawyers in a chamber",
        icon: Briefcase
    },
    {
        value: "staff(clerks)",
        title: "Staff / Clerk",
        description: "For administrative and filing support",
        icon: Users
    },
    {
        value: "client",
        title: "Client",
        description: "For tracking your cases and legal documents",
        icon: UserCheck
    },
    {
        value: "litigant",
        title: "Litigant",
        description: "For self-represented parties",
        icon: FileText
    },
    {
        value: "public",
        title: "Public",
        description: "For general legal tools and calculators",
        icon: Globe
    }
];

export default function StepRole({
    next
}: StepRoleProps) {
    return (
        <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                    Select Your Role
                </h2>

                <p className="text-gray-500 mt-2">
                    Choose the account type that best fits your needs
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {roles.map((role) => {
                    const Icon = role.icon;

                    return (
                        <button
                            key={role.value}
                            onClick={() => next(role.value)}
                            className="
                                text-left
                                border
                                border-gray-200
                                rounded-2xl
                                p-6
                                hover:border-[#089CCE]
                                hover:shadow-lg
                                transition-all
                                duration-200
                                group
                            "
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-blue-50
                                        flex
                                        items-center
                                        justify-center
                                        text-[#089CCE]
                                        group-hover:scale-110
                                        transition
                                    "
                                >
                                    <Icon size={24} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        {role.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {role.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}