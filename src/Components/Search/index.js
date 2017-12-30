import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

class Search extends Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        const {onChange, value, children, onSubmit} = this.props;
        return(
            <div> 
                <form onSubmit={onSubmit}>
                    <FormGroup>
                    <h1 style={{ 'fontWeight' : 'bold' }}>{children}</h1>
                    <hr style={{ 'border' : '3px solid black', 'width' : '200px' }} />
                        <div className="input-group">
                            <input type="text" onChange={onChange} value={value} className="form-control width100 searchForm" placeholder="Search...." ref={(node) => { this.input = node }} />
                            
                            <span className="input-group-btn">
                                <button className="btn btn-primary searchBtn" type="submit">
                                    Search
                                </button>
                            </span>
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default Search;