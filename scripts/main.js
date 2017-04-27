requirejs.config({
    baseUrl: "scripts/lib",
    paths: {
    	params : 'params',
    	shootColor : 'shootColor',
    	interface : 'interface',
    	display : 'display'
    }
});


requirejs(["app"], function(app) {
	requirejs(['app']);
	requirejs(['interface']);
});
