import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ClientRecord } from '@/types/client';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface HistoryContextType {
    clients: ClientRecord[];
    addRecord: (record: Omit<ClientRecord, 'id' | 'lastCalculated'>) => Promise<void>;
    deleteRecord: (id: string) => Promise<void>;
    clearAll: () => Promise<void>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filteredClients: ClientRecord[];
    loading: boolean;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

// src/context/HistoryContext.tsx

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [clients, setClients] = useState<ClientRecord[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // 1. Define the callback FIRST
    const loadClients = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('client_records')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Error loading clients:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // 2. Use it in the effect SECOND
    useEffect(() => {
        if (user) {
            loadClients();
        } else {
            setClients([]);
            setLoading(false);
        }
    }, [user, loadClients]);

    // ... rest of the context code ...

    const addRecord = async (record: Omit<ClientRecord, 'id' | 'lastCalculated'>) => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('client_records')
                .insert([{ ...record, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setClients((prev) => [data, ...prev]);
            }
        } catch (error) {
            console.error('Error adding record:', error);
            throw error;
        }
    };

    const deleteRecord = async (id: string) => {
        try {
            const { error } = await supabase
                .from('client_records')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setClients((prev) => prev.filter((client) => client.id !== id));
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    };

    const clearAll = async () => {
        if (!user) return;
        if (!window.confirm("Are you sure you want to delete all client records?")) return;

        try {
            const { error } = await supabase
                .from('client_records')
                .delete()
                .eq('user_id', user.id);

            if (error) throw error;
            setClients([]);
        } catch (error) {
            console.error('Error clearing records:', error);
            throw error;
        }
    };

    const filteredClients = clients.filter((client: ClientRecord) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.pan?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <HistoryContext.Provider value={{
            clients, addRecord, deleteRecord, clearAll,
            searchQuery, setSearchQuery, filteredClients, loading
        }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};

export async function saveCalculation(data: any) {
    await supabase.from("calculation_history").insert([
        {
            calculator_type: "court_fee",
            state: data.state,
            case_type: data.caseType,
            amount: data.amount,
            result_json: data
        }
    ]);
}
