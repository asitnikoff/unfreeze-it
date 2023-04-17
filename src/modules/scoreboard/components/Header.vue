<template>
  <div class="header">
    <div class="header__head">
      <div class="header__contest_title">
        {{ contest.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ScoreboardGetterEnum from "@/store/modules/scoreboard/types/getter-types";

export default defineComponent({
  computed: {
    ...mapGetters("scoreboard", {
      contest: ScoreboardGetterEnum.GET_CONTEST,
    }),
  },
});
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
  font-weight: 600;
  font-size: 48px;
  color: #dd430f;
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
