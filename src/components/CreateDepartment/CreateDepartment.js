import { Form,Formik} from "formik";
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

function createDepartment()
{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    return(

        
                <Formik
                    initialValues={{
                    departmentName:""
                    }} 
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                      }}
                    >
                        {({values,handleChange})=>(
                        
                    <Form>

                        <label>Department Name:</label>
                        <br />        
                        <input  name="Department Name"  onChange={handleChange} value={values.name} required/>
                        <br />
                        <br />

                        <button>Create Department</button>
                    
                        <br></br>
                        <br></br>
                    
                    </Form>  
                    )});
                </Formik>

    )
}

export default createDepartment;