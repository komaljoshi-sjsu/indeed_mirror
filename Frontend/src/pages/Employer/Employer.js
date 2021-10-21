//sample employer component
import { React, Component} from 'react';
import Button from "@mui/material/Button";

class Employer extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;
        history.push('/postJob');
    }
  
    render() {
      return (
        <div>
            <br></br>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>Post Job</Button>
        </div>
      );
    }
  }
  export default Employer;