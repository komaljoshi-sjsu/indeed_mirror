//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    Form, Button, Row, Col, Card, Container,InputGroup,Modal,Dropdown
  } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import {useDispatch} from 'react-redux';
import EmployerNavbar from './EmployerNavbar'
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import {setCompId} from '../../reduxutils/actioncreators/companyaction';

class EmployerProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          employerId : 1,
          employerDetails:{},
          empdetails:false,
          compdetails:false,
          companyName: '',
          employerName:'',
          roleInCompany:'',
          address:'',
          industry: '',
          jobTitle: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          errors: {},
          website:'',
          headquarters:'',
          about:'',
          founded:'',
          mission:'',
          companyValues:'',
          workCulture:'',
          companyType:'',
          ceo:'',
          companySize:'',
          revenue:'',
          companyDescription:'',
          update:true,
          empupdated:false,
          companyupdated:false,
          companyDetails:[],
          companyadded:false
      };
      
    }
    
      componentDidMount() {
        axios.get(`${backendServer}/getCompanyDetails`).then((response) => {
            //console.log(response.data);
            this.setState({
                companyDetails : this.state.companyDetails.concat(response.data) 
            });
        });
    }
 
      handleEmpDetails = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrorsEmp();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            const employerData = {
                employerName:this.state.employerName,
                roleInCompany:this.state.roleInCompany,
                address:this.state.address,
                city:this.state.city,
                state:this.state.state,
                country:this.state.country,
                zipcode:this.state.zipcode
            }
            this.sendEmployerAPI(employerData);
            this.setState({
                empupdated : true 
            });
            
        }  
    }
    handleCompDetails = (e) => {
       
        e.preventDefault();
        const newErrors = this.findFormErrorsCompany();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            const companyData = {
                employerId:"4",
                companyName:this.state.companyName,
                website:this.state.website,
                companySize:this.state.companySize,
                about:this.state.about,
                companyType:this.state.companyType,
                companyDescription:this.state.companyDescription,
                headquarters:this.state.headquarters,
                industry:this.state.industry,
                mission:this.state.mission,
                revenue:this.state.revenue,
                founded:this.state.founded,
                workCulture:this.state.workCulture,
                companyValues:this.state.companyValues,
                ceo:this.state.ceo,
               
            }
            this.sendCompanyAPI(companyData);
            this.setState({
                companyupdated : true 
            });
            this.setState({
                companyadded : false 
            });
            // this.setState({
            //     show : true 
            // });
        }    
        
    }
    findFormErrorsEmp = () => {
      const {errors} = this.state;
      if(!this.state.employerName || this.state.employerName === '') errors.employerName = 'Employer Name cannot be blank!';
      if(!this.state.roleInCompany || this.state.roleInCompany === '') errors.roleInCompany = 'Role cannot be blank!';
      if(!this.state.address || this.state.address === '') errors.address = 'Address cannot be blank!';
      if(!this.state.city || this.state.city === '') errors.city = 'City cannot be blank!';
      if(!this.state.state || this.state.state === '') errors.state = 'State cannot be blank!';
      if(!this.state.country || this.state.country === '') errors.country = 'Country cannot be blank!';
      if(!this.state.zipcode || this.state.zipcode === '') errors.zipcode = 'Zipcode cannot be blank!';  
      return errors;
    }
    findFormErrorsCompany = () => {
        const {errors} = this.state;
        if(!this.state.companyName || this.state.companyName === '') errors.companyName = 'Company Name cannot be blank!';
        if(!this.state.about || this.state.about === '') errors.about = 'Role cannot be blank!';
        if(!this.state.ceo || this.state.ceo === '') errors.ceo = 'CEO Name cannot be blank!';
        if(!this.state.founded || this.state.founded === '') errors.founded = 'Founded details cannot be blank!';
        if(!this.state.companySize || this.state.companySize === '') errors.companySize = 'Company Size cannot be blank!';
        if(!this.state.revenue || this.state.revenue === '') errors.revenue = 'Revenue cannot be blank!';
        if(!this.state.industry || this.state.industry === '') errors.industry = 'Industry cannot be blank!'; 
        if(!this.state.companyDescription || this.state.companyDescription === '') errors.companyDescription = 'Company Description cannot be blank!';  
        if(!this.state.mission || this.state.mission === '') errors.mission = 'Mission & Vision cannot be blank!';  
        if(!this.state.workCulture || this.state.workCulture === '') errors.workCulture = 'Work Culture cannot be blank!';  
        if(!this.state.companyValues || this.state.companyValues === '') errors.companyValues = 'Comapny values cannot be blank!';  
        if(!this.state.website || this.state.website === '') errors.website = 'Website cannot be blank!';  
        if(!this.state.headquarters || this.state.headquarters === '') errors.headquarters = 'Headquarters cannot be blank!';  
        if(!this.state.companyType || this.state.companyType === '') errors.companyType = 'Company type cannot be blank!';   
        return errors;
      }
    sendEmployerAPI = (data) => {
        axios.post(`${backendServer}/addEmployerDetails`, data)
            .then(response=> {
                if (response.status === 200) {

                    console.log(response)
                    this.setState({
                        successMsg: response.data
                    })

                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }    
    sendCompanyAPI = (data) => {
        let compid = '';
        axios.post(`${backendServer}/addCompanyDetails`, data)
            .then(response=> {
               // console.log(response)
               compid = response.data[0].companyId;
                const companyname = response.data[0].companyName;
                this.props.setCompId(compid);
                    axios.post(`${backendServer}/api/createCompanyMongo`,{compid,companyname})
                    .then(response=> {
                        console.log(response.data)
                        // if (response.status === 200) {
                        //     console.log(response)
                        // }
                        // else {

                        //     //this.setState({ errorMsg: response.data });
                        //   }
                    }
                    );
                // }
                // else {
                //     this.setState({ errorMsg: response.data });
                //   }
            }
            
            );
            // const dispatch = useDispatch();
            // const setId = bindActionCreators(userActionCreator.setId,dispatch);
            
    }
    updateCompanyId = (data) => {
        var id = {
           // employerId:this.props.compid,
            companyid : data
        }
        axios.post(`${backendServer}/addCompanyIdToEmployer`, id)
            .then(response=> {
                if (response.status === 200) {
                   
                }
                else {
                    //this.setState({ errorMsg: response.data });
                  }
            }
            );
    }
    handleCompany = (e)=>{
        e.preventDefault();
        
        const val = e.target.value;
        //console.log(val)
        if(val !== 'Add'){
            this.setState({
                companyadded:false
            })

           this.updateCompanyId(val)
        }else {

            this.setState({
                companyadded:true
            })
            
        }
    }
    handleChangeCountry = (val) => {
        this.setState({ country: val });
        this.setState({
            errors: {},
          });
      }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            errors: {},
          });
    } 
    handleChangeCompanyName = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        const { companyDetails} = this.state;
        var {errors} = this.state;
        this.setState({ [e.target.name]: e.target.value })
        for (var i = 0; i < companyDetails.length ;i++) {
            if (e.target.value === companyDetails[i].companyName) {
                console.log("alra")
                errors.companyName = "Company Already exsists"
                return errors;
            }
        }
        errors.companyName = "";
        return errors;
        
    } 
   
   
    render() {
       const {updated,empupdated,companyupdated,errors,companyDetails,companyadded} = this.state;
       var empdetailscol = null;    
       var compdetailscol = null; 
       var companyDetailsDiv = null;
      
       if(empupdated){
           empdetailscol = (
               <div>
                    
                    <label className="dethead">Name:</label> {this.state.employerName}
                    <br/>
                    <label className="dethead">Role:</label>{this.state.roleInCompany}
                    <br/>
                    <label className="dethead">Address:</label>{this.state.address}
                    <br/>
                    <label className="dethead">City:</label>{this.state.city}
                    <br/>
                    <label className="dethead">State:</label>{this.state.state}
                    <br/>
                    <label className="dethead">Country:</label>{this.state.country}
                    <br/>
                    <label className="dethead">Zipcode:</label>{this.state.zipcode}
               </div>
           )
       }else if(!empupdated){
        empdetailscol = (
            <div>
                <Col>
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                <label>Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.employerName}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="employerName" 
                 value={this.state.employerName}
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Role<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.roleInCompany}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="roleInCompany" 
                 value={this.state.roleInCompany}
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Address<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.address}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="address"
                  value={this.state.address}
                  onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>City<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.city}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="city"
                  value={this.state.city}
                  onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>State<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.state}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="state" 
                 value={this.state.state}
                 onChange={this.handleChange}></input>
                 </Row>
                 
                 <br/>
                 <Row>
                 <label>Country<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.country}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<CountryDropdown className="detinput"
                    value={this.state.country}
                    onChange={(val) => this.handleChangeCountry(val)}      
                  />
                 </Row>
                 <br/>
                 <Row>
                 <label>zipcode<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}> {errors.zipcode}</span>
                
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="zipcode" 
                 value={this.state.zipcode}
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 </Col>
                 
                 <Button onClick = {this.handleEmpDetails}>Save</Button>
            </div>
        )
    }    
      
   
       if(companyupdated){
           
        compdetailscol = (
            <div>
                <label className="dethead">Company Name:</label>{this.state.companyName}
                <br/>
              <label className="dethead">Website:</label>{this.state.website}
              <br/>
              <label className="dethead">Company Size:</label>{this.state.companySize}
              <br/>
              <label className="dethead">About:</label>{this.state.about}
              <br/>
              <label className="dethead">Company Type:</label>{this.state.companyType}
              <br/>
              <label className="dethead"> Description:</label>{this.state.companyDescription}
              <br/>
              <label className="dethead">Revenue:</label>{this.state.revenue}
              <br/>
              <label className="dethead">Headquarters:</label>{this.state.headquarters}
              <br/>
              <label className="dethead"> Industry:</label>{this.state.industry}
              <br/>
              <label className="dethead">Founded:</label>{this.state.founded}
              <br/>
              <label className="dethead">Mission and Vision:</label>{this.state.mission}
              <br/>
              <label className="dethead">WorkCulture:</label>{this.state.workCulture}
              <br/>
              <label className="dethead">Company Values:</label>{this.state.companyValues}
              <br/>
              <label className="dethead">CEO Name:</label>{this.state.ceo}
              <br/>
               </div>
           )
       }else 
       if(!companyupdated){
        companyDetailsDiv = (
            <div>
            Select a Company
            <br/>
            <select  onChange={(e) =>{ this.handleCompany(e)}}>
            
            <option value="">Select</option> 
              {this.state.companyDetails.map(companyDetail=>
              <option value={companyDetail.companyId}>{companyDetail.companyName}</option>
              )}
              <option value="Add">Add Company</option> 
            </select>
            &nbsp;
            <Button onClick = {this.handleCompDetails}>Save</Button>
         
            
            </div>
            
       )
    }  if(companyadded){
        compdetailscol = (
            <div>
                <Col>
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                 <label>Company Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.companyName}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="companyName"
                 value={this.state.companyName }
                 onChange={this.handleChangeCompanyName}></input>
                 </Row>
                 
                 <br/>
                 <Row>
                 <label>Website<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.website}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="website"
                 value={this.state.website }
                 onChange={this.handleChange}></input>
                 </Row>

                 <br/>
                 <Row>
                 <label>Company Size<span style={{color:'red'}}>*</span></label>    
                 </Row>
                 <span style={{color:'red'}}>{errors.companySize}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput"
                 name="companySize"
                 value={this.state.companySize }
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>About<span style={{color:'red'}}>*</span></label>    
                 </Row>
                 <span style={{color:'red'}}>{errors.about}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea className="detinput"
                 name="about"
                 value={this.state.about }
                 onChange={this.handleChange}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Company Type<span style={{color:'red'}}>*</span></label> 
                 </Row>
                 <span style={{color:'red'}}>{errors.companyType}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput"
                 name="companyType"
                 value={this.state.companyType }
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Description<span style={{color:'red'}}>*</span></label>    
                 </Row>
                 <span style={{color:'red'}}>{errors.companyDescription}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea className="detinput"
                 name="companyDescription"
                 value={this.state.companyDescription }
                 onChange={this.handleChange}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Revenue<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.revenue}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput"
                 name="revenue"
                 value={this.state.revenue }
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Headquarters<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.headquarters}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput"
                 name="headquarters"
                 value={this.state.headquarters }
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Industry<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.industry}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput"
                 name="industry"
                 value={this.state.industry }
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Founded<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.founded}</span>
                 <Row>
                 &nbsp;&nbsp;&nbsp;<textarea className="detinput"
                 name="founded"
                 value={this.state.founded }
                 onChange={this.handleChange}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Mission and Vision<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.mission}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea className="detinput"
                 name="mission"
                 value={this.state.mission }
                 onChange={this.handleChange}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Work Culture<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.workCulture}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea className="detinput"
                 name="workCulture"
                 value={this.state.workCulture }
                 onChange={this.handleChange}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Company Values<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.companyValues}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea className="detinput"
                 name="companyValues"
                 value={this.state.companyValues }
                 onChange={this.handleChange}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>CEO Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.ceo}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput"
                 name="ceo"
                 value={this.state.ceo }
                 onChange={this.handleChange}></input>
                 </Row>
                
                 </Col>
                 
            </div>
        )
        }

    
      return (
        <div>
             {/* <EmployerNavbar/> */}
            <br></br>
            
            <div className="main-div">
            <div className = "details">   
            <h4>Employer Details</h4><span className="editdetails"/>
            
            </div>   

            {empdetailscol}
            
            </div>
            <div className="main-div">
            <div className = "details">   
            <h4>Company Details</h4><span className="editdetails"/>
            </div> 
             {companyDetailsDiv} 
              {compdetailscol}
            </div>
            <div>
            {/* <Modal size="md-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show} onHide={()=>this.handleModalClose()}>
                <Modal.Header closeButton>
                <Modal.Title>{successMsg} {errorMsg}</Modal.Title>
                </Modal.Header>
            </Modal> */}
      </div>
       
           
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
        
        empid: state.id
    };
  };
  function mapDispatchToProps(dispatch) {
    return {
        setCompId: compid => dispatch(setCompId(compid))
    };
  }
//   const EmployerProfile = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
//   export default EmployerProfile;
//   function mapDispatchToProps(dispatch) {
//     return {
//         setId: (inputData) => dispatch({ type: RESTDETAILS, payload: inputData }),
//     };
//   }
export default connect(mapStateToProps,mapDispatchToProps)(EmployerProfile);
  //export default EmployerProfile;


