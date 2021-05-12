const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', () => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.todoList.address;

    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);

    assert.equal(task.id.toNumber(), 1)
    assert.equal(task.content, 'test-1')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)
  })

  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskCount = await this.todoList.taskCount();
    const event = result.logs[0].args;

    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, 'A new task');
    assert.equal(event.completed, false);
    assert.equal(taskCount.toNumber(), 2);
  })

  it('toggles task completion', async () => {
    const result = await this.todoList.toggleCompleted(1)
    const task = await this.todoList.tasks(1)
    const event = result.logs[0].args;

    assert.equal(task.id.toNumber(), 1)
    assert.equal(task.completed, true)
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  });

  it('update task content', async () => {
    const result = await this.todoList.updateTask(1, 'updated')
    const task = await this.todoList.tasks(1)
    const event = result.logs[0].args;

    assert.equal(task.id.toNumber(), 1)
    assert.equal(task.content, 'updated')
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.content, 'updated')
  });

  it('delete task', async () => {
    const result = await this.todoList.deleteTask(2)
    const taskCount = await this.todoList.taskCount()
    const event = result.logs[0].args;

    assert.equal(taskCount.toNumber(), 1)
    assert.equal(event.id.toNumber(), 2)
  });

})