pragma solidity ^0.5.0;

contract todoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed; 
  }

  mapping(uint => Task) public tasks;

  event Taskcreated(
    uint id,
    string content,
    bool completed    
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  event TaskUpdated(
    uint id,
    string content
  );

  event TaskDeleted(
    uint id
  );

  constructor() public {
    createTask('test-1');
  }

  function createTask(string memory _content) public {
    taskCount = taskCount + 1;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit Taskcreated(taskCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, tasks[_id].completed);
  }

  function updateTask(uint _id, string memory _content) public {
    Task memory _task = tasks[_id];
    _task.content = _content;
    tasks[_id] = _task;
    emit TaskUpdated(_id, _task.content);
  }

  function deleteTask(uint _id) public {
    delete tasks[_id];
    for (uint i = _id; i < taskCount; i++) {
      tasks[i] = tasks[i + 1];
    }
    taskCount--;
    emit TaskDeleted(_id);
  }
}