package response

import "time"

type SplitResponse struct {
	ID          string  `json:"id"`
	ContactID   string  `json:"contactId"`
	ContactName string  `json:"contactName"`
	Value       float64 `json:"value"`
	Percentage  float64 `json:"percentage"`
}

type CostResponse struct {
	ID              string    `json:"id"`
	CostName        string    `json:"costName"`
	TotalValue      float64   `json:"totalValue"`
	OwnerPercentage float64   `json:"ownerPercentage"`
	OwnerValue      float64   `json:"ownerValue"`
	Category        string    `json:"category"`
	GroupID         string    `json:"groupId"`
	GroupName       string    `json:"groupName"`
	SplitCount      int       `json:"splitCount"`
	CreatedAt       time.Time `json:"createdAt"`
}

type CostDetailResponse struct {
	ID              string          `json:"id"`
	CostName        string          `json:"costName"`
	TotalValue      float64         `json:"totalValue"`
	OwnerPercentage float64         `json:"ownerPercentage"`
	OwnerValue      float64         `json:"ownerValue"`
	Category        string          `json:"category"`
	GroupID         string          `json:"groupId"`
	GroupName       string          `json:"groupName"`
	SplitCount      int             `json:"splitCount"`
	CreatedAt       time.Time       `json:"createdAt"`
	UpdatedAt       time.Time       `json:"updatedAt"`
	Splits          []SplitResponse `json:"splits"`
}
