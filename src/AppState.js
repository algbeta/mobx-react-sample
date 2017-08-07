import { observable, action, computed } from 'mobx';
import uuid from 'uuid';

const MAX_AMOUNT_OF_FIGURES = 5;

class AppState {
  @observable figures = new Array(MAX_AMOUNT_OF_FIGURES);
  @observable isModalOpened = false;

  @action.bound
  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
  }

  @action.bound
  addFigure(figure) {
    // I don't want to care about quantity of the figures
    // when a new one is added, first one is removed
    const temp = figure;
    if (temp) {
      temp.id = uuid.v4();
      this.figures.push(temp);
      this.figures.splice(0, 1);
    }
  }

  @action.bound
  addFigures(figures) {
    if (figures) {
      figures.forEach((figure) => {
        this.addFigure(figure);
      });
    }
  }

  @computed get sumOfFigureWidths() {
    return this.figures.reduce((sum, figure) => {
      let updatedSum = sum;
      if (figure && figure.width) {
        updatedSum += parseInt(figure.width, 10);
      }
      return updatedSum;
    }, 0);
  }

  @computed get preparedFigures() {
    return this.figures.filter(figure => figure != null);
  }
}

export default AppState;
