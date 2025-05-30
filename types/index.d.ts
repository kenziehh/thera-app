export type Hospital = {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    latitude: number;
    longitude: number;
    year_established: number;
    created_at: string;
    updated_at: string;
};

export type Doctor = {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    specialty: string;
    hospital: Hospital;
    created_at: string;
    updated_at: string;
};