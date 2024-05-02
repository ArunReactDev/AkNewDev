module.exports = {
  apps : [{
    name   : "Fintrix",
    script : "./app.js",
    watch : true,
    out_file: "./logs/out.log",
    error_file: "./logs/error.log",
    ignore_watch : ["logs" , "uploads"], // Exclude the logs directory from being watched
    env_production: {
       NODE_ENV: "production"
    }, 
    env_development: {
       NODE_ENV: "development"
    }
  }]
}
