
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
//include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import React, {Component} from 'react'
import withDragDropContext from '../../../withDndContext'
import DemoData from './DemoData';
class SubmitAvailibility extends Component{
    constructor(props){
        super(props);


        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week);
        schedulerData.localeMoment.locale('en');
        moment.locale('zh-cn');
schedulerData.setLocaleMoment(moment);
//set resources here or later
let resources = [
                    {
                       id: 'r0',
                       name: 'Resource0',
                       groupOnly: true
                    },
                    {
                       id: 'r1',
                       name: 'Resource1'
                    },
                    {
                       id: 'r2',
                       name: 'Resource2',
                       parentId: 'r0'
                    },
                    {
                       id: 'r3',
                       name: 'Resource3',
                       parentId: 'r4'
                    },
                    {
                       id: 'r4',
                       name: 'Resource4',
                       parentId: 'r2'
                    },
                ];
let events = [
    {
         id: 1,
         start: '2017-12-18 09:30:00',
         end: '2017-12-19 23:30:00',
         resourceId: 'r1',
         title: 'I am finished',
         bgColor: '#D9D9D9'
     },
     {
         id: 2,
         start: '2017-12-18 12:30:00',
         end: '2017-12-26 23:30:00',
         resourceId: 'r2',
         title: 'I am not resizable',
         resizable: false
     },
     {
         id: 3,
         start: '2017-12-19 12:30:00',
         end: '2017-12-20 23:30:00',
         resourceId: 'r3',
         title: 'I am not movable',
         movable: false
     },
     {
         id: 4,
         start: '2017-12-19 14:30:00',
         end: '2017-12-20 23:30:00',
         resourceId: 'r1',
         title: 'I am not start-resizable',
         startResizable: false
     },
     {
         id: 5,
         start: '2017-12-19 15:30:00',
         end: '2017-12-20 23:30:00',
         resourceId: 'r2',
         title: 'R2 has recurring tasks every week on Tuesday, Friday',
         rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
         bgColor: '#f759ab'
     }
 ];
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData
        }
    }
  
//set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).

render()
{
    const {viewModel} = this.state;
    return (
    <Scheduler schedulerData={viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
        newEvent={this.newEvent}
/>
)
}
     prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }
    
     nextClick =  (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    
    }
    
     onSelectDate = (schedulerData, date) =>  {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }
     eventClicked = (schedulerData, event) =>  {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };
    
     onViewChange = (schedulerData, view) =>  {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        if(window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
    }



}

export default withDragDropContext(SubmitAvailibility);