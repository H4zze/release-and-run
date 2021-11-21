import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ClassNameComponent extends Vue {
  @Prop()
  className!: string;
  @Prop()
  disableAdd!: boolean;

  getClassIcon(name: string): string {
    return require("../../assets/icons/classes/" + name.toLowerCase() + ".jpg");
  }

  emitAddClassEvent() {
    if (!this.disableAdd) {
      this.$emit("addClassEvent", this.className);
    }
  }
}
