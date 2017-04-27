requirejs.config({
    baseUrl: "scripts/lib",
    paths: {
    	params : 'params',
    	shootColor : 'shootColor',
    	interface : 'interface'
    }
});


requirejs(["app"], function(app) {
	requirejs(['app']);
	requirejs(['interface']);
});
