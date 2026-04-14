export default function AddOnsSection() {
    const addOns = [
        { name: "Additional Junior Advocate", price: 99 },
        { name: "AI Draft Generator Add-on", price: 99 },
        { name: "Extra Document Storage", price: 49 },
        { name: "WhatsApp Automation Pack", price: 99 },
        { name: "Premium Draft Library", price: 149 },
        { name: "White Label Branding", price: 999 },
    ];

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Add-On Pricing (Upsell Opportunities)
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
                {addOns.map((addon, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow">
                        <h3 className="font-semibold">{addon.name}</h3>
                        <p className="text-gray-600">₹{addon.price}/month</p>
                        <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
