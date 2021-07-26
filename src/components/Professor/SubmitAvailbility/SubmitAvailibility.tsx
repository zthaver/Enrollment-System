import * as React from 'react';
import JqxScheduler, { ISchedulerProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
class SubmitAvailiblity extends React.PureComponent<{}, ISchedulerProps> {
    private myScheduler = React.createRef<JqxScheduler>();
    constructor(props: {}) {
        super(props);
        const source: any = {
            dataFields: [
                { name: "id", type: "string" },
                { name: "status", type: "string" },
                { name: "about", type: "string" },
                { name: "address", type: "string" },
                { name: "company", type: "string" },
                { name: "name", type: "string" },
                { name: "style", type: "string" },
                { name: "calendar", type: "string" },
                { name: "start", type: "date", format: "yyyy-MM-dd HH:mm" },
                { name: "end", type: "date", format: "yyyy-MM-dd HH:mm" }
            ],
            dataType: "json",
            id: "id",
            url: "https://firestore.googleapis.com/v1/projects/enrollment-system-cdad7/databases/(default)/documents/appointments/2uZocCjNm9TMZSNpE33B"
        };
        const dataAdapter: any = new jqx.dataAdapter(source);
        this.state = {
            appointmentDataFields: {
                description: "about",
                from: "start",
                id: "id",
                location: "address",
                resourceId: "calendar",
                status: "status",
                style: "style",
                subject: "name",
                to: "end"
            },
            date: new jqx.date(2016, 11, 23),
            height: 600,
            source: dataAdapter,
            views: [
                'dayView',
                'weekView',
                'monthView'
            ]
        };
    }
    public render() {
        return (
            <JqxScheduler ref={this.myScheduler}
                // @ts-ignore
                width={800}
                height={this.state.height}
                date={this.state.date}
                source={this.state.source}
                showLegend={true}
                view={"weekView"}
                views={this.state.views}
                appointmentDataFields={this.state.appointmentDataFields}
            />
        );
    }
}
export default SubmitAvailiblity;