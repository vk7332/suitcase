import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    header: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
    section: { marginBottom: 10 },
    table: { display: "table", width: "auto", marginTop: 10 },
    row: { flexDirection: "row" },
    cell: { border: "1px solid #000", padding: 5, flex: 1 },
    bold: { fontWeight: "bold" }
});

const InvoicePDF = ({ invoice }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>SUITCASE Invoice</Text>

            <View style={styles.section}>
                <Text>Invoice No: {invoice.invoice_number}</Text>
                <Text>Date: {invoice.issue_date}</Text>
                <Text>Client: {invoice.clients?.name}</Text>
            </View>

            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.bold]}>Description</Text>
                    <Text style={[styles.cell, styles.bold]}>Amount</Text>
                </View>

                {invoice.items?.map((item, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.cell}>{item.description}</Text>
                        <Text style={styles.cell}>₹{item.amount}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text>Total: ₹{invoice.total_amount}</Text>
                <Text>Status: {invoice.payment_status}</Text>
            </View>

            {invoice.razorpay_payment_link && (
                <Text>
                    Pay Online: {invoice.razorpay_payment_link}
                </Text>
            )}
        </Page>
    </Document>
);

export default InvoicePDF;
