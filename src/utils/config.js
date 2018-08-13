import nodesRef from '../config.js';

let elements = [];
nodesRef.once("value", (snapshot) => {
  snapshot.forEach((child) => {
  elements.push({data: { id: child.val().name } });
  })
})
console.log(elements);
export default {
  elements: elements,
  style: [
    {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(id)'
    }
    }, {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
    }
  ],
  layout: {
    name: 'grid',
    rows: 1
  }
}