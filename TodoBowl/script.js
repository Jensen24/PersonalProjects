const bowlImage = document.getElementById("fishbowl")

const canvas = document.getElementById("world")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

var Engine = Matter.Engine
var Runner = Matter.Runner
var Bodies = Matter.Bodies
var World = Matter.World

var engine = Engine.create()
var runner = Runner.create()
Runner.run(runner, engine)


let ground, leftWall, rightWall, lid

function createBoundaries() {
    if (ground) World.remove(engine.world, [ground, leftWall, rightWall, lid])

    ground = Bodies.rectangle(canvas.width / 2, canvas.height - 20, canvas.width, 40, { isStatic: true })
    leftWall = Bodies.rectangle(10, canvas.height / 2, 20, canvas.height, { isStatic: true })
    rightWall = Bodies.rectangle(canvas.width - 10, canvas.height / 2, 20, canvas.height, { isStatic: true })
    lid = Bodies.rectangle(canvas.width / 2, 10, canvas.width, 20, { isStatic: true })

    World.add(engine.world, [ground, leftWall, rightWall, lid])
}

createBoundaries()

const tasks = []

function createTask(text) {
    const width = 20 + text.length * 10
    const height = 40
    const x = canvas.width / 2
    const y = 100

    const body = Bodies.rectangle(x, y, width, height, {
        restitution: 0.8,
        friction: 0.2
    })
    World.add(engine.world, body)

    tasks.push({ body, text, width, height })
}

document.getElementById("addBtn").addEventListener("click", () => {
    const input = document.getElementById("taskInput")
    if (input.value.trim() !== "") {
        createTask(input.value.trim())
        input.value = ""
    }
})

// fishbowl placement vars
let bowlX, bowlY, bowlWidth, bowlHeight

function resizeCanvasAndBowl() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    createBoundaries()

    if (bowlImage.complete) {
        const naturalWidth = bowlImage.naturalWidth
        const naturalHeight = bowlImage.naturalHeight
        const aspectRatio = naturalWidth / naturalHeight

        const maxWidth = canvas.width * 0.6
        const maxHeight = canvas.height * 0.6
        bowlWidth = maxWidth
        bowlHeight = maxWidth / aspectRatio

        if (bowlHeight > maxHeight) {
            bowlHeight = maxHeight
            bowlWidth = maxHeight * aspectRatio
        }

        bowlX = (canvas.width - bowlWidth) / 2
        bowlY = (canvas.height - bowlHeight) / 2
    }
}

// render loop
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (bowlWidth && bowlHeight) {
        ctx.drawImage(bowlImage, bowlX, bowlY, bowlWidth, bowlHeight)
    }

    for (const task of tasks) {
        const { body, text, width, height } = task
        const { x, y } = body.position

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(body.angle)

        ctx.fillStyle = "rgba(255,255,255,0.9)"
        ctx.fillRect(-width / 2, -height / 2, width, height)

        ctx.fillStyle = "black"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, 0, 0)

        ctx.restore()
    }
    requestAnimationFrame(render)
}

bowlImage.onload = () => {
    resizeCanvasAndBowl()
    render()
}

// resize event listener
window.addEventListener("resize", () => {
    resizeCanvasAndBowl()
})