extends Label

func _process(delta):
	self.text = str(Global.LPlayer_Score)

func _on_r_wall_area_entered(area: Area2D):
	Global.LPlayer_Score += 1 # Replace with function body.
