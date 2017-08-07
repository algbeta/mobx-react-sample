# mobx-react-sample

**Mobx-react-sample** is a simple application made to get into MobX.

User is able to add up to 5 reactangles.

To add a rectangle user click 'Add Rectangle' button in the left top corner.

A Popup with data required for rectangle creation is shown.

User has to fill width, height, top and left inputs. Those inputs support numeric values.

Color input is set to 'red' by default but can be changed to any from the available options.

Rectangle's data can't be edited.

If User tries to add 6th rectangle, the one which was added first is deleted so 5 is a constant number of rectangles being displayed.

### Installation process
- Run `npm install` to install all the necessary dependencies
- Create a `.env` file that looks similar to this
  ```
  BUILD_ENV=production
  ```
- Run `npm start` to start the development server

### Run the tests

```
npm test
```
