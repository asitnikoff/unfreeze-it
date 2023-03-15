<template>
  <div class="scoreboard">
    <Header :contest="contest"></Header>
    <transition-group name="flip-list">
      <TableRow
        v-for="[index, contestant] in contestants.entries()"
        :key="contestant.id"
        :contestant="contestant"
        :problems="contest.problems"
        class="scoreboard__row"
        :class="{
          scoreboard__current_contestant: this.currentContestantIndex === index,
        }"
        :contestType="contest.metadata.type"
      ></TableRow>
    </transition-group>
  </div>
</template>

<script>
import TableRow from "@/components/TableRow.vue";
import Header from "@/components/Header.vue";

export default {
  data() {
    return {
      contestants: this.contest.contestants,
    };
  },
  props: {
    contest: Object,
    currentContestantIndex: Number,
  },
  components: {
    TableRow,
    Header,
  },
  methods: {},
};
</script>

<style scoped>
.scoreboard__row {
  margin-top: 10px;
}
.flip-list-move {
  transition: transform 3s;
}

.scoreboard__current_contestant {
  border: 2px solid black;
}
</style>
