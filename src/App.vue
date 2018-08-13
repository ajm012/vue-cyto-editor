<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>Infinite Power</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Nodes List</h3>
      </div>
      <div class="card-body">
        <div class="card">
          <div class="card-header">Add Node</div>
          <div class="card-body">
            <form id="form"
                  class="form-inline"
                  @submit.prevent="addNode">
              <div class="form-group mb-2">
                <label for="name" class="sr-only">Name</label>
                <input id="name"
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      v-model="newNode.name" />
              </div>
              <button class="btn btn-primary mx-sm-3 mb-2">Add</button>
            </form>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nodes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="node in nodes" :key="node.id">
              <td>{{ node.name }}</td>
              <td>
                <span class="pointer"
                      @click="removeNode(node)">
                  <i class="fas fa-trash"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="holder">
        <cytoscape :key="'cyKey()'" :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/>
      </div>
    </div>
  </div>
</template>

<script>
import nodesRef from './config'
import config from '@/utils/config'
import Cytoscape from './components/Cytoscape'
import CyObj from '@/components/cy-object'
import cxtmenu from 'cytoscape-cxtmenu'
export default {
  name: 'app',
  firebase: {
    nodes: nodesRef
  },
  data () {
    return {
      newNode: {
        name: ''
      },
      config: config,
      i: 0
    }
  },
  methods: {
    addNode () {
      nodesRef.push(this.newNode)
      this.newNode.name = ''
    },
    removeNode (node) {
      nodesRef.child(node['.key']).remove()
    },
    preConfig (cytoscape) {
      console.log('calling pre-config')
      cytoscape.use(cxtmenu)
    },
    afterCreated (cy) {
      console.log('after created')

      // NODE COMMANDS
      cy.cxtmenu({
        selector: 'node',
        commands: [
          {
            content: 'Delete node',
            select (elem) {
              cy.remove(elem)
            }
          }
        ]
      })

      // CORE COMMANDS
      cy.cxtmenu({
        selector: 'core',
        commands: [
          {
            content: 'Add Edge',
            select () {
              let from = prompt('Source node')
              let to = prompt('Target node')
              cy.add({group: 'edges', data: {id: from + '-' + to, source: from, target: to}})
            }
          }
        ]
      })

      // EDGE COMMANDS
      cy.cxtmenu({
        selector: 'edge',
        commands: [
          {
            content: 'Delete edge',
            select (elem) {
              cy.remove(elem)
            }
          }
        ]
      })
    },
    cyKey () {
      const that = this
      CyObj.reset()
      CyObj.instance.then(cy => {
        console.log('cy', cy)
        cy.on('tap', event => {
          console.log('tapped')
          that.i++
        })
      })
      console.log('computing cyKey cy' + this.i)
      return 'cy' + this.i
    }
  },
  components: {
    Cytoscape
  }
}
</script>

<style>
  .pointer {
    cursor: pointer;
  }
  #holder {
    width: 100%;
    height: 400px;
  }
</style>
