<template>
  <div class="header">
    <div class="header__head">
      <div class="header__contest_title">
        {{ $store.getters["scoreboard/CONTEST"].metadata.title }}
      </div>
    </div>
    <div class="header__body">
      <div class="header__rank">Rank</div>
      <div class="header__contestant_name">Name</div>
      <div class="header__problems_title">Problems</div>
      <template v-if="contest.metadata.type === 'ICPC'">
        <div class="header__icpc">
          <div class="header__solved">Solved</div>
          <div class="header__penalty">Penalty</div>
        </div>
      </template>
      <div class="header__points" v-if="contest.metadata.type === 'IOI'">
        Points
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      contest: "scoreboard/CONTEST",
    }),
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
}
.header__body {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.header__contest_title {
  font-weight: bold;
}

.header__head {
  align-self: center;
}

.header__rank {
  /* padding: 10px; */
  width: 2%;
  text-align: center;
}

.header__contestant_name {
  width: 10%;
}

.header__problems_title {
  width: 82%;
  text-align: center;
}

.header__icpc {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 5.5%;
}
</style>
