export default function Pricing() {
    return (
        <section className="section">

            <h2>Simple Pricing For Advocates</h2>

            <div className="pricing-grid">

                <div className="pricing-card">
                    <h3>Solo Advocate</h3>

                    <div className="price">₹999/mo</div>

                    <p>
                        Ideal for independent practitioners and juniors.
                    </p>

                    <button className="primary-btn">
                        Start Trial
                    </button>
                </div>

                <div className="pricing-card featured">
                    <div className="popular-badge">
                        MOST ADVOCATES CHOOSE THIS
                    </div>

                    <h3>AI Courtroom Add-on</h3>

                    <div className="price">₹1499/mo</div>

                    <p>
                        Real-time hearing assistance and AI courtroom support.
                    </p>

                    <button className="primary-btn">
                        Activate AI
                    </button>
                </div>

                <div className="pricing-card">
                    <h3>Law Firm</h3>

                    <div className="price">₹6999/mo</div>

                    <p>
                        Team billing, centralized storage, and shared credits.
                    </p>

                    <button className="primary-btn">
                        Book Demo
                    </button>
                </div>

            </div>

        </section>
    );
}