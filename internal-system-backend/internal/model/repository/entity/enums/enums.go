package enums

type ContactsCategory string

const (
    ContactCategoryFamily ContactsCategory = "Family"
    ContactCategoryFriend ContactsCategory = "Friend"
    ContactCategoryWork   ContactsCategory = "Work"
)

type CostsCategory string

const (
	CostsCategoryFood      CostsCategory = "Food"
	CostsCategoryPayment CostsCategory = "Payment"
	CostsCategoryEntertainment    CostsCategory = "Entertainment"
	CostsCategoryTravel CostsCategory = "Travel"
)

type TransactionsCategory string

const (
	TransactionsCategoryFood     TransactionsCategory = "Food"
	TransactionCategoryPayment TransactionsCategory = "Payment"
	TransactionCategoryTransfer TransactionsCategory = "Transfer"
	TransactionCategoryEntertainment    TransactionsCategory = "Entertainment"
)
