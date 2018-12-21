import express from "express";
import path from "path";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/appRoutes";
import mongoose from "mongoose";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://mendix-test:m3ndix@ds135844.mlab.com:35844/alicozgo-node-project-db';
    public mongoConfig: mongoose.ConnectionOptions = {
        useNewUrlParser: true
    }

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void { 
        this.app.use(bodyParser.json());
        //this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended : false}));   
        // Configure express to use ejs 
        this.app.set("views", path.join( __dirname, "views" ));
        this.app.set("view engine", "ejs");
        // Configure express to serve files from public dir
        this.app.use( express.static( path.join( __dirname, "public" ) ) );
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        try {
            mongoose.connect(this.mongoUrl, this.mongoConfig);
            mongoose.set('debug', true);
        } catch (error) {
            console.error(error);
        }
        
    }
}

export default new App().app;