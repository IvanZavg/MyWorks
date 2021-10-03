<template>
  <div class="card" v-if="show">
    <div class="row center">
      <div class="col s12">
        <h5>{{ title }}</h5>
      </div>
      <div class="col s12 overflow-x">
        <table class="striped">
          <thead>
            <th v-for="(headVal, idx) in headers" :key="'h' + idx">{{ headVal }}</th>
          </thead>
          <tbody>
            <tr v-for="(row, ridx) in shownRows" :key="'r' + ridx">
              <td v-for="(val, vidx) in row" :key="'r' + ridx + ':' + vidx">{{ val }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col s12 center">
        <ul class="pagination">
          <li class="waves-effec">
            <a href="#!" @click.prevent="choosePrevPage"
              ><i class="material-icons">chevron_left</i></a
            >
          </li>
          <li class="waves-effec" v-if="cntPages > 1">
            <a href="#!" @click.prevent="chooseFirstPage">1</a>
          </li>
          <li>...</li>
          <li class="active">
            <a href="#!" @click.prevent>{{ currPage }}</a>
          </li>
          <li>...</li>
          <li class="waves-effect" v-if="cntPages > 1">
            <a href="#!" @click.prevent="chooseLastPage">{{ cntPages }}</a>
          </li>
          <li class="waves-effect">
            <a href="#!" @click.prevent="chooseNextPage"
              ><i class="material-icons">chevron_right</i></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'headers', 'rows', 'fileData', 'show', 'cntRows'],
  data() {
    return {
      cntShowRows: parseFloat(this.$props.cntRows) || 5,
      currPage: 1,
    }
  },
  computed: {
    cntPages() {
      return Math.ceil(this.rows.length / this.cntShowRows)
    },
    shownRows() {
      let firstIdx = this.cntShowRows * this.currPage - this.cntShowRows
      let lastIdx = firstIdx + this.cntShowRows
      let shownRows = []
      for (let i = firstIdx; i < lastIdx; i++) {
        shownRows.push(this.rows[i])
      }
      return shownRows
    },
  },
  methods: {
    chooseFirstPage() {
      this.currPage = 1
    },
    chooseLastPage() {
      this.currPage = this.cntPages
    },
    chooseNextPage() {
      if (this.currPage < this.cntPages) this.currPage++
    },
    choosePrevPage() {
      if (this.currPage > 1) this.currPage--
    },
  },
}
</script>
