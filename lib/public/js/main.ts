import axios from "axios";
import M from "materialize-css";
import Vue from "vue";

new Vue( {
    computed: {
        hasModels(): boolean {
            return this.isLoading === false && this.models.length > 0;
        },
        noModels(): boolean {
            return this.isLoading === false && this.models.length === 0;
        }
    },
    data() {
        return {
            name: "",
            isLoading: true
        };
    },
    el: "#app",
    methods: {
        createModel() {
            const model = {
                name: this.name
            };
            axios
                .post( "/create-model", model )
                .then( () => {
                    this.$refs.name.focus();
                    this.name = "";
                    this.loadModels();
                } )
                .catch( ( err: any ) => {
                    console.log( err );
                } );
        },
        loadModels() {
            axios
                .get( "/" )
                .then( ( res: any ) => {
                    this.isLoading = false;
                    this.models = res.data;
                } )
                .catch( ( err: any ) => {
                    console.log( err );
                } );
        }
    },
    mounted() {
        return this.loadModels();
    }
} );