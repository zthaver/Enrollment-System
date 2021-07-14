import * as React from 'react';
import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
class SubmitAvailiblity extends React.PureComponent  {
    
    constructor(props) {
        super(props);
        this.myScheduler = React.createRef();
        const appointments = new Array();
        const appointment1 = {
            calendar: "Room 1",
            description: "George brings projector for presentations.",
            end: new Date(2018, 10, 23, 16, 0, 0),
            id: "id1",
            location: "",
            start: new Date(2018, 10, 23, 9, 0, 0),
            subject: "Quarterly Project Review Meeting"
        };
        const appointment2 = {
            calendar: "Room 2",
            description: "",
            end: new Date(2018, 10, 24, 15, 0, 0),
            id: "id2",
            location: "",
            start: new Date(2018, 10, 24, 10, 0, 0),
            subject: "IT Group Mtg."
        };
        const appointment3 = {
            calendar: "Room 3",
            description: "",
            end: new Date(2018, 10, 21, 13, 0, 0),
            id: "id3",
            location: "",
            start: new Date(2018, 10, 21, 11, 0, 0),
            subject: "Course Social Media"
        };
        const appointment4 = {
            calendar: "Room 2",
            description: "",
            end: new Date(2018, 10, 23, 18, 0, 0),
            id: "id4",
            location: "",
            start: new Date(2018, 10, 23, 16, 0, 0),
            subject: "New Projects Planning"
        };
        const appointment5 = {
            calendar: "Room 1",
            description: "",
            end: new Date(2018, 10, 25, 17, 0, 0),
            id: "id5",
            location: "",
            start: new Date(2018, 10, 25, 15, 0, 0),
            subject: "Interview with James"
        };
        const appointment6 = {
            calendar: "Room 4",
            description: "",
            end: new Date(2018, 10, 26, 16, 0, 0),
            id: "id6",
            location: "",
            start: new Date(2018, 10, 26, 14, 0, 0),
            subject: "Interview with Nancy"
        };
        appointments.push(appointment1);
        appointments.push(appointment2);
        appointments.push(appointment3);
        appointments.push(appointment4);
        appointments.push(appointment5);
        appointments.push(appointment6);
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
        this.state = {
            appointmentDataFields: {
                description: "description",
                from: "start",
                id: "id",
                location: "location",
                resourceId: "calendar",
                subject: "subject",
                to: "end"
            },
            date: new jqx.date(2018, 11, 23),
            height: 600,
            resources: {
                colorScheme: "scheme05",
                dataField: "calendar",
                source: new jqx.dataAdapter(source)
            },
            source: dataAdapter,
            views: [
                'dayView',
                'weekView',
                'agendaView'
            ]
        };
    }
     render() {
        return (
            <JqxScheduler ref={this.myScheduler}
                height={this.state.height}
                date={this.state.date}
                source={this.state.source}
                showLegend={true}
                dayNameFormat={"abbr"}
                resources={this.state.resources}
                view={"agendaView"}
                views={this.state.views}
                appointmentDataFields={this.state.appointmentDataFields}
                onAppointmentAdd={this.onAppointmentAdd} 
            />
        );
    }
     onAppointmentAdd(e) {
        alert('do something...');
        console.log(e.args.appointment.originalData)
      }
}
export default SubmitAvailiblity;