mod todo_rest;
mod security;

use crate::todo_rest::todos_filter;
use warp::Filter;

const PUBLIC: &str = "public/";

#[tokio::main]
async fn main() {
   
    // APIs
    // define extendable route endpoint (GET) with warp::path(str)
    let hi = warp::path("hi").and(warp::get()).map(|| "hello from hi");
    let apis = hi.or(todos_filter());

    // Static
    // add content from public folder
    let content = warp::fs::dir(PUBLIC);
    let root = warp::get()
        .and(warp::path::end())
        .and(warp::fs::file(format!("{}/index.html", PUBLIC)));
    let static_site = content.or(root);
    
    // combine endpoints and content into routes
    let routes = apis.or(static_site);

    // serve routes
    println!("start web server");
    warp::serve(routes).run(([127,0,0,1], 8080)).await;
}
