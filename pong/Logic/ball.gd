extends Area2D

const Default_Speed = 200
var _speed = Default_Speed
var direction = Vector2.LEFT

@onready var _initial_position = position

func _process(delta):
	_speed += delta * 2
	position += _speed * delta * direction

func reset():
	direction = Vector2.LEFT
	position = _initial_position
	_speed = Default_Speed
