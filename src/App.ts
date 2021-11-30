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
  absences: string[] = [];
  bench: Player[] = [];
  totalSignups = null;
  raidId = "";
  response = [];
  test = false;
  isSignupsLoading = false;
  activeAssignmentsTab = "ssc";

  addToRoster(player: Player) {
    const fillBench = () => {
      this.classes.forEach((c) => {
        const benchedClass = this.signups[c].filter((p) => !p.inRoster);
        this.bench.push(...benchedClass);
      });
    };
    if (player.inRoster) {
      const index = this.roster.findIndex((p) => p.name === player.name);
      this.roster.splice(index, 1);
      player.inRoster = false;
      this.bench = [];
    } else {
      if (this.roster.length >= 25) {
        fillBench();
      } else {
        if (this.isBenched(player)) {
          return;
        }
        this.roster.push(player);
        player.inRoster = true;
        if (this.roster.length === 25) {
          fillBench();
        }
      }
    }
  }

  addClassToRoster(className: string) {
    this.signups[className].forEach((player) => this.addToRoster(player));
  }

  addToBench(player: Player) {
    if (!this.isBenched(player)) {
      player.inRoster = false;
      this.bench.push(player);
      const index = this.roster.findIndex((p) => p.name === player.name);
      if (index > -1) {
        this.roster.splice(index, 1);
      }
    } else {
      const index = this.bench.findIndex((p) => p.name === player.name);
      if (index > -1) {
        this.bench.splice(index, 1);
      }
    }
  }

  isBenched(player: Player): boolean {
    return this.bench.map((b) => b.name).includes(player.name);
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
          console.log(parsedJson);

          this.totalSignups = parsedJson.Total;
          this.signups = parsedJson.Classes;
          this.absences = parsedJson.Classes.absence.map(
            (player: { name: string; className: string }) => player.name
          );
          this.isSignupsLoading = false;
        });
      });
    }
  }

  resetRoster(isRosterOnly: boolean = false) {
    this.roster = [];
    this.absences = [];
    Object.keys(this.signups).forEach((key) => {
      this.signups[key].forEach((player) => (player.inRoster = false));
    });
    if (!isRosterOnly) {
      this.signups = {};
    }
  }
}
