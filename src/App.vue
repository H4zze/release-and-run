<template>
  <div id="app">
    <h1 class="title">Release and run</h1>
    <div id="main">
      <el-tabs type="card" class="flex-tab">
        <el-tab-pane label="Roster">
          <div class="roster-grid">
            <div class="roster">
              <div class="comp-wrapper">
                <div class="comp">
                  <div class="tanks">
                    <RoleNameComponent
                      :role="'tank'"
                      :count="rosterCount['tank']"
                    />
                  </div>
                  <div class="healers">
                    <RoleNameComponent
                      :role="'healer'"
                      :count="rosterCount['healer']"
                    />
                  </div>
                  <div class="meeles">
                    <RoleNameComponent
                      :role="'meele'"
                      :count="rosterCount['meele']"
                    />
                  </div>
                  <div class="ranged">
                    <RoleNameComponent
                      :role="'ranged'"
                      :count="rosterCount['ranged']"
                    />
                  </div>
                </div>
                <div class="buttons">
                  <div>
                    <el-button type="success" size="mini" disabled
                      >Save</el-button
                    >
                  </div>
                  <div>
                    <el-button
                      type="danger"
                      size="mini"
                      @click="resetRoster(true)"
                      >Empty</el-button
                    >
                  </div>
                </div>
              </div>
              <!-- 913185089419083776 -->
              <ClassNameComponent :className="'raid'" :disableAdd="true" />
              <div class="group">
                <draggable
                  v-model="roster"
                  group="people"
                  draggable=".roster-slot"
                >
                  <div
                    v-for="player of roster"
                    :key="player.name"
                    class="slot roster-slot"
                  >
                    <PlayerNameComponent :player="player" />
                  </div>
                  <div
                    v-for="slot of 25 - roster.length"
                    :key="slot"
                    class="slot"
                  >
                    {{ slot + roster.length }}
                  </div>
                </draggable>
              </div>
            </div>
            <hr v-if="bench.length > 0" />
            <div class="bench">
              <ClassNameComponent
                :className="'bench'"
                :disableAdd="true"
                v-if="bench.length > 0"
              />
              <div v-for="player in bench" :key="player.name" class="slot">
                <PlayerNameComponent :player="player" />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="card" class="flex-tab">
        <el-tab-pane
          :label="`Signups ${totalSignups ? '(' + totalSignups + ')' : ''}`"
        >
          <div class="sidebar">
            <!-- <h2>Signups {{ totalSignups }}</h2> -->
            <div class="fetch">
              <el-form v-on:submit.prevent>
                <el-form-item label="Raid ID" size="mini">
                  <el-input v-model="raidId" :clearable="true"></el-input>
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
              <div
                v-for="className in classes"
                :key="className"
                class="class-row"
              >
                <ClassNameComponent
                  :className="className"
                  v-if="signups[className].length > 0"
                  @addClassEvent="addClassToRoster($event)"
                />
                <div
                  v-for="player in signups[className]"
                  :key="player.name"
                  class="player"
                >
                  <div @click="addToRoster(player)">
                    <PlayerNameComponent :player="player" />
                    <div
                      class="add-player-button"
                      v-bind:class="{ inRoster: player.inRoster }"
                    ></div>
                  </div>
                  <div
                    class="bench-player-button"
                    @click="addToBench(player)"
                    v-bind:class="{ onBench: isBenched(player) }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="absence-bench">
              <div class="absence">
                <ClassNameComponent
                  :className="'absence'"
                  :disableAdd="true"
                  v-if="absences.length > 0"
                />
                <div v-for="player in absences" :key="player" class="player">
                  {{ player }}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-tabs
        v-model="activeAssignmentsTab"
        type="card"
        class="flex-tab assignments"
      >
        <el-tab-pane name="kara" label="Karazhan" disabled
          >Karazhan</el-tab-pane
        >
        <el-tab-pane name="gruul" label="Gruul's Lair" disabled
          >Gruul's Lair</el-tab-pane
        >
        <el-tab-pane name="mag" label="Magtheridon's Lair" disabled
          >Magtheridon's Lair</el-tab-pane
        >
        <el-tab-pane name="ssc" label="Serpentshrine Cavern">
          <SerpentShrineCavernsComponent />
        </el-tab-pane>
        <el-tab-pane name="tk" label="Tempest Keep">
          <TempestKeepComponent />
        </el-tab-pane>
        <el-tab-pane name="hyjal" label="Hyjal Summit" disabled
          >Hyjal Summit</el-tab-pane
        >
        <el-tab-pane name="bt" label="Black Temple" disabled
          >Black Temple</el-tab-pane
        >
        <el-tab-pane name="za" label="Zul'Aman" disabled>Zul'Aman</el-tab-pane>
        <el-tab-pane name="sunwell" label="Sunwell Plateau" disabled
          >Sunwell Plateau</el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
<style lang="scss">
@import "./assets/reset.css";
@import "./assets/styles.scss";
</style>
