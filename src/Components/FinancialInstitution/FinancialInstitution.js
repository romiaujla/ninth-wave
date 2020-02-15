import React, { Component } from 'react';
import FinancialInstitutionServices from '../../Services/FinancialInstitutionServices';

export default class FinancialInstitution extends Component{

    constructor(props){
        super(props);
        this.state = {
            fi: {},
            style: {},
        }
    }

    componentDidMount = () => {
        const fiId = parseInt(this.props.rprops.match.params.fiId, 10);
        FinancialInstitutionServices.getProfileFromFiID(fiId)
            .then((fi) => {
                this.setState({
                    fi,
                    style: {
                        backgroundColor: `#${fi.fiBrand.bgColor}`,
                    }
                }, () => {console.log(this.state)})

                FinancialInstitutionServices.getLogoAndBGColor(fi.fiBrand)
                    .then((logo) => {
                        console.log(logo);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render()
    {
        const {fiBrand} = this.state.fi;
        if(this.state.fi.hasOwnProperty('fiID')){
            return (
                <div className='FinancialInstitution' style={this.state.style}>
                    <button type='button' onClick={() => {this.props.rprops.history.goBack()}}>
                        Go Back    
                    </button>
                    <div className='fi'>
                        {this.state.fi.fiName}
                        <img src={`https://res.cloudinary.com/ninth-wave/image/upload/b_rgb:${fiBrand.bgColor},bo_10px_solid_rgb:${fiBrand.bgColor},c_lpad,h_300,w_300/NWUI_fiLogos/${fiBrand.fiLogoOnColor}`} />
                    </div>
                </div>
            )   
        }else{
            return (
                <div className=''>
                    <button type='button' onClick={() => {this.props.rprops.history.goBack()}}>
                        Go Back    
                    </button>
                    <div className='lodaing'>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}