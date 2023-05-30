use petgraph::{graph::Graph, dot::{Dot, Config}};
use std::{fs::File, error::Error};
use std::io::prelude::*;
use chrono::prelude::*;

fn write_file(graph: &Graph<u32, u32>) -> Result<(), Box<dyn Error>>{
    let mut filename: String = Utc::now().format("%Y%m%d%H:%M:%S").to_string().to_owned();  
    let extension: &str = ".dot";
    filename.push_str(extension);
    let dot = Dot::with_config(graph, &[Config::EdgeNoLabel]);
    let mut file = File::create(filename)?;
    let output = format!("{}", dot);
    file.write_all(&output.as_bytes())?;

    Ok(())
}
fn main() {

    // build graph
    let mut graph = Graph::<u32, u32>::new();
    graph.extend_with_edges(&[ (0, 1), (1, 2), (0, 2) ]);

    // write graph
    let result = write_file(&graph);

    match result {
        Ok(()) => (),
        Err(_) => panic!("Something went wrong saving your .dot file."),
    };

    // upload graph to DB
}