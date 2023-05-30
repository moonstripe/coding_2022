use druid::{AppLauncher, WindowDesc, Widget, PlatformError};
use druid::widget::Label;
// use druid::Data;
// use std::sync::Arc;

// #[derive(Clone, Data)]
// /// The main model for a todo list application.
// struct TodoList {
//     items: Arc<Vec<TodoItem>>,
// }

// #[derive(Clone, Data)]
// /// A single todo item.
// struct TodoItem {
//     category: Category,
//     title: String,
//     note: Option<String>,
//     completed: bool,

//     // `Data` is implemented for any `Arc`.
//     due_date: Option<Arc<DateTime>>,

//     // You can specify a custom comparison fn
//     // (anything with the signature (&T, &T) -> bool).
//     #[data(same_fn = "PartialEq::eq")]
//     added_date: DateTime,

//     // You can specify that a field should
//     // be skipped when computing same-ness
//     #[data(ignore)]
//     debug_timestamp: usize,
// }

// #[derive(Clone, Data, PartialEq)]
// /// The three types of tasks in the world.
// enum Category {
//     Work,
//     Play,
//     Revolution,
// }

fn build_ui() -> impl Widget<()> {
    Label::new("This is a label.")

}

fn main() -> Result<(), PlatformError> {
    AppLauncher::with_window(WindowDesc::new(build_ui())).launch(())?;
    Ok(())
}