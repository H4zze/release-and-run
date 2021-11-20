import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ClassNameComponent extends Vue {
  @Prop()
  className!: string;

  getClassIcon(name: string): string {
    return require("../../assets/icons/classes/" + name.toLowerCase() + ".jpg");
  }
}
