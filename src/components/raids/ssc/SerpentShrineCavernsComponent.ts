import { Component, Prop, Vue } from "vue-property-decorator";
import GeneralRaidComponent from "../general/GeneralRaidComponent.vue";
import HydrossComponent from "./hydross/HydrossComponent.vue";
import KarathressComponent from "./karathress/KarathressComponent.vue";
import LeotherasComponent from "./leotheras/LeotherasComponent.vue";
import LurkerComponent from "./lurker/LurkerComponent.vue";
import MorogrimComponent from "./morogrim/MorogrimComponent.vue";
import VashjComponent from "./vashj/VashjComponent.vue";

@Component({
  components: {
    GeneralRaidComponent,
    HydrossComponent,
    LurkerComponent,
    LeotherasComponent,
    KarathressComponent,
    MorogrimComponent,
    VashjComponent,
  },
})
export default class SerpentShrineCavernsComponent extends Vue {
  activeToggle = "general";
}
