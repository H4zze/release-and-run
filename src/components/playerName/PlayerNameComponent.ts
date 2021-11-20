import { Component, Prop, Vue } from "vue-property-decorator";
import { Player } from "../../model/Player";

@Component({})
export default class PlayerNameComponent extends Vue {
  @Prop()
  player!: Player;

  getSpecIcon(name: string, spec: string) {
    return require("../../assets/icons/specs/" +
      name.toLowerCase() +
      "/" +
      spec.toLowerCase() +
      ".jpg");
  }
}
