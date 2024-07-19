/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  const handleAddTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? editingTask : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingTask('');
    } else {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center todo-title">Todo list</h1>
      <Form className="mb-4">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              value={editingIndex !== null ? editingTask : newTask}
              onChange={(e) => {
                if (editingIndex !== null) {
                  setEditingTask(e.target.value);
                } else {
                  setNewTask(e.target.value);
                }
              }}
            />
          </Col>
          <Col md={4}>
            <Button onClick={handleAddTask} className="w-100">
              {editingIndex !== null ? 'Update' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {task}
            <div>
              <Button variant="warning" className="me-2" onClick={() => handleEditTask(index)}>
                ✏️
              </Button>
              <Button variant="danger" onClick={() => handleDeleteTask(index)}>
                🗑️
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {tasks.length > 0 && (
        <Button variant="danger" className="mt-3 w-100" onClick={handleDeleteAllTasks}>
          Delete All
        </Button>
      )}
    </Container>
  );
}

export default App;
