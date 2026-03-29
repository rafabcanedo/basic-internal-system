package enums

type ContactCategory string

const (
	ContactCategoryFamily ContactCategory = "Family"
	ContactCategoryFriend ContactCategory = "Friend"
	ContactCategoryWork   ContactCategory = "Work"
)

type CostCategory string

const (
	CostCategoryFood          CostCategory = "Food"
	CostCategoryPayment       CostCategory = "Payment"
	CostCategoryEntertainment CostCategory = "Entertainment"
	CostCategoryTravel        CostCategory = "Travel"
)

type GroupCategory string

const (
	GroupCategoryDinner        GroupCategory = "Dinner"
	GroupCategoryLunch         GroupCategory = "Lunch"
	GroupCategoryEntertainment GroupCategory = "Entertainment"
	GroupCategoryTravel        GroupCategory = "Travel"
	GroupCategoryOthers        GroupCategory = "Others"
)
