<template>
  <div class="player-name">
    <div class="spec">
      <img :src="getSpecIcon(player.className, player.spec)" />
    </div>
    <div class="name">{{ player.name }}</div>
  </div>
</template>
<script src="./PlayerNameComponent.ts" />
<style src="./PlayerNameComponent.css" />
