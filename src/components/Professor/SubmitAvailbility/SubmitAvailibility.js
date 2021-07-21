import React, { useState, useEffect, Fragment, useRef } from "react";

import { firestore } from "../../../firebase";

import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
function SubmitAvailiblity()  {
    function onAppointmentAdd(e) {
        alert('do something...');
        console.log(e.args.appointment.originalData)
      }

   let  myScheduler = useRef();
    const [appointmentData, setAppointments] = useState([]);

        const appointments = new Array();
        useEffect(() => {
         
            firestore.collection("appointments").get().then((appointmentsData) => {
                setAppointments(appointmentsData.docs.map((appointment => 
                    {
                        let convertedAppointment = {};
                        appointment.data();
                        convertedAppointment.start = appointment.get("start").toDate();
                        convertedAppointment.end = appointment.get("end").toDate();
                        convertedAppointment.description = appointment.get("description");
                        convertedAppointment.subject = appointment.get("subject");
                        console.log(convertedAppointment)
                        console.log(appointment.data())
                        return convertedAppointment;
                    }


                )));
            })
        }, [])
        appointmentData.forEach((appointment)=>{
            appointments.push(appointment);
        })
        const appointment1 = {
            calendar: 'Room 1',
            description: 'George brings projector for presentations.',
            end: new Date(2018, 10, 23, 16, 0, 0),

            start: new Date(2018, 10, 23, 9, 0, 0),
        };
 
        const source = {
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'location', type: 'string' },
                { name: 'subject', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'start', type: 'date' },
                { name: 'end', type: 'date' }
            ],
            dataType: "array",
            id: 'id',
            localData: appointments
        };
        const dataAdapter = new jqx.dataAdapter(source);
        
            let appointmentDataFields = {
                description: "description",
                from: "start",
                subject: "subject",
                to: "end"
            }
            let date = new jqx.date(2018, 11, 23)
            let height = 600 
            let resources=  {
                colorScheme: "scheme05",
                dataField: "calendar",
                source: new jqx.dataAdapter(source)
            }
            let sourcer = dataAdapter
            let views = [
                'dayView',
                'weekView',
                'agendaView'
            ]
    
    
  

        return (
            <JqxScheduler ref={myScheduler}
                height={height}
                date={date}
                source={sourcer}
                showLegend={true}
                dayNameFormat={"abbr"}
                resources={resources}
                view={"agendaView"}
                views={views}
                appointmentDataFields={appointmentDataFields}
                onAppointmentAdd={onAppointmentAdd} 
            />
        );

}
export default SubmitAvailiblity;
