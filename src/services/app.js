import Web3 from 'web3'
import contract from '@truffle/contract';
import json from '../../build/contracts/todoList.json'
export default class App {
  constructor() {
    let contracts = {};
    let web3Provider = null;
    let account = '0x0';
    let web3 = {};
    let todoList = {};
    const host = 'http://127.0.0.1:7545';
    Object.defineProperties(this, {
      host: {
        get: () => host
      },
      web3: {
        get: () => web3,
        set: (value) => {
          web3 = value;
        }
      },
      todoList: {
        get: () => todoList,
        set: (value) => {
          todoList = value;
        }
      },
      contracts: {
        get: () => contracts,
        set: (value) => {
          contracts = value;
        }
      },
      web3Provider: {
        get: () => web3Provider,
        set: (value) => {
          web3Provider = value;
        }
      },
      account: {
        get: () => account,
        set: (value) => {
          account = value;
        }
      },
    })
  }

  log() {
    console.log({
      host: this.host,
      web3: this.web3,
      contracts: this.contracts,
      web3Provider: this.web3Provider,
      todoList: this.todoList,
      account: this.account,
      loading: this.loading
    });
  }

  async load() {
    await this.loadWeb3();
    await this.loadAccount();
    await this.loadContract();
  }

  loadWeb3() {
    // if (window.ethereum) {
    //   window.web3 = new Web3(ethereum);
    //   try {
    //     // Request account access if needed
    //     ethereum.enable();
    //   } catch (error) {
    //     // User denied account access...
    //   }
    // } else if (window.web3) {
    //   // Legacy dapp browsers...

    //   window.web3 = new Web3(web3.currentProvider);
    // } else {
    //   // Non-dapp browsers...
    //   console.log(
    //     'Non-Ethereum browser detected. You should consider trying MetaMask!'
    //   );
    // }
    // this.web3Provider = new web3.providers.HttpProvider(this.host);
    // this.web3 = web3;
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
    } else {
      // If no injected web3 instance is detected, fallback to Truffle Develop.
      this.web3Provider = new web3.providers.HttpProvider(this.host);
      this.web3 = new Web3(this.web3Provider);
    }
  }

  async loadAccount() {
    await window.ethereum.enable();
    this.account = await this.web3.eth.getAccounts(); 
  }

  async loadContract() {
    const todoList = json;
    this.contracts.todoList = TruffleContract(todoList);
    this.contracts.todoList.setProvider(this.web3Provider);
    this.todoList = await this.contracts.todoList.deployed();
  }

  async getData() {
    const data = [];
    const taskCount = await this.todoList.taskCount();
    for (let i = 1; i <= taskCount.toNumber(); i++) {
      const task = await this.todoList.tasks(i);
      const id = task.id.toNumber();
      const text = task.content; 
      const completed = task.completed;
      data.push({id, text, completed});
    }
    return data;
  }

  async createTask(content) {
    await this.todoList.createTask(content, {from : this.account[0]});
  }

  async toggleCompleted(id) {
    await this.todoList.toggleCompleted(id, {from : this.account[0]})
  }

  async deleteTask(id) {
    await this.todoList.deleteTask(id, {from : this.account[0]})
  }

  async updateTask(id, text) {
    await this.todoList.updateTask(id, text, {from : this.account[0]})
  }
}