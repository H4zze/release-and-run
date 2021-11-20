<template>
  <div id="app">
    <h1 class="title">Release and run</h1>
    <div id="main">
      <div class="roster">
        <h2>Roster ({{ roster.length }})</h2>
        <div v-for="player of roster" :key="player.name" class="slot">
          <PlayerNameComponent :player="player" />
        </div>
        <div v-for="slot of 25 - roster.length" :key="slot" class="slot">
          {{ slot + roster.length }}
        </div>
        <div class="comp">
          <div class="tanks">
            <RoleNameComponent :role="'tank'" /> {{ rosterCount["tank"] }}
          </div>
          <div class="healers">
            <RoleNameComponent :role="'healer'" /> {{ rosterCount["healer"] }}
          </div>
          <div class="meeles">
            <RoleNameComponent :role="'meele'" /> {{ rosterCount["meele"] }}
          </div>
          <div class="ranged">
            <RoleNameComponent :role="'ranged'" /> {{ rosterCount["ranged"] }}
          </div>
        </div>
      </div>
      <div class="sidebar">
        <h2>Signups {{ totalSignups }}</h2>
        <div class="fetch">
          <el-form v-on:submit.prevent>
            <el-form-item label="Raid ID" size="mini">
              <el-input v-model="raidId"></el-input>
            </el-form-item>
            <div class="fetch-button-container">
              <el-button
                type="primary"
                size="mini"
                native-type="button"
                :disabled="this.raidId.length === 0"
                :loading="isSignupsLoading"
                @click="getSignups()"
                >Get raid</el-button
              >
            </div>
            <div class="fetch-button-container">
              <el-button type="danger" size="mini" @click="resetRoster()"
                >Reset</el-button
              >
            </div>
          </el-form>
        </div>
        <div v-if="Object.keys(signups).length > 0" class="signup-grid">
          <div v-for="className in classes" :key="className" class="class-row">
            <ClassNameComponent
              :className="className"
              v-if="signups[className].length > 0"
            />
            <div
              v-for="player in signups[className]"
              :key="player.name"
              class="player"
            >
              <div
                class="button"
                v-bind:class="{ inRoster: player.inRoster }"
                @click="addToRoster(player)"
              ></div>
              <PlayerNameComponent :player="player" />
            </div>
          </div>
        </div>
      </div>
      <div class="tools">
        <h2>Assignments</h2>
        <el-tabs type="card">
          <el-tab-pane label="Karazhan">Karazhan</el-tab-pane>
          <el-tab-pane label="Gruul's Lair">Gruul's Lair</el-tab-pane>
          <el-tab-pane label="Magtheridon's Lair"
            >Magtheridon's Lair</el-tab-pane
          >
          <el-tab-pane label="Serpentshrine Cavern">
            <SerpentShrineCavernsComponent />
          </el-tab-pane>
          <el-tab-pane label="Tempest Keep">
            <TempestKeepComponent />
          </el-tab-pane>
          <el-tab-pane label="Hyjal Summit">Hyjal Summit</el-tab-pane>
          <el-tab-pane label="Black Temple">Black Temple</el-tab-pane>
          <el-tab-pane label="Zul'Aman">Zul'Aman</el-tab-pane>
          <el-tab-pane label="Sunwell Plateau">Sunwell Plateau</el-tab-pane>
        </el-tabs>
      </div>
      <div class="assignments"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
<style lang="scss">
@import "./assets/reset.css";
@import "./assets/styles.scss";
</style>
