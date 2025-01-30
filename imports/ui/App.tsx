import React from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { Meteor } from 'meteor/meteor';

export const App = () => {
  const isLoading = useSubscribe('tasks');
  const tasks = useTracker(() => TasksCollection.find({}).fetch());
  const handleToggleChecked = ({ _id, isChecked }: any) =>
    Meteor.callAsync('tasks.toggleChecked', { _id, isChecked });
  const handleDelete = ({ _id }: any) =>
    Meteor.callAsync('tasks.delete', { _id });

  if (isLoading()) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>
      <div className="main">
        <TaskForm />

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={handleToggleChecked}
              onDeleteClick={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
