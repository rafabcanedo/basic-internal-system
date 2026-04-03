package domains

import "time"

type GroupDomainInterface interface {
	GetID() string
	SetID(id string)

	GetOwnerID() string
	SetOwnerID(id string)

	GetName() string
	SetName(name string)

	GetCategory() string
	SetCategory(category string)

	GetCreatedAt() time.Time
	SetCreatedAt(t time.Time)

	GetUpdatedAt() time.Time
	SetUpdatedAt(t time.Time)

	GetMembers() []MemberDomain
	SetMembers(members []MemberDomain)
}
