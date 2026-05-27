// =====================================================
// SUITCASE - Invoice Form Component
// Create and Edit Invoices with GST Calculation
// =====================================================

import React, { useState, useEffect } from "react";
import { createInvoice, updateInvoice } from "../services/invoice-service";

const InvoiceForm = ({ existingInvoice = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        client_name: "",
        client_email: "",
        client_phone: "",
        description: "",
        invoice_date: new Date().toISOString().split("T")[0],
        due_date: "",
        taxable_amount: 0,
        gst_percentage: 18,
        gst_amount: 0,
        amount: 0,
        status: "Pending",
        payment_status: "Pending",
        is_gst_applicable: true,
        gst_number: "",
        place_of_supply: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Populate form when editing an existing invoice
    useEffect(() => {
        if (existingInvoice) {
            setFormData(existingInvoice);
        }
    }, [existingInvoice]);

    // Calculate GST and Total Amount
    useEffect(() => {
        const taxable = parseFloat(formData.taxable_amount) || 0;
        const gstPercent = formData.is_gst_applicable
            ? parseFloat(formData.gst_percentage) || 0
            : 0;

        const gstAmount = (taxable * gstPercent) / 100;
        const totalAmount = taxable + gstAmount;

        setFormData((prev) => ({
            ...prev,
            gst_amount: gstAmount.toFixed(2),
            amount: totalAmount.toFixed(2),
        }));
    }, [
        formData.taxable_amount,
        formData.gst_percentage,
        formData.is_gst_applicable,
    ]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            let response;

            if (existingInvoice) {
                response = await updateInvoice(existingInvoice.id, formData);
                setMessage("Invoice updated successfully!");
            } else {
                response = await createInvoice(formData);
                setMessage("Invoice created successfully!");
            }

            if (response && onSuccess) {
                onSuccess();
            }

            // Reset form after creation
            if (!existingInvoice) {
                setFormData({
                    client_name: "",
                    client_email: "",
                    client_phone: "",
                    description: "",
                    invoice_date: new Date().toISOString().split("T")[0],
                    due_date: "",
                    taxable_amount: 0,
                    gst_percentage: 18,
                    gst_amount: 0,
                    amount: 0,
                    status: "Pending",
                    payment_status: "Pending",
                    is_gst_applicable: true,
                    gst_number: "",
                    place_of_supply: "",
                });
            }
        } catch (error) {
            console.error("Error saving invoice:", error);
            setMessage("Error saving invoice.");
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2>{existingInvoice ? "Edit Invoice" : "Create Invoice"}</h2>

            {message && <p style={styles.message}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Client Information */}
                <h3>Client Details</h3>
                <input
                    type="text"
                    name="client_name"
                    placeholder="Client Name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="email"
                    name="client_email"
                    placeholder="Client Email"
                    value={formData.client_email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="text"
                    name="client_phone"
                    placeholder="Client Phone"
                    value={formData.client_phone}
                    onChange={handleChange}
                    style={styles.input}
                />

                <textarea
                    name="description"
                    placeholder="Service Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.textarea}
                />

                {/* Invoice Dates */}
                <h3>Invoice Details</h3>
                <label>Invoice Date</label>
                <input
                    type="date"
                    name="invoice_date"
                    value={formData.invoice_date}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label>Due Date</label>
                <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    style={styles.input}
                />

                {/* GST Section */}
                <h3>GST Details</h3>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="is_gst_applicable"
                        checked={formData.is_gst_applicable}
                        onChange={handleChange}
                    />
                    Apply GST
                </label>

                {formData.is_gst_applicable && (
                    <>
                        <input
                            type="number"
                            name="gst_percentage"
                            placeholder="GST Percentage"
                            value={formData.gst_percentage}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            type="text"
                            name="gst_number"
                            placeholder="GST Number"
                            value={formData.gst_number}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            type="text"
                            name="place_of_supply"
                            placeholder="Place of Supply"
                            value={formData.place_of_supply}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </>
                )}

                {/* Amount Details */}
                <h3>Amount</h3>
                <input
                    type="number"
                    name="taxable_amount"
                    placeholder="Taxable Amount"
                    value={formData.taxable_amount}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="number"
                    name="gst_amount"
                    value={formData.gst_amount}
                    readOnly
                    style={styles.input}
                />

                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    readOnly
                    style={styles.input}
                />

                {/* Submit Button */}
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading
                        ? "Processing..."
                        : existingInvoice
                            ? "Update Invoice"
                            : "Create Invoice"}
                </button>
            </form>
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        margin: "8px 0",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    textarea: {
        margin: "8px 0",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    checkboxLabel: {
        margin: "10px 0",
    },
    button: {
        marginTop: "15px",
        padding: "12px",
        fontSize: "16px",
        backgroundColor: "#0B1F3A",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    message: {
        color: "green",
        fontWeight: "bold",
    },
};

export default InvoiceForm;
