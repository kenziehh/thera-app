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

export type Mood = {
    id: number;
    doctor_id: string;
    scale: number;
    created_at: string;
};

export type MonthlyMood = {
    [month: string]: number;
};


export type Patient = {
    id: string;
    full_name: string;
    id_number: string;
    phone_number: string;
    address: string;
    date_of_birth: string;
    gender: string;
    height: number;
    weight: number;
    blood_type: string;
    allergies: string;
    medical_record_number: string;
    hospital: Hospital;
    created_at: string;
    updated_at: string;
};

export type Appointment = {
    id: string;
    doctor: Doctor;
    patient: Patient;
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: string;
    type: string;
    created_at: string;
    updated_at: string;
};


export type Channel = {
    id: string;
    name: string;
    doctor: Doctor;
    created_at: string;
    updated_at: string;
}
export type Message = {
    id: string;
    channel: Channel;
    content: string;
    role: "User" | "Assistant" | "System";
    created_at: string;
    updated_at: string;
}