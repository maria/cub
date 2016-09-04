var React    = require('react');
var Formsy   = require('formsy-react');
var Textarea = require('react-textarea-autosize');

var Nav    = require('./nav');
var Footer = require('./footer');


var ContactPage = React.createClass({
  getInitialState: function() {
    return {
      canSubmit: false
    };
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  resetForm: function() {
    this.refs.form.reset();
    this.refs.form.inputs.emailContent.setValue('');
  },

  handleSubmit: function(data) {
    var data = JSON.stringify({
      name: data.fullName,
      email: data.email,
      content: data.emailContent
    });

    $.ajaxSetup({
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader("X-CSRFToken", Django.csrf_token());
        xhr.setRequestHeader("Content-Type", 'application/json');
      }
    });

    $.ajax({
       type: 'POST',
       url: '/api/public/contact/',
       data: data,
       success: function(data) { this.resetForm() }.bind(this),
       error: function(error) { }
   });

  },

  render: function() {
    return (
      <div>
        <Nav />
        <Formsy.Form ref="form" onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="col-md-6 col-md-offset-3 form" id="contact-form">
          <h1>Get in touch with us</h1>
            <div className="form-group">
              <FullNameInput name="fullName" validationError="Name is required" required/>
              <EmailInput name="email" validations="isEmail" validationError="A valid email is required" required/>
            </div>
            <div className="form-group">
              <ContentTextarea name="emailContent" validationError="Message is required" required/>
            </div>
            <div className="form-group">
              <a href='' className="contact-form__submit"><button type="submit" disabled={!this.state.canSubmit}>Send</button></a>
            </div>
        </Formsy.Form>
        <Footer />
      </div>
    )
  }
});

var FullNameInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
   this.setValue(event.currentTarget.value);
  },

  render: function () {
   var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

   var errorMessage = this.getErrorMessage();

   return (
     <div className={className}>
       <input type="text" onChange={this.changeValue} value={this.getValue()} placeholder="Full Name"/>
       <span className="form-error">{errorMessage}</span>
     </div>
   );
  }
});

var EmailInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <input type="email" onChange={this.changeValue} value={this.getValue()} placeholder="Email"/>
        <span className="form-error">{errorMessage}</span>
      </div>
    );
  }
});

var ContentTextarea = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <Textarea onChange={this.changeValue} value={this.getValue()} placeholder="Your message to us"></Textarea>
        <span className="form-error">{errorMessage}</span>
      </div>
    );
  }
});

module.exports = ContactPage;
