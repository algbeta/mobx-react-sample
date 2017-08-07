import appState from '../src/AppState'

jest.mock('mobx')

test('AppState: addFigure & no data passed : spies are not called', () => {
  const context = {
    figures: {
      push: jest.fn(),
      splice: jest.fn(),
    }
  };

  appState.prototype.addFigure.call(context)

  expect(context.figures.push).toHaveBeenCalledTimes(0, 'push spy should not be called');
  expect(context.figures.splice).toHaveBeenCalledTimes(0, 'splice spy should not be called');
})

test('AppState: addFigure & data passed : spies are called', () => {
  const context = {
    figures: {
      push: jest.fn(),
      splice: jest.fn(),
    }
  };

  const figure = { correctFigure: true }

  appState.prototype.addFigure.call(context, figure)

  expect(context.figures.push).toHaveBeenCalledTimes(1, 'push spy should be called once');
  expect(context.figures.push).toHaveBeenCalledWith(figure);
  expect(context.figures.splice).toHaveBeenCalledTimes(1, 'splice spy should be called once');
})