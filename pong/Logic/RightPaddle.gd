extends Area2D

const player_speed = 200 

var _ball_dir
var _up
var _down

@onready var _screen_size_y = get_viewport_rect().size.y

func _ready():
	var n = String(name).to_lower()
	_up = n + "_up"
	_down = n + "_down"
	if n == "left":
		_ball_dir = -1
	else:
		_ball_dir = 1

func _process(delta):
	var input = Input.get_action_strength(_down) - Input.get_action_strength(_up)
	position.y = clamp(position.y + input * player_speed * delta, 16, _screen_size_y - 16)

func _on_area_entered(area):
	if area.name == "Ball":
		area.direction = Vector2(_ball_dir, randf() * 2 - 1).normalized()
