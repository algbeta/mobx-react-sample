import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Button } from 'reactstrap';
import Modal from './Modal';

require('./styles/default.scss');

@observer
class App extends Component {
  static generateRectanglesContainerBody(rectangles) {
    return rectangles.map((rectangle) => {
      if (!rectangle) return null;
      const { color, width, height, top, left, id } = rectangle;
      return (
        <div
          key={id}
          style={{
            backgroundColor: color,
            width: `${width}px`,
            height: `${height}px`,
            top: `${top}px`,
            left: `${left}px`,
          }}
          className="rectangle-container__element"
        />
      );
    },
   );
  }

  @autobind
  handleSubmit(figureData) {
    this.props.appState.addFigure(figureData);
    this.props.appState.toggleModal();
  }

  render() {
    const {
      appState: { isModalOpened, toggleModal, sumOfFigureWidths, preparedFigures },
    } = this.props;
    return (
      <div>
        <Modal
          isOpen={isModalOpened}
          toggle={toggleModal}
          handleSubmit={this.handleSubmit}
          widthSum={sumOfFigureWidths}
        />
        <Button onClick={toggleModal} className="rectangle-add-btn"> Add Rectangle </Button>
        <div className="rectangle-container">
          {App.generateRectanglesContainerBody(preparedFigures)}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  appState: PropTypes.instanceOf(Object).isRequired,
};

export default App;
