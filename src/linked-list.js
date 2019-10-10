const Node = require("./node");

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  append(data) {
    let node = new Node(data);

    if (this.length == 0 || this.length < 0) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
      this._tail.next = null;
    }
    this.length++;

    return this;
  }

  head() {
    return this._head === null ? null : this._head.data;
  }

  tail() {
    return this._tail === null ? null : this._tail.data;
  }

  at(index) {
    let currentNode = this._head,
      length = this.length,
      count = 0;

    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode.data;
  }

  insertAt(index, data) {
    let currentNode = this._tail,
      count = 0,
      length = this.length,
      buffArr = [],
      buffElement = null;
    //Case: Not correct index or list is empty
    if (this.length === 0 || index < 0 || index > length) {
      return this;
    }

    //Remove all elemtns up to index, wrie then in buffArr
    for (let i = length - 1; i >= index; i--) {
      buffArr.push(currentNode.data);

      this.deleteAt(this.length - 1);
      currentNode = currentNode.prev;
    }

    this.append(data);

    //back elements in list after appending data
    for (let i = index; i < length; i++) {
      buffElement = buffArr.pop();
      this.append(buffElement);
    }
    this.length++;

    return this;
  }

  isEmpty() {
    return this._head === null;
  }

  clear() {
    while (this.length > 1) {
      this._tail.prev = this._tail;
      this._tail = null;
      this.length--;
    }

    this._head = null;
    this.length--;

    return this;
  }

  deleteAt(index) {
    let currentNode = this._head,
      count = 0,
      beforeNodeToDelete = null,
      afterNodeToDelete = null,
      nodeToDelete = null;
    //Case: Not correct index or list is empty
    if (this.length === 0 || index < 0 || index > this.length) {
      throw new Error("Not correct index or list is empty");
    }
    //Case: index = 0
    if (index === 0) {
      //Case: only one element in list
      if (this.length === 1) {
        this._head = null;
        this._tail = null;
        //Case: more than one element in list
      } else {
        this._head = currentNode.next;
        while (count < this.length) {
          currentNode = currentNode.next;
          count++;
        }
      }
      //Case: last element in list
    } else if (index == this.length - 1) {
      this._tail = this._tail.prev;
      //Case: not last/not first element in list
    } else {
      count = 0;

      while (count < index) {
        currentNode = currentNode.next;
        count++;
      }

      beforeNodeToDelete = currentNode.prev;
      nodeToDelete = currentNode;
      afterNodeToDelete = currentNode.next;

      beforeNodeToDelete.next = afterNodeToDelete;
      afterNodeToDelete = beforeNodeToDelete;
    }
    this.length--;

    return this;
  }

  reverse() {
    let count = 0,
      currentNode = this._head,
      buffArr = [],
      length = this.length,
      element = 0;

    //push elements in array, except last
    while (count < length - 1) {
      buffArr.push(currentNode.data);

      this.deleteAt(0);

      currentNode = currentNode.next;
      count++;
    }

    count = 0;
    //append elements from array in reverse sequence
    while (count < length - 1) {
      element = buffArr.pop();
      this.append(element);
      count++;
    }

    return this;
  }

  indexOf(data) {
    let count = 0,
      noData = -1,
      currentNode = this._head;

    while (count < this.length) {
      if (data == currentNode.data) {
        noData = 1;
        return count;
      }
      currentNode = currentNode.next;
      count++;
    }
    return noData;
  }
}

module.exports = LinkedList;
