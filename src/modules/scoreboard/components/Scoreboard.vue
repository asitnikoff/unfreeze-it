<template>
  <div class="scoreboard">
    <Header class="scoreboard__header"></Header>
    <TransitionGroup name="flip-list">
      <TableRow
        v-for="[index, contestant] in contestants.entries()"
        :key="contestant.id"
        :contestant="contestant"
        class="scoreboard__row"
        :class="{
          scoreboard__current_contestant: currentContestantIndex === index,
        }"
        :contestType="$store.getters['scoreboard/CONTEST'].type"
      ></TableRow>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import TableRow from "@/modules/scoreboard/components/TableRow.vue";
import Header from "@/modules/scoreboard/components/Header.vue";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      nextClickCoolDown: `${this.$store.getters["scoreboard/NEXT_CLICK_COOL_DOWN"]}ms`,
    };
  },
  props: {
    currentContestantIndex: {
      type: Number,
      required: true,
    },
  },
  components: {
    TableRow,
    Header,
  },
  computed: {
    ...mapGetters({
      contestants: "scoreboard/CONTESTANTS",
      currentContestant: "scoreboard/CURRENT_CONTESTANT",
      currentProblem: "scoreboard/CURRENT_PROBLEM",
    }),
  },
});
</script>

<style scoped>
.scoreboard__row {
  margin-top: 10px;
}

.flip-list-move {
  transition: transform v-bind(nextClickCoolDown) ease-in-out;
}

.scoreboard__current_contestant {
  border: 2px solid black;
}
</style>
