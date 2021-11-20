import { Component, Vue, Watch } from "vue-property-decorator";
import ClassNameComponent from "./components/className/ClassNameComponent.vue";
import PlayerNameComponent from "./components/playerName/PlayerNameComponent.vue";
import RoleNameComponent from "./components/roleName/RoleNameComponent.vue";
import SerpentShrineCavernsComponent from "./components/raids/ssc/SerpentShrineCavernsComponent.vue";
import TempestKeepComponent from "./components/raids/tk/TempestKeepComponent.vue";
import { Player } from "./model/Player";

@Component({
  components: {
    ClassNameComponent,
    PlayerNameComponent,
    RoleNameComponent,
    SerpentShrineCavernsComponent,
    TempestKeepComponent,
  },
})
export default class App extends Vue {
  @Watch("roster")
  rosterWatcher() {
    this.rosterCount["tank"] = this.countSpecs("tank");
    this.rosterCount["healer"] = this.countSpecs("healer");
    this.rosterCount["meele"] = this.countSpecs("meele");
    this.rosterCount["ranged"] = this.countSpecs("ranged");
  }
  roles = ["tank", "healer", "meele", "ranged"];
  classes = [
    "druid",
    "hunter",
    "mage",
    "rogue",
    "paladin",
    "priest",
    "shaman",
    "tank",
    "warlock",
    "warrior",
  ];
  healingSpecs = ["holy", "restoration", "discipline", "holy1", "restoration1"];
  tankSpecs = ["guardian", "protection", "protection1"];
  meeleSpecs = [
    "arms",
    "combat",
    "enhancement",
    "feral",
    "fury",
    "retribution",
    "subtlety",
  ];
  rangedSpecs = [
    "affliction",
    "arcane",
    "balance",
    "beastmastery",
    "demonology",
    "destruction",
    "elemental",
    "fire",
    "frost",
    "marksmanship",
    "shadow",
    "survival",
  ];

  roster: Player[] = [];
  rosterCount: { [key: string]: number } = {
    tank: 0,
    healer: 0,
    meele: 0,
    ranged: 0,
  };
  signups: { [key: string]: Player[] } = {};
  totalSignups = null;
  raidId = "";
  response = [];
  test = false;
  isSignupsLoading = false;

  addToRoster(player: Player) {
    if (player.inRoster) {
      const index = this.roster.findIndex((p) => p.name === player.name);
      this.roster.splice(index, 1);
    } else {
      this.roster.push(player);
    }
    player.inRoster = !player.inRoster;
  }

  mounted() {
    console.log(process.env.VUE_APP_SERVER_URL);
  }

  countSpecs(type: "tank" | "healer" | "meele" | "ranged") {
    let specs: string[] = [];
    switch (type) {
      case "tank":
        specs = this.tankSpecs;
        break;
      case "healer":
        specs = this.healingSpecs;
        break;
      case "meele":
        specs = this.meeleSpecs;
        break;
      case "ranged":
        specs = this.rangedSpecs;
        break;
    }
    return this.roster.filter((x) => specs.includes(x.spec)).length;
  }

  getSignups() {
    if (this.raidId.length > 0) {
      this.resetRoster();
      this.isSignupsLoading = true;
      const url = `${process.env.VUE_APP_SERVER_URL}signups/${this.raidId}`;
      fetch(url, {
        method: "GET",
      }).then((response) => {
        response.json().then((json) => {
          const parsedJson = JSON.parse(json);
          this.totalSignups = parsedJson.Total;
          this.signups = parsedJson.Classes;
          this.isSignupsLoading = false;
        });
      });
    }
  }

  resetRoster() {
    // this.raidId = "";
    this.roster = [];
    Object.keys(this.signups).forEach((key) => {
      this.signups[key].forEach((player) => (player.inRoster = false));
    });
    this.signups = {};
  }
}
