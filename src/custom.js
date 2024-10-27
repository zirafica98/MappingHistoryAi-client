import React from "react"


class SearchForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      window.location.href="?location="+this.state.value
      event.preventDefault();
    }
  
    render() {
      return (
        <form className="search" onSubmit={this.handleSubmit}> 
          <div className="search-box">
          <input className="search-txt" type="text" name="" value={this.state.value} onChange={this.handleChange} placeholder="Type to Search"/>
          <a className="search-btn" >
            <i className="fa fa-search"></i>
          </a>
          </div>
        </form>
      );
    }
  }

export default SearchForm
