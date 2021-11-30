<template>
  <div>
    <h1>SSC</h1>
    <el-collapse v-model="activeToggle">
      <el-collapse-item title="General" name="general">
        <GeneralRaidComponent />
      </el-collapse-item>
      <el-collapse-item title="Hydross" name="hydross">
        <HydrossComponent />
      </el-collapse-item>
      <el-collapse-item title="Lurker" name="lurker">
        <LurkerComponent />
      </el-collapse-item>
      <el-collapse-item title="Leotheras" name="leotheras">
        <LeotherasComponent />
      </el-collapse-item>
      <el-collapse-item title="Karathress" name="karathress">
        <KarathressComponent />
      </el-collapse-item>
      <el-collapse-item title="Morogrim" name="morogrim">
        <MorogrimComponent />
      </el-collapse-item>
      <el-collapse-item title="Vashj" name="vashj">
        <VashjComponent />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script src="./SerpentShrineCavernsComponent.ts" />
<style src="./SerpentShrineCavernsComponent.css" />
