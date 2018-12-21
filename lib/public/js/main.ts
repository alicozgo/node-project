import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

new Vue( {
    computed: {
        hasModels(): boolean {
            return (this as any).isLoading=== false && (this as any).models.length > 0;
        },
        noModels(): boolean {
            return (this as any).isLoading === false && (this as any).models.length === 0;
        }
    },
    data() {
        return {
            isLoading: true,
            models: [],
            model: "",
            selectedModel: "",
            selectedModelId: 0,
            selectedModelData: "",
            jsonData: "",
            jsonPatch: ""
        };
    },
    el: "#app",
    methods: {
        createModel() {
            const model = JSON.parse((this as any).jsonData);
            axios
                .post( "/create-model", model )
                .then( () => {
                    (this as any).$refs.jsonData.focus();
                    (this as any).jsonData = "";
                    (this as any).loadModels();
                } )
                .catch( ( err: any ) => {
                    console.log( err );
                } );
        },
        changeModel( id: string ) {
            const patch = JSON.parse((this as any).jsonPatch);
            axios
                .post( `/model/${ id }`, patch )
                .then( () => {
                    (this as any).$refs.jsonPatch.focus();
                    (this as any).jsonPatch = "";
                    (this as any).loadModels();
                } )
                .catch( ( err: any ) => {
                    console.log( err );
                } );
        },
        changeModelInput( id: string ) {
			const model = (this as any).models.find( ( m: any ) => m._id === id );
			(this as any).selectedModel = `${ model._id } ${ model.name }`;
			(this as any).selectedModelId = model._id;
			const modelPatcher = (this as any).$refs.modelPatcher;
			const modal = M.Modal.init( modelPatcher );
			modal.open();
		},
        loadModels() {
            axios
                .get( "/get-models" )
                .then( res => {
                    (this as any).isLoading = false;
                    (this as any).models = res.data;
                } )
                .catch( ( err: any ) => {
                    console.log( err );
                } );
        },
        viewModel( id: string ) {
			axios
                .get(`/model/${ id }`)
                .then( res => {
                    (this as any).selectedModelData = res.data;
                } )
                .catch( ( err: any ) => {
                    console.log( err );
                } );
			const modelDataViewer = (this as any).$refs.modelDataViewer;
			const modal = M.Modal.init( modelDataViewer );
			modal.open();
		},
		confirmModelDelete( id: string ) {
			const model = (this as any).models.find( ( m: any ) => m._id === id );
			(this as any).selectedModel = `${ model._id } ${ model.name }`;
			(this as any).selectedModelId = model._id;
			const deleteConfirm = (this as any).$refs.deleteConfirm;
			const modal = M.Modal.init( deleteConfirm );
			modal.open();
		},
		deleteModel( id: string ) {
			axios
				.delete( `/remove-model/${ id }` )
				.then( (this as any).loadModels() )
				.catch( ( err: any ) => {
					console.log( err );
				} );
		},
    },
    mounted() {
        return (this as any).loadModels();
    }
} );