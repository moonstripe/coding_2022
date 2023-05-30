extern crate anyhow;

use rust_bert::pipelines::conversation::{
    ConversationConfig, ConversationManager, ConversationModel,
};

fn main() -> anyhow::Result<()> {
    let config = ConversationConfig {
        do_sample: false,
        num_beams: 3,
        ..Default::default()
    };
    let conversation_model = ConversationModel::new(config)?;
    let mut conversation_manager = ConversationManager::new();

    let _conversation_1_id =
        conversation_manager.create("Going to the movies tonight - any suggestions?");
    let _conversation_2_id = conversation_manager.create("What's the last book you have read?");

    let output = conversation_model.generate_responses(&mut conversation_manager);

    println!("{:?}", output);

    let _ = conversation_manager
        .get(&_conversation_2_id)
        .unwrap()
        .add_user_input("Do you enjoy writing?");

    let output = conversation_model.generate_responses(&mut conversation_manager);

    println!("{:?}", output);

    let output1 = conversation_model.generate_responses(&mut conversation_manager);

    println!("{:?}", output1);

    Ok(())
}