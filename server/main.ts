import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import '../imports/api/TasksPublications';
import '../imports/api/tasksMethods';

async function insertTask(task: string) {
  TasksCollection.insertAsync({ text: task });
}

Meteor.startup(async () => {
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach((task) => insertTask(task));
  }
});
