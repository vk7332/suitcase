import { useNavigate } from "react-router-dom";

export default function ContactUs() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-12 border border-gray-100">
                <button onClick={() => navigate(-1)} className="text-[#089CCE] font-medium mb-8 hover:underline">← Back</button>
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Contact Us</h1>
                
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Developer Information</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Developer Name</p>
                                <p className="text-lg text-gray-900 font-semibold">VIPIN KUMAR TAMRA</p>
                                <p className="text-gray-600">Practicing Advocate</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Practice Location</p>
                                <p className="text-gray-900 font-medium">District Court(s), Mandi, Himachal Pradesh</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">WhatsApp / Call</p>
                                <a href="tel:+917018064385" className="text-[#089CCE] text-lg font-bold hover:underline">+91 70180 64385</a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email (SUITCASE Support)</p>
                                <a href="mailto:suitcaselegalos@gmail.com" className="text-[#089CCE] font-medium hover:underline">suitcaselegalos@gmail.com</a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email (Personal)</p>
                                <a href="mailto:vk7332@gmail.com" className="text-[#089CCE] font-medium hover:underline">vk7332@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100 text-center">
                    <p className="text-gray-500 italic">"Empowering the legal community through innovation."</p>
                </div>
            </div>
        </div>
    );
}
