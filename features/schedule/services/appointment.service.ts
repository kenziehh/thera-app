import { api } from "@/libs/axios";
import { Appointment } from "@/types";

export class AppointmentService {
    static async getAppointments(doctorId: string, start_date: string, end_date: string) {
        const response = await api.get('/doctor-appointments',
            {
                params: {
                    doctor_id: doctorId,
                    from_date: start_date,
                    to_date: end_date
                }
            }
        )
        console.log({
            doctor_id: doctorId,
            from_date: start_date,
            to_date: end_date
        })
        console.log(response.data)
        return response.data.payload.doctor_appointments as Appointment[];
    }

}