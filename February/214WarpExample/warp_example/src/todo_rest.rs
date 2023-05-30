use serde_json::{json, Value};
use warp::{reply::Json, Filter};

use crate::security::{do_auth, UserCtx};

// Synchronous
// pub fn todos_filter() -> impl Filter <Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
//     warp::path("todos")
//         .and(warp::get())
//         .and(warp::path::end())
//         .map(|| "will get todos")
// }

// Asynchronous
pub fn todos_filter() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let todo_route = warp::path("todos");

    let getAll = todo_route
        .and(warp::get())
        .and(warp::path::end())
        .and(do_auth())
        .and_then(todo_all);

    let getOne = todo_route
        .and(warp::get())
        .and(do_auth())
        .and(warp::path::param()) // Allows me to access todos/###/
        .and_then(todo_one);

    let postOne = todo_route
        .and(warp::post())
        .and(do_auth())
        .and(warp::body::json())
        .and_then(todo_create);

    getAll.or(getOne).or(postOne)
}

async fn todo_all(_user_ctx: UserCtx) -> Result<Json, warp::Rejection> {
    // TODO: get from DB
    let todos = json!([
        {"id": 1, "user_id": _user_ctx.user_id, "title": "todo 1"},
        {"id": 2, "user_id": _user_ctx.user_id, "title": "todo 2"}
    ]);

    let todos = warp::reply::json(&todos);

    Ok(todos)
}

async fn todo_one(_user_ctx: UserCtx, id: i64) -> Result<Json, warp::Rejection> {
    // TODO: get from DB
    let todo = json!(
        {"id": id, "user_id": _user_ctx.user_id, "title": format!("todo {}", id)}
    );

    let todo = warp::reply::json(&todo);

    Ok(todo)
}

async fn todo_create(_user_ctx: UserCtx, data: Value) -> Result<Json, warp::Rejection> {
    // TODO: write to DB
    let new_todo = data;

    let new_todo = warp::reply::json(&new_todo);

    println!("todo create {}", _user_ctx.user_id);

    Ok(new_todo)
}
