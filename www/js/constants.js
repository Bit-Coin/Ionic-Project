angular.module("app.envconfig", [])
.constant("EnvironmentConfig", {
	"dev_api": "http://192.168.1.130:3000/api/v1",
	"prod_api": "http://54.67.50.190:3000/api/v1",
	"FACEBOOK_CLIENT_ID": "1113036765404699"
});
