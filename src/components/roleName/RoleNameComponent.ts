import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class RoleNameComponent extends Vue {
  @Prop()
  role!: string;

  getRoleIcon(role: string) {
    return require("../../assets/icons/roles/" + role + ".jpg");
  }
}
