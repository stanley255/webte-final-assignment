const QUADRANTS = {
    1: {
        clockwise: {
            start: 0,
            end: 90,
            increment: 1,
            baseAngle: 0,
            vector: [-1, -1, 0, 0]
        },
        counterclockwise: {
            start: 90,
            end: 0,
            increment: -1,
            baseAngle: 180,
            vector: [0, 0, 1, 1]
        }
    },
    2: {
        clockwise: {
            start: 180,
            end: 90,
            increment: -1,
            baseAngle: 180,
            vector: [1, 1, 0, 0]
        },
        counterclockwise: {
            start: 90,
            end: 180,
            increment: 1,
            baseAngle: 0,
            vector: [0, 0, 1, 1]
        }
    },
    3: {
        clockwise: {
            start: 270,
            end: 180,
            increment: -1,
            baseAngle: 180,
            vector: [0, 0, -1, -1]
        },
        counterclockwise: {
            start: 180,
            end: 270,
            increment: 1,
            baseAngle: 0,
            vector: [1, 1, 0, 0]
        }
    },
    4: {
        clockwise: {
            start: 360,
            end: 270,
            increment: -1,
            baseAngle: 180,
            vector: [-1, -1, 0, 0]
        },
        counterclockwise: {
            start: 270,
            end: 360,
            increment: 1,
            baseAngle: 0,
            vector: [0, 0, -1, -1]
        }
    }
}
