import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { Form, FormGroup, Label, Alert, Input, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ComplexModal extends Component {
  constructor() {
    super();
    this.state = {
      error: {
        visible: false,
      },
      // default background rectangle color
      color: 'red',
    };
  }

  @autobind
  handleChange(e) {
    this.setState({
      error: {
        visible: false,
      },
      [e.target.name]: e.target.value,
    });
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    this.props.handleSubmit(this.state);
    this.setState({});
  }

  @autobind
  isFormValid() {
    const { widthSum } = this.props;
    const numericFields = ['width', 'height', 'top', 'left'];
    for (let i = 0; i < numericFields.length; i += 1) {
      // existance check
      if (!this.state[numericFields[i]]) {
        this.setState({ error: {
          message: `Please, fill data in ${numericFields[i]}`,
          visible: true,
        } });

        return false;
      }

      // I assume we are allowed to pass only integers
      if (!/^\d+$/.test(this.state[numericFields[i]])) {
        this.setState({
          error: {
            message: `${numericFields[i]} must be a number!`,
            visible: true,
          },
        });
        return false;
      }
    }

    if (widthSum + parseInt(this.state.width, 10) > document.documentElement.clientWidth) {
      this.setState({
        error: {
          message: 'Expected figure is too wide! Rectangles don\'t fit the screen',
          visible: true,
        },
      });
      return false;
    }

    return true;
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <Alert color="warning" isOpen={this.state.error.visible}>{this.state.error.message}</Alert>
        <ModalHeader>Add new rectangle</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="widthInput">Width, px:</Label>
              <Input onChange={this.handleChange} name="width" id="widthInput" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="heightInput">Height, px:</Label>
              <Input onChange={this.handleChange} name="height" id="heightInput" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="topInput">Top, px:</Label>
              <Input onChange={this.handleChange} name="top" id="topInput" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="leftInput">Left, px:</Label>
              <Input onChange={this.handleChange} name="left" id="leftInput" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="colorInput">Background color:</Label>
              <Input type="select" onChange={this.handleChange} name="color" id="heightInput">
                <option>red</option>
                <option>blue</option>
                <option>grey</option>
                <option>magenta</option>
                <option>black</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="secondary" onClick={this.handleSubmit}>Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ComplexModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  widthSum: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

ComplexModal.defaultProps = {
  isOpen: false,
};

export default ComplexModal;
