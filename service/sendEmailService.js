import sg from '@sendgrid/mail';
import AlertModel from '../models/alertModel.js';

export default class SendEmailService {
    constructor() {
        this.sg = sg.setApiKey(process.env.SG_API_KEY);
    }

    sendEmail = async (to, subject, text) => {
        try {
            
            const msg = {
                to: to,
                from: 'bishaldeb282@gmail.com',
                subject: subject,
                html: text,
            }

            this.sg.send(msg).then(() => {return {status: true, message: "Email sent successfully"}}).catch((err) => {return {status: false, message: err.message}});

        } catch (error) {
            return error.message
        }
    }

    sendAlert = async (data, user) => {
        try {
            const userId = user._id
            if(!userId) return {status: false, message: "User not found"}
            const alertData = await AlertModel.find({a_u_id:userId});

            const endDate = [];

            alertData.forEach(element => {
                const alertObj = {
                    startDate : element.a_start_date,
                    endDate : element.a_end_date,
                    vehicleNumber : element.a_v_number,
                    alertType : element.a_type,
                    userId : element.a_u_id
                }

                endDate.push(alertObj);
            });

            const sendReminder = await this.sendEmailReminder(endDate);

            return {data: sendReminder, user: user}
        } catch (error) {
            return {status: false, message: error.message}
        }
    }

    sendEmailReminder = async (data) => {
        try {
            return {end_date, start_date}
        } catch (error) {
            
        }
    }

}