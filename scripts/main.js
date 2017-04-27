requirejs.config({
    baseUrl: "scripts/lib",
    paths: {
    	params : 'params',
    	shootColor : 'shootColor'
    }
});


requirejs(["app"], function(app) {
	requirejs(['app']);
});
