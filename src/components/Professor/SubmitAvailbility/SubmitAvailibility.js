
import {react,useEffect,useState,useRef,forwardRef} from 'react';
import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import { firestore } from '../../../firebase';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function SubmitAvailiblity ()  {

    let [dataFetched,setDataFetched] = useState(false);
    let [appointmentData,setAppointmentData] = useState([]);

    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]);
    
      const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]);

    const col = [
        {
            title:'Description',
            field:'description'
        },
        {
            title:'To',
            field:'end'
        },
        {
            title:'Appointnment Id',
            field:'id'
        },
        {
            title:'Start',
            field:'start'
        },
        {
            title:'Subject',
            field:'subject'
        },

    ]

    useEffect(() => {
        let arrayAppointments = [];
        firestore.collection("appointments").get().then((appointmentsData) => {
       setAppointmentData(appointmentsData.docs.map((appointment => 
              {
            let convertedAppointment = {};
            appointment.data();
            convertedAppointment.start = appointment.get("start").toDate().toString();
            convertedAppointment.end = appointment.get("end").toDate().toString();
            convertedAppointment.description = appointment.get("description");
            convertedAppointment.id = appointment.get("id");
            convertedAppointment.subject = appointment.get("subject");
            arrayAppointments.push(convertedAppointment);
               return convertedAppointment;
               

            }
            
            
       )));
       setDataFetched(true);
    }, [])})


  
        return (
            dataFetched?
            <MaterialTable
            icons={tableIcons}
            title="Editable Preview"
            columns={col}
            data={appointmentData}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    const UpdatedRow = [...appointmentData,newData];
                    setAppointmentData(UpdatedRow);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    
                    resolve();
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...appointmentData];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setAppointmentData([...dataDelete]);
                    
                    resolve()
                  }, 1000)
                }),
            }}
          />
            :null
        );
    

    }
    



export default SubmitAvailiblity;

  