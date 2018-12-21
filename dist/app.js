"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bodyParser = __importStar(require("body-parser"));
const appRoutes_1 = require("./routes/appRoutes");
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        this.routePrv = new appRoutes_1.Routes();
        this.mongoUrl = 'mongodb://mendix-test:m3ndix@ds135844.mlab.com:35844/alicozgo-node-project-db';
        this.mongoConfig = {
            useNewUrlParser: true
        };
        this.app = express_1.default();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        //this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Configure express to use ejs 
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        // Configure express to serve files from public dir
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    }
    mongoSetup() {
        mongoose_1.default.Promise = global.Promise;
        try {
            mongoose_1.default.connect(this.mongoUrl, this.mongoConfig);
            mongoose_1.default.set('debug', true);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map