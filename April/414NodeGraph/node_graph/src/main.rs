use gazpatcho::config::*;

fn main() {
    let config = Config {
        node_templates: vec![
            NodeTemplate {
                label: "Example node".to_owned(),
                class: "example_node".to_owned(),
                pins: vec![
                    Pin {
                        label: "Input".to_owned(),
                        class: "in".to_owned(),
                        direction: Input,
                    },
                    Pin {
                        label: "Output".to_owned(),
                        class: "out".to_owned(),
                        direction: Output,
                    },
                ],
                widgets: vec![Switch {
                    label: "Switch".to_owned(),
                    key: "switch".to_owned(),
                }],
            }
        ],
    };

    gazpatcho::run_with_callback("Application Name", config, |report| {
        // Act upon the current report
        dbg!(report);

        // Respond with change requests
        vec![
            // Request::SetValue { ... }
        ]
    });
}