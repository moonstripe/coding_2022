#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn width(&self) -> bool {
        self.width > 0
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    let rect2 = Rectangle {
        width: 25,
        height: 45,
    };

    let rect3 = Rectangle {
        width: 31,
        height: 51,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    println!(
        "The rectangle has a nonzero width; it is {}.",
        rect1.width()
    );

    println!(
        "Rectangle 1 can hold Rectangle 2? {}.",
        rect1.can_hold(&rect2)
    );

    println!(
        "Rectangle 1 can hold Rectangle 3? {}.",
        rect1.can_hold(&rect3)
    )


    
}
