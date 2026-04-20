export default function Addons() {
    const addons = [
        { name: "Junior Advocate", price: "₹99" },
        { name: "AI Draft Generator", price: "₹99" },
        { name: "Extra Storage", price: "₹49" },
        { name: "Custom Branding", price: "₹99" },
        { name: "WhatsApp Automation", price: "₹99" },
        { name: "Premium Draft Library", price: "₹149" },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">Add-on Services</h2>

            {addons.map((a) => (
                <div
                    key={a.name}
                    className="border p-3 flex justify-between mb-2"
                >
                    <span>{a.name}</span>
                    <span>{a.price}</span>

                    <button className="bg-black text-white px-2">
                        Add
                    </button>
                </div>
            ))}
        </div>
    );
}