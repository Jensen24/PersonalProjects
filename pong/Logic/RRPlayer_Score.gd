extends Label

func _process(delta):
	self.text = str(Global.RPlayer_Score)

func _on_l_wall_area_entered(area: Area2D):
	Global.RPlayer_Score += 1 # Replace with function body.
