<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>Infinite Power</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Articles List</h3>
      </div>
      <div class="card-body">
        <div class="card">
          <div class="card-header">Add Book</div>
          <div class="card-body">
            <form id="form"
                  class="form-inline"
                  @submit.prevent="addArticle">
              <div class="form-group mb-2">
                <label for="title" class="sr-only">Title</label>
                <input id="title"
                      type="text"
                      class="form-control"
                      placeholder="Title"
                      v-model="newArticle.title" />
              </div>
              <div class="form-group mx-sm-3 mb-2">
                <label for="author" class="sr-only">Author</label>
                <input id="author"
                      type="text"
                      class="form-control"
                      placeholder="Author"
                      v-model="newArticle.author" />
              </div>
              <div class="form-group mb-2">
                <label for="url" class="sr-only">Url</label>
                <input id="url"
                      type="text"
                      class="form-control"
                      placeholder="http://"
                      v-model="newArticle.url" />
              </div>
              <button class="btn btn-primary mx-sm-3 mb-2">Add</button>
            </form>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td>
                <a :href="article.url">{{ article.title }}</a>
              </td>
              <td>{{ article.author }}</td>
              <td>
                <span class="pointer"
                      @click="removeArticle(article)">
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
import articlesRef from './config'
import config from '@/utils/config'
import Cytoscape from './components/Cytoscape'
import CyObj from '@/components/cy-object'
export default {
  name: 'app',
  firebase: {
    articles: articlesRef
  },
  data () {
    return {
      newArticle: {
        title: '',
        author: '',
        url: ''
      },
      config: config,
      i: 0
    }
  },
  methods: {
    addArticle () {
      articlesRef.push(this.newArticle)
      this.newArticle.title = ''
      this.newArticle.author = ''
      this.newArticle.url = ''
    },
    removeArticle (article) {
      articlesRef.child(article['.key']).remove()
    },
    preConfig (cytoscape) {
      console.log('calling pre-config')
      // contextMenus(cytoscape, jquery)
      //cytoscape.use(cxtmenu)
    },
    afterCreated (cy) {
      console.log('after created')
      /*let menu = cy.cxtmenu({
        selector: 'core',
        commands: [
          {
            content: 'bg1',
            select () {
              console.log('bg1')
            }
          },

          {
            content: 'bg2',
            select () {
              console.log('bg2')
            }
          }
        ]
      })*/
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
