<template>
  <el-tooltip
    content="Add class to roster"
    placement="left"
    :disabled="disableAdd"
  >
    <div
      class="class-name"
      v-bind:class="{ clickable: !disableAdd }"
      @click="emitAddClassEvent()"
    >
      <img :src="getClassIcon(className)" />
      <div>{{ className }}</div>
    </div>
  </el-tooltip>
</template>
<script src="./ClassNameComponent.ts" />
<style src="./ClassNameComponent.css" />
