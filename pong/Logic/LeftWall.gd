extends Area2D

func _on_wall_area_entered(area):
	if area.name == "Ball":
		area.reset()
