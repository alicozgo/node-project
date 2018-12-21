"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const vue_1 = __importDefault(require("vue"));
new vue_1.default({
    computed: {
        hasModels() {
            return this.isLoading === false && this.models.length > 0;
        },
        noModels() {
            return this.isLoading === false && this.models.length === 0;
        }
    },
    data() {
        return {
            name: "",
            entities: [],
            associations: [],
            isLoading: true
        };
    },
    el: "#app",
    methods: {
        createModel() {
            const model = {
                name: this.name
            };
            axios_1.default
                .post("/create-model", model)
                .then(() => {
                this.$refs.name.focus();
                this.name = "";
                this.loadModels();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        loadModels() {
            axios_1.default
                .get("/")
                .then((res) => {
                this.isLoading = false;
                this.models = res.data;
            })
                .catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        return this.loadModels();
    }
});
//# sourceMappingURL=main.js.map