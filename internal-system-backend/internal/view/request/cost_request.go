package request

type CreateCostRequest struct {
	CostName        string   `json:"costName"        binding:"required"`
	TotalValue      float64  `json:"totalValue"      binding:"required,gt=0"`
	Category        string   `json:"category"        binding:"required,oneof=Dinner Lunch Entertainment Travel Others"`
	GroupID         string   `json:"groupId"`
	OwnerPercentage *float64 `json:"ownerPercentage"`
}

type UpdateCostRequest struct {
	CostName        string   `json:"costName"        binding:"required"`
	TotalValue      float64  `json:"totalValue"      binding:"required,gt=0"`
	Category        string   `json:"category"        binding:"required,oneof=Dinner Lunch Entertainment Travel Others"`
	OwnerPercentage *float64 `json:"ownerPercentage"`
}
